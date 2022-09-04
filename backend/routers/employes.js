const express = require('express');
const router = express.Router();
//const upload = require('../middlewares/uploadImagesEmployes')
const multer = require('../middlewares/uploadImagesEmployes')
const empCtrl=require('../controllers/employes');
const isAuth = require('../middlewares/is-auth');
router.post('/',multer, empCtrl.createEmploye );
//router.post('/', upload.single('imageUrl'), empCtrl.createEmploye );
  router.get('/:id', empCtrl.getOneEmploye) ;
  //router.put('/:id',multer, empCtrl.updateOneEmploye);
  router.put('/:id', empCtrl.updateOneEmploye);
  router.put('/:id/image',multer, empCtrl.updateImage);
  router.delete('/:id', empCtrl.deleteOneEmploye);
  router.get('/', empCtrl.getAllEmployes );

module.exports=router