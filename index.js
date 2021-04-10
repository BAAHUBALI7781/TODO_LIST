const express=require('express');
const port=8080;
const app=express();

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