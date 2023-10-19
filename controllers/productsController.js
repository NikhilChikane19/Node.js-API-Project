const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler")
const errorHandler = require("../Middleware/error_handler")


const getProducts = asyncHandler(async (req, resp) => {
    const product = await Product.find();
    // console.log('data', product);
    resp.send(product);
})

const getProductById = asyncHandler(async (req, resp) => {
    const product = await Product.findById(req.params.id)
    resp.json(product)
})

const insertProduct = asyncHandler(async (req, res) => {
    const { name, category, price, color } = req.body;
    if (!name || !category || !price || !color) {
        throw new Error("All fields are mandetory");
    }
    const result = await Product.create(
        {
            name,
            category,
            price,
            color
        }
    )
    res.json(result);
})

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    console.log(product)
    if (!product) {
        throw new Error("Product Not Found")
    }
    const result = await Product.deleteOne(product);
    res.send(result);
})

const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        throw new Error("Product Not Found")
    }
    const result = await Product.findByIdAndUpdate(
        req.params.id,
        { $set: req.body }
    )
    res.json(`Product with id ${req.params.id} is updated succesfully`)
})


module.exports = { insertProduct, deleteProduct, updateProduct, getProducts, getProductById };
