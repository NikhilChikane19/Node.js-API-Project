const express = require('express');
const router = express.Router();
const {getProducts,insertProduct,deleteProduct,updateProduct,getProductById} = require('../controllers/productsController');
// const { route } = require('./adminRoutes');
const validateToken = require('../Middleware/validateTokenHandler')

router.use(validateToken)

router.route('/').get(getProducts);

router.route("/:id").get(getProductById)

router.route('/create').post(insertProduct)

router.route('/delete/:id').delete(deleteProduct)

router.route('/update/:id').put(updateProduct)


module.exports = router;