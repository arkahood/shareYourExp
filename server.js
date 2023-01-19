import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import path from 'path';
// Enviroment Variables Which needs to be hidden
import dotenv from 'dotenv';

// Importing Routes
import Router from "./routes/route.js";

//DataBase Connection
import Connection from "./database/db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({extended : true}));

app.use('/api',Router);

const PORT = process.env.PORT || 8000;

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
}

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const URL = process.env.MONGODB_URI || `mongodb://${username}:${password}@ac-8fy7sie-shard-00-00.py6yja2.mongodb.net:27017,ac-8fy7sie-shard-00-01.py6yja2.mongodb.net:27017,ac-8fy7sie-shard-00-02.py6yja2.mongodb.net:27017/?ssl=true&replicaSet=atlas-feyinx-shard-0&authSource=admin&retryWrites=true&w=majority`;
    
app.use(express.static("client/build"));
app.get("/",(req,res)=>{
    console.log("w");
    res.sendFile(path.join(__dirname,"client","build","index.html"));
})

app.listen(PORT,()=>{
    console.log(`Server is running at port - ${PORT}`);
});
Connection(URL);