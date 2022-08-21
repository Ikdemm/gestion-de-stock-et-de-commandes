const express = require("express");
const router = express.Router();
const ligneVentesCtrl = require("../controllers/lignesAvoirVente");

router.post("/", ligneVentesCtrl.createLigneVente);
router.get("/:id", ligneVentesCtrl.getLineById);
router.put('/:id', ligneVentesCtrl.updateOneLine);
router.delete("/:id", ligneVentesCtrl.deleteOneLine);
router.get("/", ligneVentesCtrl.getAllLignes);
module.exports = router;
