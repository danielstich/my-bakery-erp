const express = require('express');
const { addIngredient, getIngredient, getAllIngredients, editIngredient, deleteIngredient } = require('../Controllers/IngredientsController');
const { authorize } = require('../Middleware/Authorize');

const router = express.Router();

router.use('/', authorize);

router.post('/', addIngredient);
router.get('/:id', getIngredient);
router.get('/', getAllIngredients);
router.put('/:id', editIngredient);
router.delete('/:id', deleteIngredient);

module.exports = router