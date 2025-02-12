const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const uploadFileController = require('../controllers/upload_a_file');

router.get('view_folders', uploadFileController.upload_file_get);

router.post('/', upload.single('file'), uploadFileController.upload_file_post);

module.exports = router;
