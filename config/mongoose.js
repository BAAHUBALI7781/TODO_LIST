
const mongoose=require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/todo_list');
const db=mongoose.connection;
db.on('error',console.error.bind(console,'error while creating database'));
db.once('open',function(){
    console.log('Succesfully connected to database');
});

module.exports=mongoose;