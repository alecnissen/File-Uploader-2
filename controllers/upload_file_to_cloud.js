const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); 

// exports.upload_file_to_cloud_get = async (req, res, next) => {
   
//     res.render('view_file_information', { errors: [], messages: [] });


// }; 

exports.upload_file_to_cloud_post = async (req, res, next) => { 


    const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dyal6nkwn',
  secure: true,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const url = cloudinary.url('528b04e489370e37d23a6045fadce1b1_ocx8uw', { 
  transformation: [
    { 
      fetch_format: 'auto'
    },
    { 
      quality: 'auto'
    }
  ]
});

console.log(url);


(async function() { 
    const fileId = req.params.id;
  const results = await cloudinary.uploader.upload(`uploads/${fileId}`);
  console.log(results);
  const url = cloudinary.url(results.public_id, {
    transformation: [
      { 
        quality: 'auto',
        fetch_format: 'auto'
      }
    ]
  })
  console.log(results);
})();


}

