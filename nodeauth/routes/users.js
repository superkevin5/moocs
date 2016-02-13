var express = require('express');
var router = express.Router();
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('../models/users.js');


router.post('/register',function(req,res,next){

  var newUser = new User({
    name:'dasdasdas',
    email:'1111',
    username:'dd'
  });

  User.createUser(newUser,function(err,user){
    console.log(err,user);
  });

});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register',{
    'title':'Register'
  });
  //res.send('respond with a resource');
});


passport.use(new localStrategy(function(username,password,done){




}));

router.post('/login',passport.authenticate('local',{failureRedirect:'/users/login',failureFlash:'Invalid username or passport'}),function(req,res){
  console.log('Authentication Success');
  req.flash('success','You are logged in');

});




module.exports = router;
