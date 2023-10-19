const express = require("express");
const router = express.Router();
const {adminRegister, adminLogin, currentAdmin,getAdmins} = require('../controllers/adminController')
const validateToken = require('../Middleware/validateTokenHandler')


router.route('/').get(getAdmins)

router.route('/register').post(adminRegister)

router.route('/login').post(adminLogin)

router.route('/current').get(validateToken,currentAdmin)


module.exports = router;