import express from "express";
import { PrismaClient } from "../src/generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import jwt from "jsonwebtoken"
import { authMiddlware } from "./authMIddleware.ts";
const prisma = new PrismaClient({
    adapter: new PrismaPg({
        connectionString:process.env.DATABASE_URL
    })
})



const app=express()
app.use(express.json())
const Balances={

}

const OrderBooks={
    SOL:{},
    BTC:{}
}
app.post("/signup",async (req,res)=>{
    const username=req.body.username;
    const  password=req.body.password;
    const userExists=await prisma.user.findUnique({
        where:{
            username:username
        }
    })
    if(userExists){
        throw new Error("user with this username already exists");
    }
    const result = await prisma.user.create({
        data:{username:username,
        password:password}
    })
    if(result){
        res.status (200).json({
            message:"you have signed up"
        })
    }else{
        throw new Error("you were not able to sign up")
    }
})

app.post("/signin",async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    const  result= await prisma.user.findUnique({
        where:{
            username:username,
            password:password
        }
    })
    if(!result){
        throw new Error("user does not exist")
    }
    const secret=process.env.SECRET
    const token= jwt.sign({
        userid:result.id,
        username:result.username
    },process.env.SECRET!,{
        expiresIn:"7d"
    })
    return res.status(200).json({
        token:token
    })

})

/* 
    body={
    type:"market"| "limit",
    price:number|null,
    quantity:number,
    marketId: strng,
    side: "buy"| "sell"}

    @returns{
    orderID: string,
    filledQuantity: number,
    totalPrice:number   //genrally you avoid dealing with decimal value in trading and upi app  
    }
*/ 

app.post("/order",authMiddlware,(req,res)=>{
    const username=req.user.username;
    const id=req.user.id;
    




})

app.get("/order/:orderId",(req,res)=>{})
app.delete("/order/:orderId",(req,res)=>{})
app.get("/depth/:symbol",(req,res)=>{});
app.get("/orders",(req,res)=>{});
app.get("fills",(req,res)=>{});

app.get("/balance/usd",()=>{});

app.get("/balance");
app.listen(3000,()=>{
    console.log("checking whetether server is running")
});