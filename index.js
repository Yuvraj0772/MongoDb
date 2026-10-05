// import { MongoClient, ObjectId } from 'mongodb';
// import express, { urlencoded } from 'express'

// const dbName = "school"
// const url = "mongodb://localhost:27017/"

// const client = new MongoClient(url);

// // async function dbConnection(){
// //     await client.connect();
// //     const db = client.db(dbName);
// //     const Collection = db.collection('students')

// //     const result = await Collection.find().toArray()
// //     console.log(result); 
// // }
// // dbConnection()
// const app = express();


// // Displaying Data From MongoDB
// app.set("view engine","ejs");
// // for save data form 
// app.use(express.urlencoded({extended:true}))
// //post api for save data 
// app.use(express.json());

// // app.get('/',async(req,resp)=>{
// //     await client.connect();
// //     const db = client.db(dbName);
// //     const Collection = db.collection('students')

// //     const students = await Collection.find().toArray()
// //     console.log(students); 
// //     resp.render('students',{students});
// // })

// // Make API with Mongo (also a alternate good way to connect mongoDB)

// client.connect().then((connection) =>{
//     const db = connection.db(dbName);

//     app.get("/api",async(req,resp)=>{
//         const Collection = db.collection("students");
//         const students = await Collection.find().toArray();
//         resp.send(students);
//     })

//       app.get("/ui",async(req,resp)=>{
//         const Collection = db.collection("students");
//         const students = await Collection.find().toArray();
//         resp.render('students',{students});
//     })

//     // save data with form in mongodb
//     app.get("/add", (req, resp) => { 
//     resp.render("add-student") 
//     });

    
//     app.post("/add-student",async(req,resp)=>{
//          const Collection = db.collection("students");
//          const result = await Collection.insertOne(req.body)
//          console.log(result)
//         // const students = await Collection.find().toArray();
//         resp.send("data saved");
//         console.log(req.body);
//     })



//     // post Api for save data in mongoDB 
//     // app.post('/add-student-api',async(req,resp)=>{
//     //     console.log(req.body);
//     //     const {name,email,age} = req.body;
//     //     if(!name || !email || !age){
//     //         resp.send({
//     //             "message" : "operation failed",
//     //             "success" : "false"         
//     //         });
//     //         return false;
//     //     }
//     //     const Collection =db.collection("students")
//     //     const result = await Collection.insertOne({name,email,age});
//     //     resp.send({
//     //         "message" : "Data Stored",
//     //         "success" : "true",
//     //         "result" : result 
//     //     });
//     // })

//     // bug fix from prev


//     app.post('/add-student-api', async (req, resp) => {
//     try {
//         console.log(req.body);
        
//         // 1. Fixed: Removed parentheses from req.body
//         const { name, email, age } = req.body; 

//         // Validation check
//         if (!name || !email || !age) {
//             // Best Practice: Send a 400 Bad Request status code for missing data
//             return resp.status(400).send({ 
//                 "message": "operation failed: missing required fields", 
//                 "success": false // Boolean is preferred over string "false"
//             });
//         }

//         const collection = db.collection("students");
        
//         // 2. Fixed: Capitalized 'O' in insertOne
//         // 3. Fixed: Passed the correct object instead of {req.body}
//         const result = await collection.insertOne({ name, email, age }); 

//         // Best Practice: Send a 201 Created status code for successful inserts
//         resp.status(201).send({ 
//             "message": "data stored", 
//             "success": true, 
//             "result": result 
//         }); 

//     } catch (error) {
//         // Always wrap async/await in try-catch to prevent server crashes
//         console.error(error);
//         resp.status(500).send({ "message": "Internal server error", "success": false });
//     }
// });

// app.delete("/delete/:id",async(req,resp)=>{
//     console.log(req.params.id);
//     const Collection = db.collection('students')
//     const result = await Collection.deleteOne({_id:new ObjectId(req.params.id)})
//     if(result){
//         resp.send({
//             message:"Student data deleted",
//             success:true
//         })
//     }
//     else{
//         resp.send({
//             message:"not deleted",
//             success:false
//         })
//     }
// })

// // to delete data from ui with mongodb in node.js
// app.get("/ui/delete/:id",async(req,resp)=>{
//     console.log(req.params.id);
//     const Collection = db.collection('students')
//     const result = await Collection.deleteOne({_id:new ObjectId(req.params.id)})
//     if(result){
//         resp.send("<h1>Student data deleted</h1>")
//     }
//     else{
//         resp.send("<h1>not deleted</h1>")
//     }
// })

// //populate data with mongodb in node.js

// app.get("/ui/student/:id",async(req,resp)=>{
//     const id =req.params.id;
//     const Collection = db.collection('students')
//     const result = await Collection.findOne({_id:new ObjectId(id)})
//     if(result){
//         resp.render("update-student",{student:result})
//     }
//     else{
//         resp.send("<h1>not found</h1>")
//     }
// })

// app.post("/ui/student/:id",async(req,resp)=>{
//     const id = req.params.id;
//     const Collection = db.collection('students')
//     const result = await Collection.updateOne({_id:new ObjectId(id)},{$set:req.body})

//     if(result){
//         resp.send({
//             message:"Student data updated",
//             success:true
//         })
//     }else{
//         resp.send({
//             message:"not updated",
//             success:false
//         })
//     }   
// })




//    // app.post("/add-student")
// })

// app.listen(3200);

// connect mongoDB with Moongoose - mongoose is reiable and easy to use than mongodb native driver
import mongoose from "mongoose";
import express from "express";
import studentModel from "./model/studentModel.js";

const app = express();
app.use(express.json());

async function dbConnection() {
    await mongoose.connect("mongodb://localhost:27017/");

    const schema = mongoose.Schema({
        name: String,
        email: String,
        age: Number
    });

    const Student = mongoose.model("Student", schema);

    const result = await Student.find();
    console.log(result);
}

dbConnection();
//app.listen(3200);

// Get data API with mongoose
app.get('/', async (req, resp) => {
    await mongoose.connect("mongodb://localhost:27017/").then(async () => {
        console.log("Connected to MongoDB");
        const studentData = await studentModel.find();
        resp.send(studentData);
    })
})

// make POST api in node with mongoose 
app.post('/save',async(req,resp)=>{
    console.log(req.body);
    const studentData = await studentModel.create(req.body);
    resp.send({
        message:"data saved",
        success:true,
        data:studentData
    })
})

app.listen(3200)