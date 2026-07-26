import express from "express";

const app=express()

const Balances={

}

const OrderBooks={
    SOL:{},
    BTC:{}
}

app.post("/signup",(req,res)=>{})

app.post("/signin",(req,res)=>{})

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

app.post("/order",(req,res)=>{})

app.get("/order/:orderId")
app.delete("/order/:orderId")
app.get("/depth/:symbol");
app.get("/orders");
app.get("fills");

app.get("/balance/usd");

app.get("/balance");
app.listen(3000);
