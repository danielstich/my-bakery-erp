const express = require('express');
const { authorize } = require('../Middleware/Authorize');
const { getAllRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe } = require('../Controllers/RecipesController');

const router = express.Router();

router.use('/', authorize);

router.route('/')
    .get(getAllRecipes)
    .post(addRecipe)

router.route('/:id')
    .get(getRecipe)
    .put(editRecipe)
    .delete(deleteRecipe)

module.exports = router;