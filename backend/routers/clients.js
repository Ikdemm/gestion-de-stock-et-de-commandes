const express = require("express");
const router = express.Router();
const clientsCtrl = require("../controllers/clients");

router.post("/", clientsCtrl.createClient);
router.get("/:id", clientsCtrl.getClient);
router.put('/:id', clientsCtrl.updateClient);
router.delete("/:id", clientsCtrl.deleteClient);
router.get("/", clientsCtrl.getAllClients);
module.exports = router;
