const knex = require('knex')(require('../knexfile').development);

exports.getAllRecipes = (req, res) => {
    const userID = req.user.id;

    knex.select('id', 'name', 'description').from('recipes').where({user_id: userID})
        .then(data => {
            const recipes = [...data];
            res.status(200).json({success: "These recipes were found succesfully", recipes: recipes});
        })
        .catch(error => {
            console.log(error.sqlMessage);
            res.status(400).json({error: "Could not find recipes: " + error.sqlMessage})
        })
}

exports.getRecipe = (req, res) => {
    const userID = req.user.id;
    const recipeID = req.params.id;

    knex.select('id', 'name', 'description').from('recipes').where({user_id: userID, id: recipeID})
        .then(data => {
            const recipe = {...data[0]};
            if (!data.length) throw {status: 400, error: "Could not find recipe"};
            res.status(200).json({success: "This recipe was found succesfully", recipe: recipe});
        })
        .catch(error => {
            if (error.status) {
                return res.status(error.status).json({error: error.error});
            }
            res.status(400).json({error: "Could not find recipes: " + error.sqlMessage})
        })
}

exports.addRecipe = (req, res) => {
    const userID = req.user.id;
    const newRecipe = req.body;
    newRecipe.user_id = userID;

    if (!newRecipe.name) {
        return res.status(400).json({error: 'Missing Name'})
    }

    knex('recipes').insert(newRecipe)
    .then(data => {
        res.status(201).json({success: "This recipe was added succesfully"})
    })
    .catch(error => { 
        res.status(400).json({error: "Could not add recipe: " + error.sqlMessage})
    })
}

exports.editRecipe = (req, res) => {
    const userID = req.user.id;
    const recipeID = req.params.id;
    const update = req.body;

    if (!update.name) {
        return res.status(400).json({error: 'Missing Fields'})
    }

    knex('recipes').where({user_id: userID, id: recipeID}).update(update)
    .then(data => {
        if (!data) throw {status: 400, error: "Could not update recipe"};
        res.status(200).json({success: "This recipe was updated"})
    })
    .catch(error => {
        console.log(error.sqlMessage)
        res.status(400).json({error: "Could not find recipe: " + error.sqlMessage})
    })
}

exports.deleteRecipe = (req, res) => {
    const userID = req.user.id;
    const recipeID = req.params.id;

    knex('recipes').where({user_id: userID, id: recipeID}).del()
        .then(data => {
            if (data === 0) throw {status: 400, error: "Unable to delete"}
            res.status(200).json({success: "This recipe was deleted"})
        })
        .catch(error => {
            if(error.status) return res.status(error.status).json({error: error.error})
            res.status(400).json({error: "Could not delete recipe: " + error.sqlMessage})
        })
}