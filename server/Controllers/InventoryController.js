const knex = require('knex')(require('../knexfile').development);
const { getItemHandler, getAllItemsHandler, addItemHandler, editItemHandler, deleteItemHandler } = require('./ResponseHandler');

exports.getAllItems = (req, res) => {
    const promise = knex.select('id', 'name', 'description', 'qty', 'unit').from('inventory').where({user_id: req.user.id});
    getAllItemsHandler(res, promise, 'items');
}

exports.getItem = (req, res) => {
    const selection = {id: req.params.id, user_id: req.user.id}    
    const promise = knex.select('id', 'name', 'description', 'qty', 'unit').from('inventory').where(selection);
    getItemHandler(res, promise, 'item')
}

exports.addItem = (req, res) => {
    const newInventory = req.body;
    newInventory.user_id = req.user.id;

    if (!newInventory.name || !newInventory.qty || !newInventory.unit) {
        return res.status(400).json({error: 'Missing Fields'})
    }

    const promise = knex('inventory').insert(newInventory);
    addItemHandler(res, promise, 'item');
}
exports.editItem = (req, res) => {
    const selection = {id: req.params.id, user_id: req.user.id};
    const update = req.body;

    if (!update.name || !update.qty || !update.unit) {
        return res.status(400).json({error: 'Missing Fields'})
    }

    const promise = knex('inventory').where(selection).update(update);
    editItemHandler(res, promise, 'item')
}

exports.deleteItem = (req, res) => {
    const selection = {id: req.params.id, user_id: req.user.id};
    const promise = knex('inventory').where(selection).del();
    deleteItemHandler(res, promise, 'item');
}