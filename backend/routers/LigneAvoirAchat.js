const express = require("express");
const router = express.Router();
const ligneAchatsCtrl = require("../controllers/lignesAvoirAchat");

router.post("/", ligneAchatsCtrl.createLigneAchat);
router.get("/:id", ligneAchatsCtrl.getLineById);
router.put('/:id', ligneAchatsCtrl.updateOneLine);
router.delete("/:id", ligneAchatsCtrl.deleteOneLine);
router.get("/", ligneAchatsCtrl.getAllLignes);
module.exports = router;
