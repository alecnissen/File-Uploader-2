const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); 


exports.view_file_information_get = async (req, res, next) => { 
  console.log('Requested folder ID:', req.params.folderId);

  const currentFolder = await prisma.folder.findUnique({
      where: { id: Number(req.params.folderId) }
  });

  if (!currentFolder) {
      return res.status(404).send('Folder not found');
  }

  const getFilesFromFolder = await prisma.file.findMany({
      where: { folderId: currentFolder.id }
  });

  console.log('Current folder retrieved:', currentFolder);
  console.log('Files in folder:', getFilesFromFolder);

  res.render('view_file_information', { 
      title: 'View File Info', 
      currentFolder, 
      files: getFilesFromFolder, 
      errors: [] 
  });
};




exports.view_file_information_post = async (req, res, next) => { 
  console.log('Request params:', req.params);
  console.log('Requested folder ID:', req.params.folderId);
  console.log('Requested file ID:', req.params.fileId);

  // Find the current folder by folderId
  const currentFolder = await prisma.folder.findUnique({
      where: { id: Number(req.params.folderId) }
  });

  if (!currentFolder) {
      return res.status(404).send('Folder not found');
  }

  // Find the file by fileId within the folder
  const fileToUpload = await prisma.file.findUnique({
      where: { id: Number(req.params.fileId) }
  });

  if (!fileToUpload) {
      return res.status(404).send('File not found');
  }

  // Cloudinary configuration and file upload
  const cloudinary = require('cloudinary').v2;
  cloudinary.config({
    cloud_name: 'dyal6nkwn',
    secure: true,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  try {
      const uploadPath = `uploads/${fileToUpload.fileName}`;
      const results = await cloudinary.uploader.upload(uploadPath, {
          transformation: [
              { quality: 'auto', fetch_format: 'auto' }
          ]
      });
      
      console.log('File uploaded:', results);
      res.send(`File uploaded successfully: ${results.secure_url}`);
  } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).send('Error uploading file to the cloud');
  }
};






























// OG

// exports.view_file_information_get = async (req, res, next) => { 

//     console.log('Requested folder ID:', req.params.id);

//     console.log('Request params:', req.params);


//     const currentFolder = await prisma.folder.findUnique({
//         where: { 
//             id: Number(req.params.id),
//         }
//     })

//     if (!currentFolder) {
//         return res.status(404).send('Folder not found');
//     }

//     const getFilesFromFolder = await prisma.file.findMany({
//         where: { 
//             folderId: currentFolder.id
//         }
//     })

//     console.log('Current folder retrieved:', currentFolder);

//     console.log('logging the file details', getFilesFromFolder);

//     res.render('view_file_information', { title: 'View File Info', currentFolder, files: getFilesFromFolder, errors: [] } );
    
// }


// OG


// exports.view_file_information_post = async (req, res, next) => { 

//     console.log('Request params:', req.params);


//     console.log('Requested folder ID:', req.params.id);


//     const currentFolder = await prisma.folder.findUnique({
//         where: { 
//             id: Number(req.params.id),
//         }
//     })

//     console.log('Current folder retrieved:', currentFolder);

//     if (!currentFolder) {
//         return res.status(404).send('Folder not found');
//     }

//     const getFilesFromFolder = await prisma.file.findMany({
//         where: { 
//             folderId: currentFolder.id
//         }
//     })



//     const cloudinary = require('cloudinary').v2;

//     cloudinary.config({
//       cloud_name: 'dyal6nkwn',
//       secure: true,
//       api_key: process.env.CLOUDINARY_API_KEY,
//       api_secret: process.env.CLOUDINARY_API_SECRET
//     });
    
//     const url = cloudinary.url('528b04e489370e37d23a6045fadce1b1_ocx8uw', { 
//       transformation: [
//         { 
//           fetch_format: 'auto'
//         },
//         { 
//           quality: 'auto'
//         }
//       ]
//     });
    
//     console.log(url);
    
    
//     (async function() { 
//         const fileId = req.params.id;
//       const results = await cloudinary.uploader.upload(`uploads/${fileId}`);
//       console.log(results);
//       const url = cloudinary.url(results.public_id, {
//         transformation: [
//           { 
//             quality: 'auto',
//             fetch_format: 'auto'
//           }
//         ]
//       })
//       console.log(results);
//     })();


// }



