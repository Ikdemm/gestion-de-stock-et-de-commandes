const express = require("express");
const router = express.Router();
const avoirAchatCtrl = require("../controllers/avoirs_achat");

router.post("/", avoirAchatCtrl.createInvoice);
router.get("/:id", avoirAchatCtrl.getInvoiceById);
router.put('/:id', avoirAchatCtrl.updateInvoice);
//router.delete("/:id", factAchatCtrl.deleteInvoice);
router.get("/", avoirAchatCtrl.getAllInvoices);
module.exports = router;
