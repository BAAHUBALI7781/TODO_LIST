const express=require('express');
const port=8020;
const app=express();

//Setting the view Engine
app.set('view engine','ejs');
//Setting the views(ejs)
app.set('views','./views');
app.use(express.urlencoded());

//importing database
const db=require('./config/mongoose');
//importing database schema
const TodoList=require('./model/todo');

// Routes
app.use('/',require('./routes/index.js'));

//Importing assets
app.use(express.static('assets'));

app.listen(port,function(err){
    if(err)
    {
        console.log('Error found ',err);
        return;
    }
    else{
        console.log('Server Established!!');
    }
});