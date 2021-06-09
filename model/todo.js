const mongoose=require('mongoose');

const todoSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
    },
    date:{
        type:String,
        required:true,

    }
});

const TodoList=mongoose.model('TodoList',todoSchema);
module.exports=TodoList;