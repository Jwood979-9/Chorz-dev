const express = require('express');
const router = express.Router();
const {db} = require('../config/firebase');


router.post('/', async (req,res) =>{
    try{

        const newTask = req.body ;
        const exTitle =  newTask.title ; 
        const exClinicId = newTask.clinicId ;   

        if(!exClinicId || !exTitle ){
           return res.status(400).json({
            success: false,
            message:"Missing required fields:"

           });

        }

        const docRef = await db.collection('tasks').add(newTask);

        res.status(201).json({
            success:true ,
            id: docRef.id
        });

    } catch (error) {

        res.status(500).json({error:error.message });

    }

})


router.get('/', async (req,res) =>{
    try{

    
       const response = await db.collection('tasks').get();
       const taskData = response.docs.map( task => {
       const rawData = task.data();
        
       return {

           id: task.id , 
           clinicId: rawData.clinicId,
           title: rawData.title,
           status: rawData.status
                
        };

        });


       res.status(200).json({
            "success":true ,
            "data": taskData
        });

    } catch (error){

       res.status(500).json({error:error.message });

    }


})


router.put('/:id', async (req,res) =>{
    try{

        if(Object.keys(req.body).length === 0){
            return res.status(400).json({
                success:false,
                message: "Update payload cannot be empty"
            });
        }
        
        const taskId = req.params.id ;
        const newData = req.body ;
        
        

        const response = await db.collection('tasks').doc(`${taskId}`).update(newData);
    
       res.status(200).json({
            "success":true ,
            "message": "Task updated"
        });

    } catch (error){

       res.status(500).json({error:error.message });

    }


})

router.delete('/:id', async (req,res) =>{
    try{
        
        const taskId = req.params.id ;
       

        const response = await db.collection('tasks').doc(`${taskId}`).delete();
    
       res.status(200).json({
            "success":true ,
            "message": "Task deleted"
        });

    } catch (error){

       res.status(500).json({error:error.message });

    }


})

module.exports = router ;




