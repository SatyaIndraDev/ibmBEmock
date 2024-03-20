const mongoose = require("mongoose");

const BooksSchema = mongoose.Schema({
   
    title: String,
    author: String,
    category: String,
    price: Number,
    quantity: Number
},{
    versionKey: false
});


const BooksModel = mongoose.model("books", BooksSchema);


module.exports = {
    BooksModel
}