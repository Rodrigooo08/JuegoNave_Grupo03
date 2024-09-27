const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/public/views/index.html");
})

//routing
app.use('/src',express.static(__dirname+"/src"));
app.use('/public',express.static(__dirname+"/public"));
app.use('/node_modules',express.static(__dirname+"/node_modules"));
//listening
app.listen(5000,()=>{
    console.log("Servidor Node Corriendo PERFECTAMENTE")
})