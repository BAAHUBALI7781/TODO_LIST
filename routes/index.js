const express=require('express');
const router=express.Router();

const homeController=require('../controller/home_controller');
const todoController=require('../controller/todo_controller');

router.get('/',homeController.home);
router.post('/create-todo',todoController.addTodo);
router.post('/delete-todo',todoController.deleteTodo);
module.exports=router;