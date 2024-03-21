import express from "express";
import { connect } from "./connect.js";
import * as dotenv from "dotenv";
import userroutes from "./routes/user.js"
// import notesroute from "./routes/notes.js"
// import { sendTxt } from "./sendtxt.js";
dotenv.config();
const PORT= 5000;
const app=express();
app.use(express.json());
// app.use(cors())

app.get("/",(req,res)=>{
    res.send("hello world")
})
app.use("/api/user",userroutes);
// app.use("/api/notes",notesroute);

app.listen(PORT, async() => {
     await connect();
    await console.log('Server is running on port', PORT)
})