var express = require('express');
var app = express();
var bodyParser = require('body-parser')   
const cors = require('cors');
app.use(cors());
const { MongoClient } = require("mongodb");
var jsonParser = bodyParser.json()

const uri = "mongodb+srv://harshitsinha946:Patner%40221@harshitblog.ernox.mongodb.net/";
const client = new MongoClient(uri);
const database = client.db('HarshitBlog');
let blogs = database.collection('Blog');

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
 
app.get('/api/getblog', async (req, res) => {
  try {
    await client.connect();
    const query = { name: 'Harshit' };
    const blog = await blogs.find(query);

    if (blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});
app.post('/api/insertblog', jsonParser,async(req,res)=>{
    console.log("this is request",req['body']);
    
try{
  console.log("1",req.body);
  
    await client.connect();
    let userData = {
      name: req.body.name,
      Age: req.body.Age
  }
  console.log("2");
  
    const blog=await blogs.insertOne(userData);
    if (blog) {
        res.status(200).json(blog);
      } else {
        res.status(404).json({ message: 'Blog not found' });
      }
}catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
  }
})
