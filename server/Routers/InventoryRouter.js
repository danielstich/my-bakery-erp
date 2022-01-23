const express = require('express');
const { addItem, getItem, getAllItems, editItem } = require('../Controllers/InventoryController');
const { authorize } = require('../Middleware/Authorize');

const router = express.Router();

router.use('/', authorize);

router.post('/add', addItem);
router.get('/:id', getItem);
router.get('/', getAllItems)
router.put('/:id', editItem)

module.exports = router