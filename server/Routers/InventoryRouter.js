const express = require('express');
const { addItem, getItem, getAllItems, editItem, deleteItem } = require('../Controllers/InventoryController');
const { authorize } = require('../Middleware/Authorize');

const router = express.Router();

router.use('/', authorize);

router.route('/')
    .get(getAllItems)
    .post(addItem)

router.route('/:id')
    .get(getItem)
    .put(editItem)
    .delete(deleteItem)

module.exports = router