const express = require("express");
const router = express.Router();
const factAchatCtrl = require("../controllers/factures_achat");

router.post("/", factAchatCtrl.createInvoice);
router.get("/:id", factAchatCtrl.getInvoiceById);
router.put('/:id', factAchatCtrl.updateInvoice);
//router.delete("/:id", factAchatCtrl.deleteInvoice);
router.get("/", factAchatCtrl.getAllInvoices);
module.exports = router;
