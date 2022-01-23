const knex = require('knex')(require('../knexfile').development);
require('dotenv').config();

exports.addIngredient = (req, res) => {
    const newIngredient = req.body.ingredient;
    newIngredient.user_id = req.user.id;

    knex('ingredients').insert(newIngredient)
        .then(data => {
            console.log(data);
            res.status(201).json({success: "This ingredient was added succesfully"})
        })
        .catch(error => {
            console.log(error)
            res.status(400).json({error: "Could not add ingredient: " + error.sqlMessage})
        })
}

exports.getIngredients = (req, res) => {
    const ingredientID = req.params.id;
    const userID = req.user.id;
    knex.select('id', 'name', 'description', 'amount', 'unit').from('ingredients').where({id: ingredientID, user_id: userID})
        .then(data => {
            console.log(data);
            const item = {...data[0]}
            if (!data.length) throw {status: 400, error: "Could not find ingredient"};
            res.status(200).json({success: "This ingrediet was found succesfully", item: item})
        })
        .catch(error => {
            if (error.status) {
                return res.status(error.status).json({error: error.error});
            }
            console.log(error)
            res.status(400).json({error: "Could not find ingredient: " + error.sqlMessage})
        })
}

exports.getAllIngredients = (req, res) => {
    const recipeID = req.body.recipeID;
    const userID = req.user.id;
    knex.select('id', 'name', 'description', 'amount', 'unit').from('ingredients').where({user_id: userID, recipe_id: recipeID})
        .then(data => {
            console.log(data);
            const ingredients = [...data]
            res.status(200).json({success: "These ingredients were found succesfully", ingredients: ingredients})
        })
        .catch(error => {
            console.log(error.sqlMessage)
            res.status(400).json({error: "Could not find items: " + error.sqlMessage})
        })
}

exports.editIngredient = (req, res) => {
    const userID = req.user.id;
    const ingredientID = req.params.id;
    const update = req.body;

    knex('ingredients').where({user_id: userID, id: ingredientID}).update(update)
        .then(data => {
            console.log(data);
            if (!data) throw {status: 400, error: "Could not update ingredient"};
            res.status(200).json({success: "This ingredient was updated"})
        })
        .catch(error => {
            console.log(error.sqlMessage)
            res.status(400).json({error: "Could not find ingredient: " + error.sqlMessage})
        })
}

