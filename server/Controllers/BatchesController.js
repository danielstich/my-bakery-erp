const knex = require('knex')(require('../knexfile').development);
const { getAllItemsHandler, getItemHandler } = require('./ResponseHandler');

// get all batches
exports.getAllBatches = (req, res) => {
    const promise = knex('batches').select('name', 'id', 'date', 'qty', 'recipe_id').where({user_id: req.user.id});
    getAllItemsHandler(res, promise, 'Batches');
}

// get one batch
exports.getBatch = (req, res) => {
    const selection = {id: req.params.id, user_id: req.user.id};
    const promise = knex('batches').select('name', 'id', 'date', 'qty', 'recipe_id').where(selection);
    getItemHandler(res, promise, 'batch');
}

// add new batch
exports.addBatch = (req, res) => {
    // get promises for inventory and ingredients
    const ingredientsPromise = knex('ingredients').where({recipe_id: req.body.recipe_id, user_id: req.user.id});
    const inventoryPromise = knex('inventory').where({user_id: req.user.id});

    if (!req.body.name || !req.body.date || !req.body.qty) return res.status(400).json({error: "Missing Fields"})

    // resolve promises
    Promise.all([ingredientsPromise, inventoryPromise])
    .then(results => {
        const ingredients = [...results[0]];
        const inventory = [...results[1]];
        // create array to add list of ingredients either not found or not enough stock
        const checkArray = []
        ingredients.forEach(ingredient => {
            const item = inventory.find(item => item.name === ingredient.name && item.unit === ingredient.unit);
            if (!item) return checkArray.push(`${ingredient.name} is not found`);
            if (item.qty < ingredient.amount * req.body.qty) checkArray.push(`You are short ${item.name} by ${ingredient.amount * req.body.qty - item.qty} ${item.unit}`);
        })
        
        // if any keys added, throw error
        if (checkArray.length !== 0) throw {status: 400, error: checkArray.join(', ')};

        
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
            console.log(error)
            if (error.status) throw error;
            throw {status: 400, error: `Could not add batch: ${error.sqlMessage}`}
        })
    })
    .catch(error => {
        console.log(error)
        if (error.checkArray) return res.status(error.status).json({error: error.checkArray});
        if (error.status) return res.status(error.status).json({error: error.error});
        res.status(400).json({error: `Could not add batch: ${error.sqlMessage ? error.sqlMessage : error}`});
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
                    if (!item) {
                        const newItem = {...ingredient};
                        delete newItem.id;
                        delete newItem.batch_id;
                        newItem.qty = newItem.amount;
                        delete newItem.amount;
                        promiseArrary.push(knex('inventory').insert(newItem))
                    } else {
                        item.qty += ingredient.amount;
                        delete item.update_at;
                        promiseArrary.push(knex('inventory').where({id: item.id, user_id: userID}).update(item).transacting(trx));
                    }
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
            res.status(200).json({success: 'Batch Deleted'})
        })
        .catch(error => {
            if (error.status) throw error;
            throw {status: 400, error: `Could not delete batch: ${error.sqlMessage}`}
        })
    })
    .catch(error => {
        if (error.status) return res.status(error.status).json({error: error.error});
        res.status(400).json({error: `Could not delete batch: ${error.sqlMessage}`});
    })
}