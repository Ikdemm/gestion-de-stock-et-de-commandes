const express = require("express");
const router = express.Router();
const ligneVentesCtrl = require("../controllers/lignesVente");

router.post("/", ligneVentesCtrl.createLigneAchat);
//router.get("/:id", fournisseursCtrl.getFournisseur);
//router.put('/:id', fournisseursCtrl.updateFournisseur);
//router.delete("/:id", fournisseursCtrl.deleteFournisseur);
//router.get("/", fournisseursCtrl.getAllFournisseurs);
module.exports = router;
