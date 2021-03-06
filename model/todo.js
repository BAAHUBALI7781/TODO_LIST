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

    },
    time:{
        type:'String',
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
});

const TodoList=mongoose.model('TodoList',todoSchema);
module.exports=TodoList;