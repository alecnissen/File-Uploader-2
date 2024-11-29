const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); 
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

const multer = require('multer');
const storage = multer.memoryStorage();  // Store file in memory
const upload = multer({ storage: storage }).single('file');



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

    res.render('view_file_information', { title: 'View File Info', currentFolder, files: getFilesFromFolder, errors: [], messages: [] } );
    
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



// *** KEEP 







// WORKS!!!

// exports.view_file_information_post = async (req, res) => {
//   const { folderId, fileId } = req.params;

//   try {
//       // Retrieve file information from the database
//       const file = await prisma.file.findUnique({
//           where: { id: parseInt(fileId) },
//       });

//       if (!file) {
//           return res.status(404).send('File not found');
//       }

//       // Ensure the file path exists on your server
//       if (!fs.existsSync(file.filePath)) {
//           return res.status(400).send('File path does not exist on the server');
//       }

//       // Upload the file to Cloudinary
//       cloudinary.uploader.upload(
//           file.filePath,
//           {
//               folder: 'your-folder-name', // Optional: specify folder in Cloudinary
//           },
//           (error, result) => {
//               if (error) {
//                   console.error('Cloudinary upload error:', error);
//                   // return res.status(500).send('Error uploading to Cloudinary');
//                   const errorMsg = 'Error: Something went wrong';
//                   res.render('view_file_information', { title: 'View File Info', currentFolder, files: getFilesFromFolder, errors: [errorMsg], messages: [] } );
//               }

//               console.log('File uploaded to Cloudinary:', result);

//               // Optionally, update the file record in the database with the Cloudinary URL
//               // prisma.file.update({
//               //     where: { id: parseInt(fileId) },
//               //     data: { filePath: result.secure_url },
//               // }).catch((err) => console.error('Error updating database:', err));
//               console.log('File uploaded successfully');
//               req.message = 'File uploaded successfully';
//               res.render('view_file_information', { title: 'View File Info', currentFolder, files: getFilesFromFolder, errors: [], messages: [req.message] } );
//               // res.status(200).send('File uploaded successfully to Cloudinary');
//           }
//       );
//   } catch (error) {
//       console.error('Error in POST handler:', error);
//       res.status(500).send('Error uploading the file');
//   }
// };







exports.view_file_information_post = async (req, res) => {
  const { folderId, fileId } = req.params;
  
  try {
    // Retrieve folder and files to pass to the view
    const currentFolder = await prisma.folder.findUnique({
        where: { id: Number(folderId) },
    });

    if (!currentFolder) {
      return res.status(404).send('Folder not found');
    }

    const getFilesFromFolder = await prisma.file.findMany({
        where: { folderId: currentFolder.id },
    });

    // Retrieve file information from the database
    const file = await prisma.file.findUnique({
        where: { id: parseInt(fileId) },
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
        { folder: 'your-folder-name' },  // Specify folder in Cloudinary (optional)
        (error, result) => {
            if (error) {
                console.error('Cloudinary upload error:', error);
                // Render the view with an error message
                return res.render('view_file_information', {
                    title: 'View File Info',
                    currentFolder,
                    files: getFilesFromFolder,
                    errors: ['Error: Something went wrong during upload'],
                    messages: [],
                });
            }

            console.log('File uploaded to Cloudinary:', result);
            req.messages = ['File uploaded successfully'];

            // Optionally update the file record with Cloudinary URL
            prisma.file.update({
              where: { id: parseInt(fileId) },
              data: { filePath: result.secure_url },
            });

            // Render the view with a success message
            res.render('view_file_information', {
                title: 'View File Info',
                currentFolder,
                files: getFilesFromFolder,
                errors: [],
                messages: req.messages || [],
            });
        }
    );
  } catch (error) {
    console.error('Error in POST handler:', error);
    res.status(500).send('Error uploading the file');
  }
};
