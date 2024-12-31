const express = require('express');
const router = express.Router();

const deleteFileController = require('../controllers/delete_file');

router.delete('/:folderId/:id', deleteFileController.delete_file);

module.exports = router;
