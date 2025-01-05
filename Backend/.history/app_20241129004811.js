var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require("mongodb");

app.use(cors());
app.use(bodyParser.json()); // Middleware for parsing JSON body

const uri = "mongodb+srv://harshitsinha946:Patner%40221@harshitblog.ernox.mongodb.net/";
const client = new MongoClient(uri);
const database = client.db('HarshitBlog');
const blogs = database.collection('Blog');

// Start the server
app.listen(4000, () => {
  console.log("App listening on port 4000");
});

// Route: Get all blogs
app.get('/api/getblog', async (req, res) => {
  try {
    // Connect to MongoDB
    await client.connect();

    // Fetch all blogs
    const blogList = await blogs.find().toArray();

    if (blogList && blogList.length > 0) {
      res.status(200).json(blogList);
    } else {
      res.status(404).json({ message: 'No blogs found' });
    }
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route: Insert a new blog
app.post('/api/insertblog', async (req, res) => {
  try {
    // Validate request body
    const { name, Age, email, gender } = req.body;

    if (!name || !Age || !email || !gender) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Connect to MongoDB
    await client.connect();

    // Construct the new blog object
    const userData = { name, Age, email, gender };

    // Insert the blog
    const result = await blogs.insertOne(userData);

    if (result.acknowledged) {
      res.status(201).json({ message: 'Blog added successfully', id: result.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to add the blog' });
    }
  } catch (error) {
    console.error('Error inserting blog:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

