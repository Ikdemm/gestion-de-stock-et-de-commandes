const express = require('express');
const router = express.Router();
const pdtCtrl=require('../controllers/produits')
const isAuth=require('../middlewares/is-auth')
const {isMagasinier_appro , isAdmin}=require('../middlewares/permissions')

router.post('/',isAuth,isMagasinier_appro,isAdmin, pdtCtrl.createProduit );
  router.get('/:id',isAuth,isMagasinier_appro,isAdmin, pdtCtrl.getOneProduit) ;
  router.put('/:id',isAuth,isMagasinier_appro,isAdmin, pdtCtrl.updateOneProduit);
  router.delete('/:id',isAuth,isMagasinier_appro,isAdmin, pdtCtrl.deleteOneProduit);
  router.get('/',isAuth,isMagasinier_appro,isAdmin, pdtCtrl.getAllProduits );


module.exports=router