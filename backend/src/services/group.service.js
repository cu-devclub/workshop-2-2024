const db = require("../models/db.service")
const helper= require("../utils/helper.util")

async function getMultiple() {
    const rows = await db.query(`SELECT id, name, created_at FROM "group"`)
    return helper.emptyOrRows(rows)
}

async function get(id) {
    if (!helper.validID(id)) {
        const error = new Error("Invalid ID");
        error.statusCode = 400;
        throw error;
    }
    const rows = await db.query("SELECT id, name, quantity, checked, created_at FROM group WHERE group_id = ?", [id])
    return helper.emptyOrRows(rows)
}

async function create(body) {
    if (!body || Object.keys(body).length === 0 || !body["name"]) {
        const error = new Error("Unprocessable Content");
        error.statusCode = 422;
        throw error;
    }
    try{
        await db.query(`INSERT INTO "group" (name) VALUES (?)`, [body["name"]])
        return {"success": true}
    } catch (err) {
        console.log("Error while inserting data to database: ", err.message)
        return {"success": false}
    }
}

async function update(id, body) {
    if (!helper.validID(id)) {
        const error = new Error("Invalid ID");
        error.statusCode = 400;
        throw error;
    }
    if (!body || Object.keys(body).length === 0 || !body["name"]) {
        const error = new Error("Unprocessable Content");
        error.statusCode = 422;
        throw error;
    }
    try{
        await db.query(`UPDATE "group" SET name = ? WHERE id = ?`, [body["name"], id])
        return {"success": true}
    } catch (err) {
        console.log("Error while updating data to database: ", err.message)
        return {"success": false}
    }
}

async function remove(id) {
    if (!helper.validID(id)) {
        const error = new Error("Invalid ID");
        error.statusCode = 400;
        throw error;
    }
    try{
        await db.query(`DELETE FROM "group" WHERE id = ?`, [id])
        await db.query(`DELETE FROM item WHERE group_id = ?`, [id])
        return {"success": true}
    } catch (err) {
        console.log("Error while delete data from database: ", err.message)
        return {"success": false}
    }
}

module.exports = {
    getMultiple,
    get,
    create,
    update,
    remove
}