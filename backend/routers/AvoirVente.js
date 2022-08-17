const express = require("express");
const router = express.Router();
const factVenteCtrl = require("../controllers/avoirs_vente");

router.post("/", factVenteCtrl.createInvoice);
router.get("/:id", factVenteCtrl.getInvoiceById);
router.put('/:id', factVenteCtrl.updateInvoice);
//no one is allowed to delete invoice
//router.delete("/:id", fournisseursCtrl.deleteFournisseur);
router.get("/", factVenteCtrl.getAllInvoices);
module.exports = router;
