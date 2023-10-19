const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name: {
        type : String,
        required : [true, "Name field is required"]
    },
    category:{
        type : String,
        required : true,
    },
    price: {
        type : Number,
        required : [true, "Price is required"]
    },
    color: {
        type : String,
        required : [true, "Please select the color"]
    }
},{
    timestamps :  true
})

module.exports = mongoose.model('product', productSchema)