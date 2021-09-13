const { Router } = require('express');
const express = require('express');
const router = express.Router();  
const conexion = require('../database');

router.get('/add',(req,res)=>{
    res.render('links/add');
});

router.post('/add', async (req,res)=>{
    // console.log(req.body);
    const { title,url,description } = req.body;
    const newLink ={
        title,
        url,
        description 
    };
    // console.log(newLink);
    await conexion.query('INSERT INTO links set ?',[newLink]);
    //req.flash('success','Enlace agregado Correctamente');
    res.redirect('/links');
});


router.get('/',(req,res)=>{
    // res.render('index.ejs',{var1:'esto es una variable'});
    conexion.query('SELECT * FROM links',(error,links)=>{
        if (error) {
            throw error;
        } else {
            res.render('links/list',{links});
        }
    }); 
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await conexion.query('DELETE FROM links WHERE ID = ?', [id]);
    // req.flash('success', 'Link Removed Successfully');
    res.redirect('/links');
});

router.get('/edit/:id',(req,res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM links WHERE id=?',[id],(error,results)=>{
        if (error) {
            throw error;
        } else {
            res.render('links/edit',{link:results[0]});
        }
        
    });
});

router.post('/edit/:id',async(req,res)=>{
    const{id} = req.params;
    const{title,description,url}=req.body;
    const newLink={
        title,
        description,
        url
    };
    await conexion.query('UPDATE links set ?  WHERE id = ?',[newLink,id]);
    res.redirect('/links');
    // console.log(newLink);
    // res.send('UPDATED');

});




module.exports = router;