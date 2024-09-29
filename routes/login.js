const express = require('express');
const router = express.Router(); 

const loginController = require('../controllers/login');

router.get('/', loginController.log_in_get);

router.post('/', loginController.log_in_post);


module.exports = router;