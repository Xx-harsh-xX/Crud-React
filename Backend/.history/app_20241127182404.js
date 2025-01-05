var express=require('express')
var app=express()
app.listen(4000,()=>{
console.log("App listen on port 4000");

})
const { MongoClient } = require("mongodb");
const uri =
"mongodb+srv://harshitsinha946:Patner%40221@harshitblog.ernox.mongodb.net/";
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    const database = client.db('sample_mflix');
    const movies = database.collection('Blog');
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);
    console.log(movie);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
