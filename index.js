import { MongoClient } from 'mongodb';
import express from 'express'

const dbName = "school"
const url = "mongodb://localhost:27017/"

const client = new MongoClient(url);

async function dbConnection(){
    await client.connect();
    const db = client.db(dbName);
    const Collection = db.collection('students')

    const result = await Collection.find().toArray()
    console.log(result); 
}
dbConnection()
const app = express();

// Displaying Data from mongoDb

app.listen(3200);