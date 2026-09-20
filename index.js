import { MongoClient } from 'mongodb';
import express from 'express'

const dbName = "school"
const url = "mongodb://localhost:27017/"

const client = new MongoClient(url);

// async function dbConnection(){
//     await client.connect();
//     const db = client.db(dbName);
//     const Collection = db.collection('students')

//     const result = await Collection.find().toArray()
//     console.log(result); 
// }
// dbConnection()
const app = express();


// Displaying Data From MongoDB
app.set("view engine","ejs");

app.get('/',async(req,resp)=>{
    await client.connect();
    const db = client.db(dbName);
    const Collection = db.collection('students')

    const students = await Collection.find().toArray()
    console.log(students); 
    resp.render('students',{students});
})

app.listen(3200);
