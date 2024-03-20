const express = require("express");
const { auth } = require("../MiddleWare/authmiddleware");

const {BooksModel} =require("../Model/Books.model");


const BooksRouter = express.Router();
BooksRouter.use(auth);


BooksRouter.get("/", async(req,res) => {
    try{
        const Books=await BooksModel.find()
        if(Books){
            res.status(200).json({Books})
        }else{
            res.status(400).json({msg:"Post not Found"})
        }
    }catch(err){
        res.status(400).json({error:err})
    }
})


BooksRouter.post("/", async(req,res) => {
    try{
     console.log(req.body);
     const post = new BooksModel(req.body);
     await post.save();
     res.json({msg: "Post create successfully"});     
    }catch(err){
     res.json(err);
    }
 })


BooksRouter.patch("/:id", async (req,res) => {
    try{
       const postID = req.params.id;
        await BooksModel.findByIdAndUpdate({_id:postID}, req.body);
        res.status(200).json({"msg": "updated"})
    }catch(err){
        res.status(400).send(err);
    }
})


BooksRouter.delete("/:id", async(req,res) => {
    try{
        const postID = req.params.id;
         await BooksModel.findByIdAndDelete({_id:postID}, req.body);
         res.status(200).json({"msg": "title has been deleted"})
     }catch(err){
         res.status(400).send(err);
     }
})



BooksRouter.get(`books?category`,async(req,res)=>{
    try {
        const {category}=req.query;
        if(category){
         
            let filter=await BooksModel.filter(item=>item.Category==="category")
            res.status(200).json(filter)
        }else{
            res.status(400).json({"msg":"not found"})
        }
    } catch (err) {
       res.status(400).json(err) 
    }
})

BooksRouter.get(`/books?author=corey&category=fiction`,async(req,res)=>{
    try {
        const {search}=req.query;
        if(!search){
            const title=await BooksModel.find()
            res.status(200).json({title})
        }
        const filter=await BooksModel.filter(item=>item.Title.toLowerCase().includes(search.toLowerCase()))
        res.status(200).json(filter)
    } catch (err) {
        res.status(400).send(err)
    }
})


module.exports = {
    BooksRouter
}