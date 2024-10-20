const express = require('express');
const router = express.Router(); 

const viewFileInformationController = require('../controllers/view_file_information');

router.get('/', viewFileInformationController.view_file_information_get);

module.exports = router;