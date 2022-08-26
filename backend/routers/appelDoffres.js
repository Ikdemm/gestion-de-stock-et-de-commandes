const express = require('express');
const router = express.Router();
const appelsDoffresCtrl= require('../controllers/appelsDoffres');
//const isAuth=require('../middlewares/is-auth')
//const {isMagasinier_appro , isAdmin}=require('../middlewares/permissions')
router.post('/', appelsDoffresCtrl.createAppelDoffre) ;
router.get('/:id', appelsDoffresCtrl.getOneAppelDoffre) ;
router.get('/', appelsDoffresCtrl.getAllAppelDoffres );
router.put('/:id', appelsDoffresCtrl.updateApo );
router.delete('/:id', appelsDoffresCtrl.deleteAppelDoffre );

module.exports=router