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
            return knex('batches').transacting(trx).insert(req.body, 'id')
            // adding ingredients to used ingredients table
            .then(ids => {
                ingredients.forEach(ingredient => ingredient.batch_id = ids[0])
                return knex('ingredients_used').insert(ingredients).transacting(trx);
            })
            .then(data => {
                // update inventory
                const promiseArray = [];
                inventory.forEach(item => {
                    const ingredient = ingredients.find(ingredient => ingredient.name === item.name && ingredient.unit === item.unit)
                    item.qty -= (ingredient.amount * req.body.qty);
                    promiseArray.push(knex('inventory').where({id: item.id}).update(item).transacting(trx));
                })
                return Promise.all(promiseArray);
            })
            .then(trx.commit)
            .catch(error => {
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
        if (error.checkObject) return res.status(error.status).json({error: checkObject});
        if (error.status) return res.status(error.status).json({error: error.error});
        res.status(400).json({error: `Could not add batch: ${error.sqlMessage}`});
    })
}

// edit batch
exports.editBatch = (req, res) => {
    
}
// delete batch
exports.deleteBatch = (req, res) => {
    
}
// check inventory for ingredients
const checkInventory = recipeID => {

}

// reduce inventory
const reduceInventory = ingredients => {

}

// add back to inventory
const increaseInventory = ingredients => {

}

// get ingredients used
const getIngredients = batchID => {

}

// post ingredients used
const postIngredients = ingredients => {

}

// delete ingredients used
const deleteIngredients = ingredients => {

}