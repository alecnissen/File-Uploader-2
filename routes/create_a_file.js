const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const createFileController = require('../controllers/create_a_file');

router.get('/', createFileController.create_file_get);

router.post('/uploads', upload.single('file'), createFileController.create_file_post);

module.exports = router;
