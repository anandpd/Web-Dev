
var express = require('express')
var router = express.Router();
var passport = require('passport')
var User = require('../models/user')

router.get('/', (req, res) => res.render('landing'))


router.get('/register',(req,res)=>res.render('register'))
router.post('/register',(req,res)=>{
    User.register(new User({username : req.body.username}) , req.body.password,(err,user)=>{
        if (err){
            req.flash('error',err.message)
            console.log(err)
            res.render('register')
        }
       passport.authenticate('local')(req,res,function () { 
           req.flash('success','Welocme to CampSpot : '+req.body.username)
           res.redirect('/campgrounds')
        })
    })
})

    // ==============   LOGIN ===============================

router.get('/login',(req,res)=>res.render('login'))
router.post('/login',passport.authenticate('local',{
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}))
    // ==================   LOGOUT  ============================

router.get('/logout',(req,res)=>{
    req.logOut();
    req.flash('success','Logged You out :)')
    res.redirect('/campgrounds')
})
module.exports = router;