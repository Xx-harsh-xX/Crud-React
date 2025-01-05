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
let demo1=database.collection('demp-surgery-status')
var nodemailer = require('nodemailer');

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
 
app.get('/api/getblog', async (req, res) => {
  try {
    await client.connect
    const cursor = blogs.find();
    const blog = await cursor.toArray();

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

app.post('/api/insertblog', jsonParser,async(req,res)=>{
    console.log("this is request",req['body']);
    
try{
  console.log("1",req.body);
  
    await client.connect();
    let userData = {
      name: req.body.name,
      Age: req.body.Age,
      email:req.body.email,
      gender:req.body.gender
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
app.post('/api/updateBlog',jsonParser, async(req,res)=>{
  try{
    await client.connect()
    const { ObjectId } = require('mongodb');
    cursor=await blogs.findOneAndUpdate(
      { _id: new ObjectId(req.body._id) },
      { status: req.body.status  },
    );
    if(cursor){
      res.status(200).json(cursor);
    }
    else{
      res.status(400).json({ message: 'Blog not found' });
    }}catch(e){
      console.error(e);
    res.status(500).json({ message: 'Internal Server Error' });
    }finally{
      
    }
  } 
)
app.post('/api/deleteBlog',jsonParser,async(req,res)=>{
try{
  const { ObjectId } = require('mongodb');
  let pointer=blogs.deleteOne({_id:new ObjectId(req.body._id)})
  if(pointer){
    res.status(200).json({message:'Object Deleted Successfully'})
  }
  else{
    res.status(400)
  }
}catch(e){
  res.status(500).json({message:"Internal Server Error"})
}
})
app.post('/api/triggerOtp',jsonParser,async(req,res)=>{
  const sendmail = require('sendmail')();

  sendmail({
    from: 'test@finra.org',
    to: 'harshitsinha946@gmail.com',
    subject: 'Hello World',
    html: 'Mail of test sendmail '
  }, function (err, reply) {
    console.log(err && err.stack)
    console.dir(reply)
  })
  });
  
  transporter.sendMail({
    from: "sender@example.com",
    to: "recipient@example.com",
    subject: "Message",
    text: "I hope this message gets through!",
    auth: {
      user: "user@example.com",
      refreshToken: "1/XXxXxsss-xxxXXXXXxXxx0XXXxxXXx0x00xxx",
      accessToken: "ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x",
      expires: 1484314697598,
    },
  });
  try{
    let node=database.collection('otp-expire')
    console.log("this is otp exp",req);
    
  }
})

