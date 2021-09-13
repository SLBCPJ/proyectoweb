const express = require('express');
const router = express.Router();
// const conexion = require('../database');


router.get('/',(req,res)=>{
    res.send('Hello World')
});

module.exports = router;