const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task');

// Define routes
router.get('/tasks/:userId', taskController.getAllTasks); 
router.post('/tasks/:userId', taskController.createTask); 
router.put('/tasks/:userId', taskController.updateTask); 
router.delete('/tasks/:userId', taskController.deleteTask); 
module.exports = router;
