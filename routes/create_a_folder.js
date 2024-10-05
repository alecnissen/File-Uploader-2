const express = require('express');
const router = express.Router();

const createFolderController = require('../controllers/create_a_folder')

router.get('/', createFolderController.create_folder_get);

router.post('/', createFolderController.create_folder_post);

module.exports = router;
