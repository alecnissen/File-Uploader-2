const express = require('express');
const router = express.Router();

const deleteFolderController = require('../controllers/delete_folder');

router.delete('/:id', deleteFolderController.delete_folder)

module.exports = router;