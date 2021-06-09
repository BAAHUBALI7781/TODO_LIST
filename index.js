const express=require('express');
const port=8020;
const app=express();

const ejsLayouts=require('express-ejs-layouts');
app.use(ejsLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//Setting the view Engine
app.set('view engine','ejs');
//Setting the views(ejs)
app.set('views','./views');
app.use(express.urlencoded());

//importing database
const db=require('./config/mongoose');

// Routes
app.use('/',require('./routes/index.js'));

const expressSession=require('express-session')({
    secret:'Something',
    resave:true,
    saveUninitialized:false
});
//Importing assets
app.use(express.static('assets'));
app.use(expressSession);
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