const knex = require('knex')(require('../knexfile').development);
const { getAllItemsHandler, getItemHandler } = require('./ResponseHandler');

// get all batches
exports.getAllBatches = (req, res) => {
    const promise = knex('batches').select('id', 'date', 'qty', 'recipe_id').where({user_id: req.user.id});
    getAllItemsHandler(res, promise, 'Batches');
}

// get one batch
exports.getBatch = (req, res) => {
    const selection = {id: req.params.id, user_id: req.user.id};
    const promise = knex('batches').select('id', 'date', 'qty', 'recipe_id').where(selection);
    getItemHandler(res, promise, 'batch');
}

// add new batch
exports.addBatch = (req, res) => {
    // get promises for inventory and ingredients
    const ingredientsPromise = knex('ingredients').where({recipe_id: req.body.recipe_id, user_id: req.user.id});
    const inventoryPromise = knex('inventory').where({user_id: req.user.id});

    // resolve promises
    Promise.all([ingredientsPromise, inventoryPromise])
    .then(results => {
        const ingredients = [...results[0]];
        const inventory = [...results[1]];
        // create object to add list of ingredients either not found or not enough stock
        const checkObject = {}
        ingredients.forEach(ingredient => {
            const item = inventory.find(item => item.name === ingredient.name && item.unit === ingredient.unit);
            if (!item) return checkObject[item.name] = `${item.name} is not found`;
            if (item.qty < ingredient.amount * req.body.qty) checkObject[item.name] = `You are short ${item.name} by ${ingredient.amount * req.body.qty - item.qty}`;
        })
        
        // if any keys added, throw error
        if (Object.keys(checkObject).length !== 0) throw {status: 400, checkObject: checkObject};

        
        // start knex transaction for adding batch, adding ingredients used, updating inventory
        return knex.transaction(trx => {
            const newBatch = req.body;
            newBatch.user_id = req.user.id;
            return knex('batches').transacting(trx).insert(newBatch)
            // adding ingredients to used ingredients table
            .then(ids => {
                ingredients.forEach(ingredient => {
                    ingredient.batch_id = ids[0];
                    ingredient.description = '';
                    ingredient.amount *= newBatch.qty;
                    delete ingredient.id;
                    delete ingredient.update_at;
                    delete ingredient.recipe_id;
                })
                return knex('ingredients_used').insert(ingredients).transacting(trx);
            })
            .then(() => {
                // update inventory
                const promiseArray = [];
                ingredients.forEach(ingredient => {
                    const item = inventory.find(item => ingredient.name === item.name && ingredient.unit === item.unit);
                    item.qty -= ingredient.amount;
                    promiseArray.push(knex('inventory').where({id: item.id}).update(item).transacting(trx));
                })
                return Promise.all(promiseArray);
            })
            .then(trx.commit)
            .catch(error => {
                console.log(error)
                trx.rollback(error);
            })
    
        })
        .then(() => {
            // if success, send status and message
            res.status(200).json({success: 'Batch Added'})
        })
        .catch(error => {
            if (error.status) throw error;
            throw {status: 400, error: `Could not add batch: ${error.sqlMessage}`}
        })
    })
    .catch(error => {
        if (error.checkObject) return res.status(error.status).json({error: error.checkObject});
        if (error.status) return res.status(error.status).json({error: error.error});
        res.status(400).json({error: `Could not add batch: ${error.sqlMessage}`});
    })
}

// edit batch
exports.editBatch = (req, res) => {
    
}
// delete batch
exports.deleteBatch = (req, res) => {
    const batchID = req.params.id;
    const userID = req.user.id;

    const ingredientsPromise = knex('ingredients_used').where({batch_id: batchID, user_id: userID});
    const inventoryPromise = knex('inventory').where({user_id: userID});
    
    Promise.all([ingredientsPromise, inventoryPromise])
    .then(results => {
        const ingredients = [...results[0]];
        const inventory = [...results[1]];

        return knex.transaction(trx => {
            knex('batches').transacting(trx).where({id: batchID, user_id: userID}).del()
            .then((data) => {
                if(!data) throw {status: 400, error: 'Could not find batch'};
                const promiseArrary = [];
                ingredients.forEach(ingredient => {
                    const item = inventory.find(item => item.name === ingredient.name && item.unit === ingredient.unit);
                    item.qty += ingredient.amount;
                    delete item.update_at;
                    promiseArrary.push(knex('inventory').where({id: item.id, user_id: userID}).update(item).transacting(trx));
                })

                return Promise.all(promiseArrary);
            })
            .then(trx.commit)
            .catch(error => {
                console.log(error)
                trx.rollback(error);
            })
        })
        .then(() => {
            // if success, send status and message
            res.status(200).json({success: 'Batch Delete'})
        })
        .catch(error => {
            if (error.status) throw error;
            throw {status: 400, error: `Could not delete batch: ${error.sqlMessage}`}
        })
    })
    .catch(error => {
        if (error.checkObject) return res.status(error.status).json({error: error.checkObject});
        if (error.status) return res.status(error.status).json({error: error.error});
        res.status(400).json({error: `Could not add batch: ${error.sqlMessage}`});
    })
}

// get ingredients used
exports.getIngredientsUsed = (req, res) => {
    const batchID = req.params.id;
    const userID = req.user.id;

    knex('ingredients_used').where({batch_id: batchID, user_id: userID})
        .then(data => {
            const ingredients = [...data];
            res.status(200).json(ingredients)
        })
        .catch(error => {
            res.status(400).json({error: "Could not retrieve ingredients"})
        })
}