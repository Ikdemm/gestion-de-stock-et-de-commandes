const express = require('express');
const router = express.Router();
const categorieCtrl= require('../controllers/categories');

router.post('/', categorieCtrl.createCategorie) ;
router.get('/:id', categorieCtrl.getOneCategorie) ;
router.get('/', categorieCtrl.getAllCategories );
router.put('/:id', categorieCtrl.updateCategory );
router.delete('/:id', categorieCtrl.deleteCategory );

module.exports=router