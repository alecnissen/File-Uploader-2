const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); 
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

const multer = require('multer');
const storage = multer.memoryStorage();  // Store file in memory
const upload = multer({ storage: storage }).single('file');



// exports.view_file_information_get = async (req, res, next) => { 
//   console.log('Requested folder ID:', req.params.folderId);

//   const currentFolder = await prisma.folder.findUnique({
//       where: { id: Number(req.params.folderId) }
//   });

//   if (!currentFolder) {
//       return res.status(404).send('Folder not found');
//   }

//   const getFilesFromFolder = await prisma.file.findMany({
//       where: { folderId: currentFolder.id }
//   });

//   console.log('Current folder retrieved:', currentFolder);
//   console.log('Files in folder:', getFilesFromFolder);

//   res.render('view_file_information', { 
//       title: 'View File Info', 
//       currentFolder, 
//       files: getFilesFromFolder, 
//       errors: [] 
//   });
// };





// exports.view_file_information_post = async (req, res, next) => { 
//   console.log('Request params:', req.params);

//   const currentFolder = await prisma.folder.findUnique({
//       where: { id: Number(req.params.folderId) }
//   });

//   if (!currentFolder) {
//       return res.status(404).send('Folder not found');
//   }

//   const fileToUpload = await prisma.file.findUnique({
//       where: { id: Number(req.params.fileId) }
//   });

//   if (!fileToUpload) {
//       return res.status(404).send('File not found');
//   }

//   const cloudinary = require('cloudinary').v2;
//   cloudinary.config({
//     cloud_name: 'dyal6nkwn',
//     secure: true,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
//   });

//   try {
//       const results = await cloudinary.uploader.upload(req.file.path, {
//           transformation: [{ quality: 'auto', fetch_format: 'auto' }]
//       });
//       console.log('File uploaded:', results);
//       res.send(`File uploaded successfully: ${results.secure_url}`);
//   } catch (error) {
//       console.error('Error uploading file:', error);
//       res.status(500).send('Error uploading file to the cloud');
//   }
// };








// exports.view_file_information_post = async (req, res, next) => { 
//   console.log('Request params:', req.params);
//   console.log('Requested folder ID:', req.params.folderId);
//   console.log('Requested file ID:', req.params.fileId);

//   // Find the current folder by folderId
//   const currentFolder = await prisma.folder.findUnique({
//       where: { id: Number(req.params.folderId) }
//   });

//   if (!currentFolder) {
//       return res.status(404).send('Folder not found');
//   }

//   // Find the file by fileId within the folder
//   const fileToUpload = await prisma.file.findUnique({
//       where: { id: Number(req.params.fileId) }
//   });

//   if (!fileToUpload) {
//       return res.status(404).send('File not found');
//   }

//   // Cloudinary configuration and file upload
//   const cloudinary = require('cloudinary').v2;
//   cloudinary.config({
//     cloud_name: 'dyal6nkwn',
//     secure: true,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
//   });

//   try {
//       const uploadPath = `uploads/${fileToUpload.fileName}`;
//       const results = await cloudinary.uploader.upload(uploadPath, {
//           transformation: [
//               { quality: 'auto', fetch_format: 'auto' }
//           ]
//       });
      
//       console.log('File uploaded:', results);
//       res.send(`File uploaded successfully: ${results.secure_url}`);
//   } catch (error) {
//       console.error('Error uploading file:', error);
//       res.status(500).send('Error uploading file to the cloud');
//   }
// };






























// OG

exports.view_file_information_get = async (req, res, next) => { 

    console.log('Requested folder ID:', req.params.id);

    console.log('Request params:', req.params);


    const currentFolder = await prisma.folder.findUnique({
        where: { 
            id: Number(req.params.id),
        }
    })

    if (!currentFolder) {
        return res.status(404).send('Folder not found');
    }

    const getFilesFromFolder = await prisma.file.findMany({
        where: { 
            folderId: currentFolder.id
        }
    })

    console.log('Current folder retrieved:', currentFolder);

    console.log('logging the file details', getFilesFromFolder);

    res.render('view_file_information', { title: 'View File Info', currentFolder, files: getFilesFromFolder, errors: [] } );
    
}


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



