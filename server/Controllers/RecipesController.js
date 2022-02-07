const knex = require('knex')(require('../knexfile').development);
const { getItemHandler, getAllItemsHandler, addItemHandler, editItemHandler, deleteItemHandler } = require('./ResponseHandler');

exports.getAllRecipes = (req, res) => {
    const promise = knex.select('id', 'name', 'qty', 'description').from('recipes').where({user_id: req.user.id});
    getAllItemsHandler(res, promise, 'recipes');
}

exports.getRecipe = (req, res) => {
    const selection = {id: req.params.id, user_id: req.user.id};
    const promise = knex.select('id', 'name', 'qty', 'description').from('recipes').where(selection);
    getItemHandler(res, promise, 'recipe');
}

exports.addRecipe = (req, res) => {
    const newRecipe = req.body;
    newRecipe.user_id = req.user.id;

    if (!newRecipe.name || !newRecipe.qty) return res.status(400).json({error: 'Missing Name'});
    
    const promise = knex('recipes').insert(newRecipe);
    addItemHandler(res, promise, 'recipe')
}

exports.editRecipe = (req, res) => {
    const selection = {id: req.params.id, user_id: req.user.id};
    const update = req.body;

    if (!update.name || !update.qty) return res.status(400).json({error: 'Missing Name'});

    const promise = knex('recipes').where(selection).update(update);
    editItemHandler(res, promise, 'recipe');
}

exports.deleteRecipe = (req, res) => {
    const selection = {id: req.params.id, user_id: req.user.id};
    const promise = knex('recipes').where(selection).del();
    deleteItemHandler(res, promise, 'recipe');
}