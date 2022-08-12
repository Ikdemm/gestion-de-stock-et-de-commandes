const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadImagesEmployes')
const empCtrl=require('../controllers/employes');
const isAuth = require('../middlewares/is-auth');
router.post('/', upload.single('imageUrl'), empCtrl.createEmploye );
  router.get('/:id', empCtrl.getOneEmploye) ;
  router.put('/:id',upload.single('imageUrl'), isAuth, empCtrl.updateOneEmploye);
  router.delete('/:id', empCtrl.deleteOneEmploye);
  router.get('/', empCtrl.getAllEmployes );
  router.get('/active', empCtrl.getActiveEmployes );

module.exports=router