var express = require('express');
var app = express();
const cors = require('cors');
app.use(cors());
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://harshitsinha946:Patner%40221@harshitblog.ernox.mongodb.net/";
const client = new MongoClient(uri);
const database = client.db('HarshitBlog');
const blogs = database.collection('Blog');

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
 
app.get('/api/getblog', async (req, res) => {
  try {
    await client.connect();
    const query = { name: 'Harshit' };
    const blog = await blogs.findOne(query);

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
app.post('api/insertblog',async(req,res)=>{
try{
    await client.connect();
    const query= req
    const blog=await coll.insertOne(query);
    if (blog) {
        res.status(200).json(blog);
      } else {
        res.status(404).json({ message: 'Blog not found' });
      }
}catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
})
