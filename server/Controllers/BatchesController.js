const knex = require('knex')(require('../knexfile').development);

// get all batches
exports.getAllBatches = (req, res) => {

}

// get one batch
exports.getBatch = (req, res) => {
    
}

// add new batch
exports.addBatch = (req, res) => {
    
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