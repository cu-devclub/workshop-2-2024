const db = require("../models/db.service")
const helper= require("../utils/helper.util")


async function get(id) {
    if (!helper.validID(id)) {
        const error = new Error("Invalid ID");
        error.statusCode = 400;
        throw error;
    }
    const rows = await db.query("SELECT id, name, quantity, checked, created_at FROM group WHERE id = ?", [id])
    return helper.emptyOrRows(rows)
}

async function create(body) {
    if (!body || Object.keys(body).length === 0 || !body["name"] || !body["quantity"] || !body["group_id"]) {
        const error = new Error("Unprocessable Content");
        error.statusCode = 422;
        throw error;
    }
    
    // Check if the group_id exists in the "group" table
    try {
        const groupCheck = await db.query(`SELECT 1 FROM "group" WHERE id = ?`, [body["group_id"]]);
        if (groupCheck.length === 0) {
            const error = new Error("Group ID not found");
            error.statusCode = 404;
            throw error;
        }
    } catch (err) {
        console.log("Error while checking group ID: ", err.message);
        const error = new Error("Error checking group ID");
        error.statusCode = 500;
        throw error;
    }

    // Proceed with item creation
    try {
        await db.query(`INSERT INTO item (name, quantity, group_id) VALUES (?, ?, ?)`, [body["name"], body["quantity"], body["group_id"]]);
        return { "success": true };
    } catch (err) {
        console.log("Error while inserting data to database: ", err.message);
        return { "success": false };
    }
}

async function update(id, body) {
    if (!helper.validID(id)) {
        const error = new Error("Invalid ID");
        error.statusCode = 400;
        throw error;
    }

    if (!body || Object.keys(body).length === 0) {
        const error = new Error("Unprocessable Content");
        error.statusCode = 422;
        throw error;
    }

    const fieldsToUpdate = [];
    const values = [];

    if (body["group_id"] !== undefined) {
        fieldsToUpdate.push('group_id = ?');
        values.push(body["group_id"]);
    }

    if (body["name"] !== undefined) {
        fieldsToUpdate.push('name = ?');
        values.push(body["name"]);
    }

    if (body["quantity"] !== undefined) {
        fieldsToUpdate.push('quantity = ?');
        values.push(body["quantity"]);
    }

    if (body["checked"] !== undefined) {
        fieldsToUpdate.push('checked = ?');
        values.push(body["checked"]);
    }

    if (fieldsToUpdate.length === 0) {
        const error = new Error("No valid fields to update");
        error.statusCode = 422;
        throw error;
    }

    values.push(id);

    try {
        const query = `UPDATE "item" SET ${fieldsToUpdate.join(", ")} WHERE id = ?`;
        await db.query(query, values);
        return { "success": true };
    } catch (err) {
        console.log("Error while updating data to database: ", err.message);
        return { "success": false };
    }
}

async function remove(id) {
    if (!helper.validID(id)) {
        const error = new Error("Unprocessable Content");
        error.statusCode = 400;
        throw error;
    }
    try{
        await db.query(`DELETE FROM item WHERE id = ?`, [id])
        return {"success": true}
    } catch (err) {
        console.log("Error while delete data from database: ", err.message)
        return {"success": false}
    }
}

module.exports = {
    get,
    create,
    update,
    remove
}