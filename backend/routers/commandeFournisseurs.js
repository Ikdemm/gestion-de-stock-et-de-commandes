const express = require("express");
const router=  express.Router();
const cmdFrsCtrl= require('../controllers/CommandeFournisseur');

router.post('/', cmdFrsCtrl.createCmdFournisseur)
router.get('/', cmdFrsCtrl.getAllCommandesFournisseurs)
module.exports = router;