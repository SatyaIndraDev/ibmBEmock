const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
   
    title: String,
    author: String,
    category: String,
    price: Number,
    quantity: Number
},{
    versionKey: false
});


const OrderModel = mongoose.model("order", OrderSchema);


module.exports = {
    OrderModel
}