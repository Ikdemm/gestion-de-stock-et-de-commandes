const express = require('express');
const router = express.Router();
const pdtCtrl=require('../controllers/produits')
//const isAuth=require('../middlewares/is-auth')
//const {isMagasinier_appro , isAdmin}=require('../middlewares/permissions')

router.post('/', pdtCtrl.createProduit );
  router.get('/:id', pdtCtrl.getOneProduit) ;
  router.put('/:id', pdtCtrl.updateOneProduit);
  router.delete('/:id', pdtCtrl.deleteOneProduit);
  router.get('/',pdtCtrl.getAllProduits );


module.exports=router