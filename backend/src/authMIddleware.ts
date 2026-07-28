import type { Request,Response,NextFunction } from "express"
import jwt from "jsonwebtoken"
export const authMiddlware=(req:Request,res:Response,next:NextFunction)=>{
   
    const token =req.headers.token as string;
     if(!token){
        throw new Error("you dont have acess");
    }
    const result=jwt.verify(token,process.env.SECRET!) as {
        id:number,
        username:string
    }
    req.user={
        username:result.username,
        id:result.id
    }



    next();

}