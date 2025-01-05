var express=require('express')
var app=express()
app.listen(4000,()=>{
console.log("App listen on port 4000");

})
const mongoose = require('mongoose');
mongoose.connect('URL', () => {
   console.log("Connected to Mongo DB Successfully!!");
})