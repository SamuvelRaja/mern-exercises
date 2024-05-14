const express=require("express")
const app=express()
const mongoose=require("mongoose")
const cors=require("cors")
const port=3000

mongoose.connect(process.env.MONGOURL)

const users=mongoose.model("users",{username:String,email:String,password:String })

//middleware
app.use(express.json())
app.use(cors())

app.get("/",function(req,res){
    console.log("hello")
    res.send("hello")
})

//signup route
app.post("/signup", async function(req,res){
    const name=req.body.name;
    const mail=req.body.mail;
    const pass=req.body.pass;
    console.log("after",name,req.body)
    const userExist= await users.findOne({email:mail})
    if(userExist){
        return res.status(400).send("user already exist")
    }
    const user=new users(
        {
            username:name,
            email:mail,
            password:pass
        }
    )

    user.save()
    res.status(200).send("user created")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})