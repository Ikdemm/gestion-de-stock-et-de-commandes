const express = require('express');
const router = express.Router();
const stockCtrl= require('../controllers/stocks');

router.post('/', stockCtrl.createCategorie) ;
//router.get('/:id', categorieCtrl.getOneCategorie) ;
//router.get('/', categorieCtrl.getAllCategories );
//router.put('/:id', categorieCtrl.updateCategory );
//router.delete('/:id', categorieCtrl.deleteCategory );

module.exports=router