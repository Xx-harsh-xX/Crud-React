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
    const database = client.db('HarshitBlog');
    const blogs = database.collection('Blog');
    const query = { name: 'Harshit' };
    const blog = await blogs.findOne(query);
    console.log(blog);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
