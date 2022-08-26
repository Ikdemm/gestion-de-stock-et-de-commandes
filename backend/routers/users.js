const express=require('express');
const router=express.Router();
const userCtrl=require('../controllers/users');
const User= require('../models/User')
router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/all-users', function(req, res) {
    User.find({}, function(err, users) {
      var userMap = {};
  
      users.forEach(function(user) {
        userMap[user._id] = user;
      });
  
      res.send(userMap);  
    });
  });
module.exports=router;