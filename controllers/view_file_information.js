const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

const multer = require('multer');
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage }).single('file');

exports.view_file_information_get = async (req, res, next) => {

  console.log('view_file_information_get function called'); 

  console.log('Requested folder ID:', req.params.id);

  console.log('Request params:', req.params);

  const currentFolder = await prisma.folder.findUnique({
    where: {
      id: Number(req.params.id)
    }
  });

  console.log('LOGGING CURRENT FOLDER NIGGA', currentFolder);

  // const getAllFolders = await prisma.folder.findMany({
  //   where: {
  //     id: Number(req.params.id)
  //   }
  // }) 

  // console.log('LOGGING ALL FOLDER NIGGA', getAllFolders);

  if (!currentFolder) {
    return res.status(404).send('Folder not found');
  }

  const getFilesFromFolder = await prisma.file.findMany({
    where: {
      folderId: currentFolder.id
    }
  });

  console.log('Current folder retrieved:', currentFolder);

  console.log('logging the file details', getFilesFromFolder);

  res.render('view_file_information', {
    title: 'View File Info',
    currentFolder,
    files: getFilesFromFolder,
    errors: {},
    messages: {},
    user: req.user
  });
};

exports.view_file_information_post = async (req, res) => {
  const { folderId, fileId } = req.params;


  try {
    // Retrieve folder and files to pass to the view
    const currentFolder = await prisma.folder.findUnique({
      where: { id: Number(folderId) }
    });

    if (!currentFolder) {
      return res.status(404).send('Folder not found');
    }

    const getFilesFromFolder = await prisma.file.findMany({
      where: { folderId: currentFolder.id }
    });

    // Retrieve file information from the database
    const file = await prisma.file.findUnique({
      where: { id: parseInt(fileId) }
    });

    if (!file) {
      return res.status(404).send('File not found');
    }

    console.log('Checking file path:', file.filePath);

    const uploadedFiles = await prisma.file.findMany();
    console.log('Files from DB:', uploadedFiles);

    // Ensure the file path exists on your server
    // if (!fs.existsSync(file.filePath)) {
    //     return res.status(400).send('File path does not exist on the server');
    // }

    const absolutePath = path.resolve(file.filePath);
    console.log('Resolved file path:', absolutePath);
    if (!fs.existsSync(absolutePath)) {
      return res.status(400).send('File path does not exist on the server');
    }

    // Upload the file to Cloudinary
    cloudinary.uploader.upload(
      file.filePath,
      { folder: 'your-folder-name' }, // Specify folder in Cloudinary (optional)
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          // Render the view with an error message
          const errors = {};
          errors[fileId] = ['Error: Something went wrong during upload'];
          return res.render('view_file_information', {
            title: 'View File Info',
            currentFolder,
            files: getFilesFromFolder,
            errors,
            messages: {}
          });
        }

        console.log('File uploaded to Cloudinary:', result);
        const messages = {};
        messages[fileId] = ['File uploaded successfully'];
        // req.messages = ['File uploaded successfully'];

        // Optionally update the file record with Cloudinary URL
        prisma.file.update({
          where: { id: parseInt(fileId) },
          data: { filePath: result.secure_url }
        });

        // Render the view with a success message
        res.render('view_file_information', {
          title: 'View File Info',
          currentFolder,
          files: getFilesFromFolder,
          errors: {},
          messages
        });
      }
    );
  } catch (error) {
    console.error('Error in POST handler:', error);
    res.status(500).send('Error uploading the file');
  }
};
