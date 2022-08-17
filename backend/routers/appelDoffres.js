const express = require('express');
const router = express.Router();
const appelsDoffresCtrl= require('../controllers/appelsDoffres');
const isAuth=require('../middlewares/is-auth')
const {isMagasinier_appro , isAdmin}=require('../middlewares/permissions')
router.post('/',isAuth,isMagasinier_appro,isAdmin, appelsDoffresCtrl.createAppelDoffre) ;
router.get('/:id',isAuth,isMagasinier_appro,isAdmin, appelsDoffresCtrl.getOneAppelDoffre) ;
router.get('/',isAuth,isMagasinier_appro,isAdmin, appelsDoffresCtrl.getAllAppelDoffres );
router.put('/:id',isAuth,isMagasinier_appro,isAdmin, appelsDoffresCtrl.updateApo );
router.delete('/:id',isAuth,isMagasinier_appro,isAdmin, appelsDoffresCtrl.deleteAppelDoffre );

module.exports=router