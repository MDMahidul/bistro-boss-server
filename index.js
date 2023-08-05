const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port  = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json())

/* ---------------------------------- */

const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0cmlqfw.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const menuCollection = client.db("bistroDB").collection("menu");
    const reviewCollection = client.db("bistroDB").collection("reviews");

    //menu data read
    app.get('/menu',async(req,res)=>{
        const result = await menuCollection.find().toArray();
        res.send(result)
    })
    //review data read
    app.get('/reviews',async(req,res)=>{
        const result = await reviewCollection.find().toArray();
        res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

/* -------------------------- */

app.get('/',(req,res)=>{
    res.send('boss is on business');
})

app.listen(port,()=>{
    console.log('bistro boss is running on port:',port);
})