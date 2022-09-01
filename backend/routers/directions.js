const express = require('express');
const router = express.Router();
const directionCtrl= require('../controllers/directions');
router.post('/', directionCtrl.createDirection) ;
router.get('/:id', directionCtrl.getOneDirection) ;
router.put('/:id', directionCtrl.updateDirection) ;
router.get('/', directionCtrl.getAllDirections );
router.delete('/:id', directionCtrl.deleteDirection );

module.exports=router