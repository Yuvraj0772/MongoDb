import { MongoClient, ObjectId } from 'mongodb';
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
//post api for save data 
app.use(express.json());

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



    // post Api for save data in mongoDB 
    // app.post('/add-student-api',async(req,resp)=>{
    //     console.log(req.body);
    //     const {name,email,age} = req.body;
    //     if(!name || !email || !age){
    //         resp.send({
    //             "message" : "operation failed",
    //             "success" : "false"         
    //         });
    //         return false;
    //     }
    //     const Collection =db.collection("students")
    //     const result = await Collection.insertOne({name,email,age});
    //     resp.send({
    //         "message" : "Data Stored",
    //         "success" : "true",
    //         "result" : result 
    //     });
    // })

    // bug fix from prev


    app.post('/add-student-api', async (req, resp) => {
    try {
        console.log(req.body);
        
        // 1. Fixed: Removed parentheses from req.body
        const { name, email, age } = req.body; 

        // Validation check
        if (!name || !email || !age) {
            // Best Practice: Send a 400 Bad Request status code for missing data
            return resp.status(400).send({ 
                "message": "operation failed: missing required fields", 
                "success": false // Boolean is preferred over string "false"
            });
        }

        const collection = db.collection("students");
        
        // 2. Fixed: Capitalized 'O' in insertOne
        // 3. Fixed: Passed the correct object instead of {req.body}
        const result = await collection.insertOne({ name, email, age }); 

        // Best Practice: Send a 201 Created status code for successful inserts
        resp.status(201).send({ 
            "message": "data stored", 
            "success": true, 
            "result": result 
        }); 

    } catch (error) {
        // Always wrap async/await in try-catch to prevent server crashes
        console.error(error);
        resp.status(500).send({ "message": "Internal server error", "success": false });
    }
});

app.delete("/delete/:id",async(req,resp)=>{
    console.log(req.params.id);
    const Collection = db.collection('students')
    const result = await Collection.deleteOne({_id:new ObjectId})
    if(result){
        response.send({
            message:"Student data deleted",
            success:true
        })
    }
    else{
        resp.send({
            message:"not deleted",
            success:false
        })
    }
})


// populate data with mongodb in node.js

app.get("/ui/student/:id",async(req,resp)=>{
    const id =req.params.id;
    const Collection = db.collection('students')
    const result = await Collection.findOneAndDelete
})





   // app.post("/add-student")
})

app.listen(3200);
