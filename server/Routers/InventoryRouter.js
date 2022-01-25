const express = require('express');
const { addItem, getItem, getAllItems, editItem, deleteItem } = require('../Controllers/InventoryController');
const { authorize } = require('../Middleware/Authorize');

const router = express.Router();

router.use('/', authorize);

router.post('/', addItem);
router.get('/:id', getItem);
router.get('/', getAllItems);
router.put('/:id', editItem);
router.delete('/:id', deleteItem);

module.exports = router