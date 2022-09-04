const express=require('express');
const router=express.Router();
const userCtrl=require('../controllers/users');
const User= require('../models/User');
const { body } = require('express-validator');

router.post('/register',[
  body('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom(async (value) => {
          const userDoc = await User.findOne({ email: value });
        if (userDoc) {
          return Promise.reject('E-mail address already exists !');
        }
      }),
      //.normalizeEmail(),
  body('password').trim().isLength({min : 6})
],  userCtrl.register);
router.post('/login', userCtrl.login);
router.post('/logout', userCtrl.logout);
//router.get('/getme',   userCtrl.userProfile );
//router.get('/user/:id', userCtrl.singleUser );
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