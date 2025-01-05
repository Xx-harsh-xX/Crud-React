var express = require('express');
var app = express();
const cors = require('cors');
app.use(cors());
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://harshitsinha946:Patner%40221@harshitblog.ernox.mongodb.net/";
const client = new MongoClient(uri);

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
 
app.get('/api/blog', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('HarshitBlog');
    const blogs = database.collection('Blog');
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
  }
});
