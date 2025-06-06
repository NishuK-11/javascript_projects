const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/login",(req,res)=>{
    const{name,email,password} = req.body;
    if(email ==="nishu@example.com" && password === "123456"){
        res.status(200).json({message:"login successful"});
    }
    else{
        res.status(401).json({message:"Invalid credentials"});
    }
})
app.listen(5000,()=>console.log("Server running on http://localhost:5000"))