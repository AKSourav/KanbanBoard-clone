const express = require('express');
const {protect} = require('../middleware/authMiddleware.js');
const {createTask, allTasks,updateTask, deleteTask}= require('../controllers/taskControllers.js');

const router= express.Router();

router.route('/').post(protect,createTask).get(protect,allTasks)
router.route('/:taskId').delete(protect,deleteTask);
router.route('/:taskId').patch(protect,updateTask);

module.exports= router;

