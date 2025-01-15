const item = require("../services/item.service")


async function get(req, res, next) {
    try {
        res.json(await item.get(req.params.id))
    } catch (err) {
        console.error(`Error while getting iten`, err.message);
        next(err);
    }
}

async function create(req, res, next) {
    try {
        res.json(await item.create(req.body))
    } catch (err) {
        console.error(`Error while creating item`, err.message);
        next(err);
    }
}

async function update(req, res, next) {
    try {
        res.json(await item.update(req.params.id, req.body))
    } catch (err) {
        console.error(`Error while updating item`, err.message);
        next(err);
    }
}

async function remove(req, res, next) {
    try {
        res.json(await item.remove(req.params.id))
    } catch (err) {
        console.error(`Error while deleting item`, err.message);
        next(err);
    }
}

module.exports = {
    get,
    create,
    update,
    remove
}