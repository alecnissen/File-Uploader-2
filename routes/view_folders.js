const express = require('express');
const router = express.Router(); 
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const viewFolderController = require('../controllers/view_folders');

const uploadFileController = require('../controllers/upload_a_file');

router.get('/', viewFolderController.view_folders_get);

router.post('/:id', upload.single('file'), uploadFileController.upload_file_post);

module.exports = router;
