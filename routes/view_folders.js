const express = require('express');
const router = express.Router(); 

const viewFolderController = require('../controllers/view_folders');

router.get('/', viewFolderController.view_folders_get);

module.exports = router;
