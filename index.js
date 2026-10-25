import express from "express";
import { MongoClient } from 'mongodb';
import 'dotenv/config'

const app = express();
const PORT = 5000;



const client = new MongoClient(process.env.MONGODB_URI);
export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

connectToMongoDB()

app.post('/add-destination' , (req , res) => {
  console.log('api called!')
  res.send({message:`api is working`})
})

app.get("/", (req, res) => {
  res.send({ message: "server is running" });
});

app.listen(PORT, () => {
  console.log(`Server has been connected at ${PORT}`);
});
