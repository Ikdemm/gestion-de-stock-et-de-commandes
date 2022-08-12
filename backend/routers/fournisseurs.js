const express = require("express");
const router = express.Router();
const fournisseursCtrl = require("../controllers/fournisseurs");

router.post("/", fournisseursCtrl.createFournisseur);
router.get("/:id", fournisseursCtrl.getFournisseur);
router.put('/:id', fournisseursCtrl.updateFournisseur);
router.delete("/:id", fournisseursCtrl.deleteFournisseur);
router.get("/", fournisseursCtrl.getAllFournisseurs);
module.exports = router;
