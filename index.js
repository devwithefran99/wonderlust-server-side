import express, { json } from "express";
import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config'
import cors from "cors"




const app = express();
const PORT = 5000;

app.use(cors())
app.use(express.json())


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

const MongoUser = await connectToMongoDB()

const db =  MongoUser.db("wonderlust")
const destinationCollection = db.collection('destination')

app.post('/add-destination' , async(req , res) => {
  const data = req.body

  const result = await destinationCollection.insertOne(data)
  console.log(result)
  res.send(result)
})
app.get('/destination' , async (req , res) => {
  const result = await destinationCollection.find().toArray()
  res.send(result)
})

app.get('/destination/:id' , async (req , res) =>  {
  const {id} = req.params
  const result = await destinationCollection.findOne({_id : new ObjectId(id)})

  res.send(result);

})

app.get("/", (req, res) => {
  res.send({ message: "server is running" });
});

app.listen(PORT, () => {
  console.log(`Server has been connected at ${PORT}`);
});
