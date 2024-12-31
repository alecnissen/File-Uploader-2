const express = require('express');
const router = express.Router();

const updateFolderController = require('../controllers/update_folder');

router.get('/update_folder/:id', updateFolderController.update_folder_get);

router.post('/update_folder/:id', updateFolderController.update_folder_post);

module.exports = router;
