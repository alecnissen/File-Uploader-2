const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const viewFileInformationController = require('../controllers/view_file_information');

router.get('/:id', viewFileInformationController.view_file_information_get);

router.post('/:folderId/:fileId', viewFileInformationController.view_file_information_post);

module.exports = router;
