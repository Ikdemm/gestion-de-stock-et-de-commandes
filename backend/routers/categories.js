const express = require('express');
const router = express.Router();
const categorieCtrl= require('../controllers/categories');
const isAuth=require('../middlewares/is-auth')
const {isMagasinier_appro , isAdmin}=require('../middlewares/permissions')
router.post('/',isAuth,isMagasinier_appro,isAdmin, categorieCtrl.createCategorie) ;
router.get('/:id',isAuth,isMagasinier_appro,isAdmin, categorieCtrl.getOneCategorie) ;
router.get('/',isAuth,isMagasinier_appro,isAdmin, categorieCtrl.getAllCategories );
router.put('/:id',isAuth,isMagasinier_appro,isAdmin, categorieCtrl.updateCategory );
router.delete('/:id',isAuth,isMagasinier_appro,isAdmin, categorieCtrl.deleteCategory );

module.exports=router