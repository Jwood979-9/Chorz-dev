const express = require('express');
const router = express.Router();
const {db} = require('../config/firebase');


router.post('/', async (req,res) =>{
    try{

        const newTask = req.body ;  

        const docRef = await db.collection('tasks').add(rawJson);


        res.status(201).json({
            success:true ,
            id: docRef.id
        });



    } catch (error){

       res.status(500).json({error:error.message });

    }




})

exports = router ;