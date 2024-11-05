const express = require('express');
const router = express.Router(); 

const uploadFileToCloudController = require('../controllers/upload_file_to_cloud');

const viewFileInformationController = require('../controllers/view_file_information');

// router.get('/:id', uploadFileToCloudController.upload_file_to_cloud_get);

router.get('/:id', viewFileInformationController.view_file_information_get);


router.post('/:id', uploadFileToCloudController.upload_file_to_cloud_post);

module.exports = router;



