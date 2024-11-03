const express = require('express');
const router = express.Router();

const downloadFile = require('../controllers/download_file');

router.get('/', downloadFile.download_file_get);

module.exports = router;