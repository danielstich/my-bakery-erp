const { getAllItemsHandler, getItemHandler, addItemHandler, editItemHandler, deleteItemHandler } = require('./ResponseHandler');

const knex = require('knex')(require('../knexfile').development);
require('dotenv').config();

const checkReqBody = (body, res) => {
    if (!body.name || !body.amount || !body.unit) {
        return res.status(400).json({error: 'Missing Fields'})
    }
    return false;
}

exports.getAllIngredients = (req, res) => {
    const recipeID = req.query.recipeID;
    const userID = req.user.id;
    const promise = knex.select('id', 'name', 'description', 'amount', 'unit').from('ingredients').where({user_id: userID, recipe_id: recipeID});
    getAllItemsHandler(res, promise, 'ingredients');
}

exports.getIngredient = (req, res) => {
    const ingredientID = req.params.id;
    const userID = req.user.id;
    const promise = knex.select('id', 'name', 'description', 'amount', 'unit').from('ingredients').where({id: ingredientID, user_id: userID});
    getItemHandler(res, promise, 'ingredient');
}

exports.addIngredient = (req, res) => {
    const newIngredient = req.body.ingredient;
    newIngredient.user_id = req.user.id;
    if (checkReqBody(newIngredient, res)) return;
    const promise = knex('ingredients').insert(newIngredient);
    addItemHandler(res, promise, 'ingredient');
}

exports.editIngredient = (req, res) => {
    const userID = req.user.id;
    const ingredientID = req.params.id;
    const update = req.body;
    if (checkReqBody(update, res)) return;
    const promise = knex('ingredients').where({user_id: userID, id: ingredientID}).update(update);
    editItemHandler(res, promise, 'ingredient');
}

exports.deleteIngredient = (req, res) => {
    const userID = req.user.id;
    const ingredientID = req.params.id;
    const promise = knex('ingredients').where({id: ingredientID, user_id: userID}).del();
    deleteItemHandler(res, promise, 'ingredient');
}