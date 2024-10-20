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
    const folderId = req.params.id;

    try {
        if (!req.file) {
            const errorMsg = 'Error: No file or invalid file type';
            return res.render('view_folders', { title: 'Create File', errors: [errorMsg], messages: [], displayAllFolders });
        }

        // Check if the folder exists
        const findFolderInDB = await prisma.folder.findUnique({
            where: { id: Number(folderId) },
        });

        if (findFolderInDB) {
            await prisma.file.create({
                data: {
                    fileName: req.file.originalname,
                    filePath: req.file.path,
                    folderId: findFolderInDB.id,  // Associate with the correct folder
                },
            });

            console.log('File uploaded successfully');
            req.message = 'File uploaded successfully';
        } else {
            const errorMsg = 'Error: Folder not found';
            return res.render('view_folders', { title: 'Create File', errors: [errorMsg], messages: [], displayAllFolders });
        }
    } catch (err) {
        console.log(err);
        const errorMsg = 'Error: Something went wrong';
        return res.render('view_folders', { title: 'Create File', errors: [errorMsg], messages: [], displayAllFolders });
    }

    // Render the view after successful upload
    res.render('view_folders', { title: 'Create File', messages: [req.message], errors: [], displayAllFolders });
};







  
  // exports.upload_file_post = async (req, res, next) => {

  //   try { 

  //   const displayAllFolders = await prisma.folder.findMany();

  //   const folderId = req.params.id;

  //   const findFolderInDB = await prisma.folder.findUnique({
  //     where: { 
  //       id: Number(folderId),
  //     }
  //   })


  //   if (req.file) { 
  //     const saveFileIntoFolder = await prisma.file.create({
  //       data: { 
  //           fileName: req.file.originalname,
  //           filePath: req.file.path,
  //           folderId: findFolderInDB.id,
  //       }
  //   })
  //   }

  // } catch (err) { 
  //   console.log(err);
  // }


  //   if (req.file) {
  //     console.log('File uploaded successfully');
  //     req.message = 'File uploaded successfully';
  //     res.render('view_folders', { title: 'Create File', messages: [req.message], errors: [], displayAllFolders });
  //   } else { 
  //     const errorMsg = 'Error: No file or invalid file type';
  //     res.render('view_folders', { title: 'Create File', errors: [errorMsg], messages: [], displayAllFolders });
  //   }
  // };

