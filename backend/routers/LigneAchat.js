const express = require("express");
const router = express.Router();
const ligneAchatsCtrl = require("../controllers/lignesAchat");

router.post("/", ligneAchatsCtrl.createLigneAchat);
//router.get("/:id", fournisseursCtrl.getFournisseur);
//router.put('/:id', fournisseursCtrl.updateFournisseur);
router.delete("/:id", ligneAchatsCtrl.deleteOneLine);
router.get("/", ligneAchatsCtrl.getAllLignes);
module.exports = router;
