const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); 

exports.upload_file_get = async (req, res, next) => {

    const displayAllFolders = await prisma.folder.findMany();
   
    res.render('view_folders', { title: 'Create File', errors: [], messages: [], displayAllFolders });
};

const fileFilter = (req, file, cb) => {
    const allowedTypes = /pdf|jpg|jpeg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
      return cb(null, true);
    } else {
      cb('Error: File type not allowed!', false);
    }
  };
  
  exports.upload_file_post = async (req, res, next) => {
    const displayAllFolders = await prisma.folder.findMany();
    if (req.file) {
      console.log('File uploaded successfully');
      req.message = 'File uploaded successfully';
      res.render('view_folders', { title: 'Create File', messages: [req.message], errors: [], displayAllFolders });
    } else { 
      const errorMsg = 'Error: No file or invalid file type';
      res.render('view_folders', { title: 'Create File', errors: [errorMsg], messages: [], displayAllFolders });
    }
  };

