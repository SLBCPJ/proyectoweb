const express = require('express');
const router = express.Router();  
const passport = require('passport');

router.get('/signup',(req,res)=>{
    res.render('auth/signup');
});
// router.post('/signup',(req,res)=>{
//     passport.authenticate('local.signup',{
//         successRedirect: '/profile',
//         failureRedirect: '/signup',
//         failureFlash: true
//     });
//     //console.log(req.body);
//     res.send('received');
// });
router.post('/signup',passport.authenticate('local.signup',{
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
}));
router.get('/profile',(req,res)=>{
    res.send('this is your profile')
});
module.exports = router;