const express = require('express');
const { getIngredientsUsed } = require('../Controllers/IngredientsUsedController');
const { authorize } = require('../Middleware/Authorize');

const router = express.Router();

router.route('/')
    .get(getIngredientsUsed);

module.exports = router;