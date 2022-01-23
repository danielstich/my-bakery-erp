const express = require('express');
const { addIngredient, getIngredients, getAllIngredients, editIngredient, deleteIngredient } = require('../Controllers/IngredientsController');
const { authorize } = require('../Middleware/Authorize');

const router = express.Router();

router.use('/', authorize);

router.post('/add', addIngredient);
router.get('/:id', getIngredients);
router.get('/', getAllIngredients);
router.put('/:id', editIngredient);
router.delete('/:id', deleteIngredient);

module.exports = router