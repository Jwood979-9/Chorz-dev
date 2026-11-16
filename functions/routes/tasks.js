const express = require('express');
const router = express.Router();
const {db} = require('../config/firebase');

router.post('/', async (req, res) => {
    try {
        const newTask = req.body;
        const exTitle = newTask.title; 
        const exClinicId = newTask.clinicId;   

        if (!exClinicId || !exTitle) {
           return res.status(400).json({
            success: false,
            message: "Missing required fields:"
           });
        }

        const docRef = await db.collection('tasks').add(newTask);

        res.status(201).json({
            success: true,
            id: docRef.id
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const { cursor } = req.query;
        const limitAmount = 5;

        let tasksQuery = db.collection('tasks').orderBy('title').limit(limitAmount);

        if (cursor) {
            const cursorDoc = await db.collection('tasks').doc(cursor).get();
            if (cursorDoc.exists) {
                tasksQuery = tasksQuery.startAfter(cursorDoc);
            }
        }

        const response = await tasksQuery.get();
        
        const taskData = response.docs.map(task => {
            const rawData = task.data();
            return {
                id: task.id, 
                clinicId: rawData.clinicId,
                title: rawData.title,
                status: rawData.status
            };
        });

        const lastVisibleDoc = response.docs[response.docs.length - 1];
        const nextCursor = lastVisibleDoc ? lastVisibleDoc.id : null;

        res.status(200).json({
            success: true,
            data: taskData,
            nextCursor: nextCursor 
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/stats', async (req, res) => {
    try {
        const totalSnapshot = await db.collection('tasks').count().get();
        const totalTasks = totalSnapshot.data().count;

        const completedSnapshot = await db.collection('tasks').where('status', '==', 'completed').count().get();
        const completedTasks = completedSnapshot.data().count;
        
        const incompleteTasks = totalTasks - completedTasks;

        res.status(200).json({
            success: true,
            data: {
                total: totalTasks,
                completed: completedTasks,
                incomplete: incompleteTasks
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Update payload cannot be empty"
            });
        }
        
        const taskId = req.params.id;
        const newData = req.body;
        
        await db.collection('tasks').doc(`${taskId}`).update(newData);
    
        res.status(200).json({
            success: true,
            message: "Task updated"
        });

    } catch (error) {
       res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        await db.collection('tasks').doc(`${taskId}`).delete();
    
        res.status(200).json({
            success: true,
            message: "Task deleted"
        });

    } catch (error) {
       res.status(500).json({ error: error.message });
    }
});

module.exports = router;