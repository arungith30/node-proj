const express = require("express");
const {MongoClient}=require("mongodb")
import dotenv from 'dotenv'
const app=express();
const PORT=process.env.PORT;

async function createConnection(){
const MONGO_URL=process.env.mongo_uri
const client =new MongoClient(MONGO_URL);

try{
    await client.connect();
    return client
    //const result=await client.db("contestants").collection("poll").findOne({id:"1"});
    console.log("successfully connected",result);
}catch(err){
    console.log(err);
}
}
createConnection();
app.get("/",(request,response)=>{
response.send("Welcome to my node app");
});
app.get("/poll/:id",async(request,response)=>{
const id = request.params.id;
const client =await createConnection();
const contestant =await getPollById(client,id);

response.send(contestant);
});
app.listen(PORT,()=>console.log("The server is started"));

async function getPollById(client,id){
    const result =await client.db("contestants").collection("poll").findOne({id: id });
    console.log("successfully connected",result);
    return result;
}