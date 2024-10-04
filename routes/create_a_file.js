const express = require('express');
const router = express.Router();

const createFileController = require('../controllers/create_a_file');

router.get('/', createFileController.create_file_get);

module.exports = router;