// In view_file_information.js (or your controller file)
// exports.view_file_information_post = async (req, res) => {
//       const cloudinary = require('cloudinary').v2;

//     cloudinary.config({
//       cloud_name: 'dyal6nkwn',
//       secure: true,
//       api_key: process.env.CLOUDINARY_API_KEY,
//       api_secret: process.env.CLOUDINARY_API_SECRET
//     });
//   try {
//       // Extract folderId and fileId from the URL parameters
//       const { folderId, fileId } = req.params;

//       // Parse the IDs to integers
//       const parsedFolderId = parseInt(folderId, 10);
//       const parsedFileId = parseInt(fileId, 10);

//       console.log('Parsed folderId:', parsedFolderId);
//       console.log('Parsed fileId:', parsedFileId);

//       // Ensure the parsed IDs are valid integers
//       if (isNaN(parsedFolderId) || isNaN(parsedFileId)) {
//           return res.status(400).send('Invalid folder or file ID');
//       }

//       // Retrieve the current folder and file details from the database
//       const currentFolder = await prisma.folder.findUnique({
//           where: {
//               id: parsedFolderId,  // Ensure to use parsed integer for folderId
//           },
//       });

//       const fileToUpload = await prisma.file.findUnique({
//           where: {
//               id: parsedFileId,  // Ensure to use parsed integer for fileId
//           },
//       });

//       // Handle if folder or file is not found
//       if (!currentFolder || !fileToUpload) {
//           return res.status(404).send('Folder or file not found');
//       }

//       // Proceed with your file upload logic here
//       // (for example, saving the file, performing other database operations, etc.)

//       res.status(200).send('File uploaded successfully');
      
//   } catch (error) {
//       console.error('Error in POST handler:', error);
//       res.status(500).send('Error uploading the file');
//   }
// };




// no file uploaded error code 

// exports.view_file_information_post = async (req, res) => {
//   try {
//     // Check if the file exists in the request
//     if (!req.file) {
//       return res.status(400).send('No file uploaded');
//     }

//     // Upload to Cloudinary
//     const result = await cloudinary.uploader.upload_stream({
//       folder: 'your-folder-name',  // Optional: specify folder in Cloudinary
//       resource_type: 'auto',  // Automatically detect file type
//     }, (error, result) => {
//       if (error) {
//         console.error('Cloudinary upload error:', error);
//         return res.status(500).send('Error uploading to Cloudinary');
//       }
//       console.log('File uploaded to Cloudinary:', result);
//       // Proceed with saving the file details to your database or additional logic
//       res.status(200).send('File uploaded successfully');
//     });

//     req.file.stream.pipe(result);  // Upload the file stream to Cloudinary

//   } catch (error) {
//     console.error('Error in POST handler:', error);
//     res.status(500).send('Error uploading the file');
//   }
// };






exports.view_file_information_post = async (req, res) => {
  const { folderId, fileId } = req.params;

  try {
      // Retrieve file information from the database
      const file = await prisma.file.findUnique({
          where: { id: parseInt(fileId) },
      });

      if (!file) {
          return res.status(404).send('File not found');
      }

      // Ensure the file path exists on your server
      if (!fs.existsSync(file.filePath)) {
          return res.status(400).send('File path does not exist on the server');
      }

      // Upload the file to Cloudinary
      cloudinary.uploader.upload(
          file.filePath,
          {
              folder: 'your-folder-name', // Optional: specify folder in Cloudinary
          },
          (error, result) => {
              if (error) {
                  console.error('Cloudinary upload error:', error);
                  return res.status(500).send('Error uploading to Cloudinary');
              }

              console.log('File uploaded to Cloudinary:', result);

              // Optionally, update the file record in the database with the Cloudinary URL
              prisma.file.update({
                  where: { id: parseInt(fileId) },
                  data: { filePath: result.secure_url },
              }).catch((err) => console.error('Error updating database:', err));

              res.status(200).send('File uploaded successfully to Cloudinary');
          }
      );
  } catch (error) {
      console.error('Error in POST handler:', error);
      res.status(500).send('Error uploading the file');
  }
};