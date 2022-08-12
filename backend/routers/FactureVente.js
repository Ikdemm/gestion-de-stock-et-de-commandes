const express = require("express");
const router = express.Router();
const factVenteCtrl = require("../controllers/factures_vente");

router.post("/", factVenteCtrl.createInvoice);
//router.get("/:id", fournisseursCtrl.getFournisseur);
//router.put('/:id', fournisseursCtrl.updateFournisseur);
//router.delete("/:id", fournisseursCtrl.deleteFournisseur);
//router.get("/", fournisseursCtrl.getAllFournisseurs);
module.exports = router;
