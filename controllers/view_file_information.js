const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');

exports.view_file_information_get = async (req, res, next) => {
  const currentFolder = await prisma.folder.findUnique({
    where: {
      id: Number(req.params.id)
    }
  });

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
    const currentFolder = await prisma.folder.findUnique({
      where: { id: Number(folderId) }
    });

    if (!currentFolder) {
      return res.status(404).send('Folder not found');
    }

    const getFilesFromFolder = await prisma.file.findMany({
      where: { folderId: currentFolder.id }
    });

    const file = await prisma.file.findUnique({
      where: { id: parseInt(fileId) }
    });

    if (!file) {
      return res.status(404).send('File not found');
    }

    console.log('Checking file path:', file.filePath);

    const uploadedFiles = await prisma.file.findMany();
    console.log('Files from DB:', uploadedFiles);

    const absolutePath = path.resolve(file.filePath);
    console.log('Resolved file path:', absolutePath);
    if (!fs.existsSync(absolutePath)) {
      return res.status(400).send('File path does not exist on the server');
    }

    cloudinary.uploader.upload(file.filePath, { folder: 'your-folder-name' }, (error, result) => {
      if (error) {
        console.error('Cloudinary upload error:', error);

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
      prisma.file.update({
        where: { id: parseInt(fileId) },
        data: { filePath: result.secure_url }
      });

      res.render('view_file_information', {
        title: 'View File Info',
        currentFolder,
        files: getFilesFromFolder,
        errors: {},
        messages
      });
    });
  } catch (error) {
    console.error('Error in POST handler:', error);
    res.status(500).send('Error uploading the file');
  }
};
