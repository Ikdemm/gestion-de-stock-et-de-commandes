const express = require('express');
const router = express.Router();
const categorieCtrl= require('../controllers/categories');
//const isAuth=require('../middlewares/is-auth')
//const {isMagasinier_appro , isAdmin}=require('../middlewares/permissions')
router.post('/', categorieCtrl.createCategorie) ;
router.get('/:id',categorieCtrl.getOneCategorie) ;
router.get('/', categorieCtrl.getAllCategories );
router.put('/:id', categorieCtrl.updateCategory );
router.delete('/:id',categorieCtrl.deleteCategory );

module.exports=router