const express = require("express");
const router = express.Router();
const factAchatCtrl = require("../controllers/factures_achat");

router.post("/", factAchatCtrl.createInvoice);
//router.get("/:id", fournisseursCtrl.getFournisseur);
//router.put('/:id', fournisseursCtrl.updateFournisseur);
//router.delete("/:id", fournisseursCtrl.deleteFournisseur);
//router.get("/", fournisseursCtrl.getAllFournisseurs);
module.exports = router;
