const express = require('express');
const router = express.Router(); 

const loginController = require('../controllers/login');

router.get('/', loginController.log_in_get);


module.exports = router;