const express = require('express');
const { getIngredientsUsed, addIngredientUsed, deleteIngredientUsed } = require('../Controllers/IngredientsUsedController');
const { authorize } = require('../Middleware/Authorize');

const router = express.Router();

router.use('/', authorize);

router.route('/')
    .get(getIngredientsUsed)
    .post(addIngredientUsed)

router.route('/:id')
    .delete(deleteIngredientUsed)

module.exports = router;