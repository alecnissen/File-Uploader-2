const express = require('express');
const router = express.Router(); 
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Define destination folder for temporary storage


const viewFileInformationController = require('../controllers/view_file_information');

router.get('/:id', viewFileInformationController.view_file_information_get);

// router.post('/:id', viewFileInformationController.view_file_information_post);


// router.get('/:folderId/:fileId', viewFileInformationController.view_file_information_get);

// router.post('/:folderId/:fileId', upload.single('file'), viewFileInformationController.view_file_information_post);


router.post('/:folderId/:fileId', viewFileInformationController.view_file_information_post);


module.exports = router;