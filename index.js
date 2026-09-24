import { MongoClient } from 'mongodb';
import express, { urlencoded } from 'express'

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
// for save data form 
app.use(express.urlencoded({extended:true}))

// app.get('/',async(req,resp)=>{
//     await client.connect();
//     const db = client.db(dbName);
//     const Collection = db.collection('students')

//     const students = await Collection.find().toArray()
//     console.log(students); 
//     resp.render('students',{students});
// })

// Make API with Mongo (also a alternate good way to connect mongoDB)

client.connect().then((connection) =>{
    const db = connection.db(dbName);

    app.get("/api",async(req,resp)=>{
        const Collection = db.collection("students");
        const students = await Collection.find().toArray();
        resp.send(students);
    })

      app.get("/ui",async(req,resp)=>{
        const Collection = db.collection("students");
        const students = await Collection.find().toArray();
        resp.render('students',{students});
    })

    // save data with form in mongodb
    app.get("/add", (req, resp) => { 
    resp.render("add-student") 
    });

    
    app.post("/add-student",async(req,resp)=>{
         const Collection = db.collection("students");
         const result = await Collection.insertOne(req.body)
         console.log(result)
        // const students = await Collection.find().toArray();
        resp.send("data saved");
        console.log(req.body);
    })




   // app.post("/add-student")
})

app.listen(3200);
