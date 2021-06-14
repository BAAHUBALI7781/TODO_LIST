
const DB_user='baahubali7781';
const password=encodeURIComponent('Hello@12345');
const DB_URL=`mongodb+srv://${DB_user}:${password}@cluster0.3hoof.mongodb.net/todo-list?retryWrites=true&w=majority`

const mongoose=require('mongoose');
mongoose.connect(DB_URL || 'mongodb://localhost/todo_list');
const db=mongoose.connection;
db.on('error',console.error.bind(console,'error while creating database'));
db.once('open',function(){
    console.log('Succesfully connected to database');
});

