const knex = require('knex')(require('../knexfile').development);
const { getAllItemsHandler } = require('./ResponseHandler');

exports.getIngredientsUsed = (req, res) => {
    const batchID = req.query.batchID;
    const userID = req.user.id;
    const promise = knex('ingredients_used').where({batch_id: batchID, user_id: userID});
    getAllItemsHandler(res, promise, 'Ingredients Used')
}

// Add Ingredient Used

exports.addIngredientUsed = (req, res) => {
    const userID = req.user.id;

    if (!req.body.name || !req.body.amount || !req.body.unit) return res.status(400).json({error: 'Missing Fields'});

    knex('inventory').where({user_id: userID})
    .then(results => {
        const inventory = [...results];
        const ingredientUsed = req.body;
        let check = '';
        
        // create array to add list of ingredient either not found or not enough stock
        const item = inventory.find(item => item.name === ingredientUsed.name && item.unit === ingredientUsed.unit);
        if (!item) check = `${ingredientUsed.name} is not found`;
        else if (item.qty < ingredientUsed.amount) check = `You are short ${item.name} by ${ingredientUsed.amount - item.qty} ${item.unit}`;
        
        // if any keys added, throw error
        if (check) throw {status: 400, error: check};

        return knex.transaction(trx => {
            ingredientUsed.user_id = userID;
            return knex('ingredients_used').transacting(trx).insert(ingredientUsed)
            .then(() => {
                item.qty -= ingredientUsed.amount;
                return knex('inventory').where({id: item.id}).update(item).transacting(trx)
            })
            .then(trx.commit)
            .catch(error => {
                console.log(error)
                trx.rollback(error)
            })
        })
        .then(() => {
            res.status(200).json({success: 'Ingredient Added'})
        })
        .catch(error => {
            console.log(error)
            if (error.status) throw error;
            throw {status: 400, error: `Could not add ingredient: ${error.sqlMessage}`}
        })
    })
    .catch(error => {
        console.log(error)
        if (error.check) return res.status(error.status).json({error: error.check});
        if (error.status) return res.status(error.status).json({error: error.error});
        res.status(400).json({error: `Could not add ingredient: ${error.sqlMessage}`})
    })
}

// Edit Ingredient Used

// Delete Ingredient Used

exports.deleteIngredientUsed = (req, res) => {
    const ingredientUsedID = req.params.id;
    const userID = req.user.id;
    
    const ingredientsUsedPromise = knex('ingredients_used').where({id: ingredientUsedID});
    const inventoryPromise = knex('inventory').where({user_id: userID});
    Promise.all([ingredientsUsedPromise, inventoryPromise])
    .then(results => {
        const ingredientUsed = {...results[0][0]};
        const inventory = [...results[1]];

        let promise;
        const item = inventory.find(item => item.name === ingredientUsed.name && item.unit === ingredientUsed.unit);
        
        return knex.transaction(trx => {
            knex('ingredients_used').where({id: ingredientUsedID, user_id: userID}).del().transacting(trx)
            .then(data => {
                if (!data) throw {status: 400, error: 'Could not find ingredient'};
                if (!item) {
                    item = {...ingredientUsed};
                    item.qty = item.amount;
                    delete item.amount;
                    delete item.id;
                    delete item.batch_id;
                    promise = knex('inventory').insert(item).transacting(trx);
                } else {
                    item.qty += ingredientUsed.amount;
                    promise = knex('inventory').where({id: item.id}).update(item).transacting(trx);
                }
                return promise
            })
            .then(trx.commit)
            .catch(error => {
                console.log(error)
                trx.rollback(error);
            })
        })
        .then(() => {
            // if success, send status and message
            res.status(200).json({success: 'Ingredient Deleted'})
        })
        .catch(error => {
            console.log(error);
            if (error.status) throw error;
            throw {status: 400, error: `Could not delete ingredient: ${error.sqlMessage}`}
        })
    })
    .catch(error => {
        if (error.status) return res.status(error.status).json({error: error.error});
        res.status(400).json({error: `Could not delete ingredient: ${error.sqlMessage}`});
    })

    
    
}