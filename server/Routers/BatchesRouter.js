const express = require('express');
const { authorize } = require('../Middleware/Authorize');
const { getAllBatches, getBatch, addBatch, deleteBatch, getIngredientsUsed } = require('../Controllers/BatchesController');

const router = express.Router();

router.use('/', authorize);

router.route('/')
    .get(getAllBatches)
    .post(addBatch)

router.route('/:id')
    .get(getBatch)
    .delete(deleteBatch)

module.exports = router;