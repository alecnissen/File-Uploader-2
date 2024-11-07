const express = require('express');
const router = express.Router(); 

const viewFileInformationController = require('../controllers/view_file_information');

// router.get('/:id', viewFileInformationController.view_file_information_get);

// router.post('/:id', viewFileInformationController.view_file_information_post);



router.get('/:folderId/:fileId', viewFileInformationController.view_file_information_get);

router.post('/:folderId/:fileId', viewFileInformationController.view_file_information_post);





module.exports = router;