const express = require("express");
const { auth } = require("../MiddleWare/authmiddleware");


const { OrderModel } = require("../Model/Order.model");


const OrdersRouter = express.Router();
OrdersRouter.use(auth);


OrdersRouter.get("/", async(req,res) => {
    try{
        const orders=await OrderModel.find()
        if(orders){
            res.status(200).json({orders})
        }else{
            res.status(400).json({msg:"Post not Found"})
        }
    }catch(err){
        res.status(400).json({error:err})
    }
})


OrdersRouter.post("/", async(req,res) => {
    try{
    //  console.log(req.body);
     const post = new OrderModel(req.body);
     await post.save();
     res.status(201).json({msg: "Book has been ordered"});     
    }catch(err){
     res.json(err);
    }
 })



module.exports = {
    OrdersRouter
}