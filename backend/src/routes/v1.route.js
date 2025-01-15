const express = require('express');
const router = express.Router();

const group = require("../controllers/group.controller")
const item = require("../controllers/item.controller")

router.get("/groups", group.getMultiple)
router.get("/group/:id", group.get)
router.post("/group", group.create)
router.put("/group/:id", group.update)
router.delete("/group/:id", group.remove)

router.get("/item/:id", item.get)
router.post("/item", item.create)
router.put("/item/:id", item.update)
router.delete("/item/:id", item.remove)


module.exports = router;