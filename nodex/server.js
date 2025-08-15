const express = require("express");

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://abdullrazaqnq13:4KFxUbAE2iThR4aJ@cluster0.3izdpk4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const app = express();
let collection;
let query;
async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    const database = client.db("sample_mflix");
    collection = database.collection("comments");
    query = { name: "abdullrazaqnq13" };
  } catch (err) {
    // Ensures that the client will close when you finish/error
    console.error("❌ DB Connection Error:", err);
  }
}

app.get("/", async (req, res) => {
  const comments = await collection.findOne(query);
  res.json({ messege: "hello", data: comments });
});
run().catch(console.dir);

app.listen(3000);
