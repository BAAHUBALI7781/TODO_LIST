const express=require('express');
const port=8020;
const app=express();
const db=require('./config/mongoose');

const passport=require('passport');
const passportLocal=require('./config/passport-local');

const ejsLayouts=require('express-ejs-layouts');

app.use(express.static('assets'));
app.use(express.urlencoded());

app.use(ejsLayouts);

// app.set('layout extractStyles',true);
// app.set('layout extractScripts',true);

//Setting the view Engine
app.set('view engine','ejs');
//Setting the views(ejs)
app.set('views','./views');

// Routes
const expressSession=require('express-session');
const MongoStore = require('connect-mongo');
app.use(expressSession({
    name:'Tododo',
    secret:'Something',
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:MongoStore.create({
        mongoUrl:'mongodb://localhost/todo_list',
        autoRemove:'disabled',
    },function(err){
        console.log(err);
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


app.use('/',require('./routes/index.js'));


//Importing assets


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