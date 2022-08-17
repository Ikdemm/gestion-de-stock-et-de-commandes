const express = require("express");
const router = express.Router();
const demandesCtrl = require("../controllers/demandes");

router.post("/", demandesCtrl.createDemande);
router.get("/:id", demandesCtrl.getOneDemande);
router.put('/:id', demandesCtrl.updateOneDemande);
router.delete("/:id", demandesCtrl.deleteOneDemande);
router.get("/", demandesCtrl.getAllDemandes);
router.get("/nonTraitees", demandesCtrl.getDemandesNonTraitees);
router.get("/employee", demandesCtrl.getDemandesParEmploye);
module.exports = router;
