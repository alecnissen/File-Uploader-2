const express = require('express');
const router = express.Router();

const filesInFolderController = require('../controllers/files_in_folder');

router.get('/:folderId', filesInFolderController.files_in_folder_get);

module.exports = router;
