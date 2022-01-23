const knex = require('knex')(require('../knexfile').development);
require('dotenv').config();

exports.addItem = (req, res) => {
    const newInventory = req.body;
    newInventory.user_id = req.user.id;

    knex('inventory').insert(newInventory)
        .then(data => {
            res.status(201).json({success: "This item was added succesfully"})
        })
        .catch(error => { 
            res.status(400).json({error: "Could not add item: " + error.sqlMessage})
        })
}

exports.getItem = (req, res) => {
    const userID = req.user.id;
    const itemID = req.params.id;

    knex.select('id', 'name', 'description', 'qty', 'unit').from('inventory').where({id: itemID, user_id: userID})
        .then(data => {
            const item = {...data[0]}
            if (!data.length) throw {status: 400, error: "Could not find item"};
            res.status(200).json({success: "This item was found succesfully", item: item})
        })
        .catch(error => {
            if (error.status) {
                return res.status(error.status).json({error: error.error});
            }
            console.log(error)
            res.status(400).json({error: "Could not find item: " + error.sqlMessage})
        })
}

exports.getAllItems = (req, res) => {
    const userID = req.user.id;
    knex.select('id', 'name', 'description', 'qty', 'unit').from('inventory').where({user_id: userID})
        .then(data => {
            const items = [...data]
            res.status(200).json({success: "These items were found succesfully", items: items})
        })
        .catch(error => {
            console.log(error.sqlMessage)
            res.status(400).json({error: "Could not find items: " + error.sqlMessage})
        })
}

exports.editItem = (req, res) => {
    const userID = req.user.id;
    const itemID = req.params.id;
    const update = req.body;

    knex('inventory').where({user_id: userID, id: itemID}).update(update)
        .then(data => {
            console.log(data);
            if (!data) throw {status: 400, error: "Could not update item"};
            res.status(200).json({success: "This item was updated"})
        })
        .catch(error => {
            console.log(error.sqlMessage)
            res.status(400).json({error: "Could not find item: " + error.sqlMessage})
        })
}

exports.deleteItem = (req, res) => {
    const userID = req.user.id;
    const itemID = req.params.id;

    knex('inventory').where({user_id: userID, id: itemID}).del()
        .then(data => {
            console.log(data)
            if (data === 0) throw {status: 400, error: "Unable to delete"}
            res.status(200).json({success: "This item was deleted"})
        })
        .catch(error => {
            if(error.status) return res.status(error.status).json({error: error.error})
            res.status(400).json({error: "Could not delete item: " + error.sqlMessage})
        })
}