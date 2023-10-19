const express = require('express');
const product_routes = require('./routes/productRoutes');
const admin_Routes =  require("./routes/adminRoutes")
const errorHandler = require('./Middleware/error_handler');
const dotenv = require("dotenv").config();
require('./database/myDb')
const app = express();

const port = process.env.PORT || 7000;

app.use(express.json());

app.use('/api/products', product_routes)

app.use('/api/admin', admin_Routes)

app.use(errorHandler)

app.listen(port , () => {
    console.log(`Server running on port ${port} `)
})