exports.getItemHandler = (res, promise, itemType) => {
    promise
        .then(data => {
            const item = {...data[0]};
            if (!data.length) throw {status: 400, error: `Could not find ${recipe}`};
            const responseObject = {};
            responseObject.success = `This ${itemType} was found succesfully`;
            responseObject[itemType] = item;
            res.status(200).json(responseObject);
        })
        .catch(error => {
            if (error.status) return res.status(error.status).json({error: error.error});
            res.status(400).json({error: `Could not find ${itemType}: ${error.sqlMessage}`})
        })
}

exports.getAllItemsHandler = (res, promise, itemType) => {
    promise
        .then(data => {
            const items = [...data];
            const responseObject = {}
            responseObject.success = `These ${itemType} were found succesfully`;
            responseObject[itemType] = items;
            res.status(200).json(responseObject);
        })
        .catch(error => {
            res.status(400).json({error: `Could not find ${itemType}: ${error.sqlMessage}`})
        })
}

exports.addItemHandler = (res, promise, itemType) => {
    promise
        .then(data => {
            res.status(201).json({success: `This ${itemType} was added succesfully`})
        })
        .catch(error => { 
            res.status(400).json({error: `Could not add ${itemType}: ${error.sqlMessage}`})
        })
}

exports.editItemHandler = (res, promise, itemType) => {
    promise
        .then(data => {
            if (!data) throw {status: 400, error: `Could not update ${itemType}`};
            res.status(200).json({success: `This ${itemType} was updated`})
        })
        .catch(error => {
            console.log(error.sqlMessage)
            res.status(400).json({error: `Could not find ${itemType}: ${error.sqlMessage}`})
        })
}

exports.deleteItemHandler = (res, promise, itemType) => {
    promise
        .then(data => {
            if (data === 0) throw {status: 400, error: `Unable to delete ${recipe}`}
            res.status(200).json({success: `This ${itemType} was deleted`})
        })
        .catch(error => {
            if(error.status) return res.status(error.status).json({error: error.error})
            res.status(400).json({error: `Could not delete ${itemType}: ${error.sqlMessage}`})
        })

}