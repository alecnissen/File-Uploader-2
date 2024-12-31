const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.upload_file_to_cloud_post = async (req, res, next) => {
  const cloudinary = require('cloudinary').v2;

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    secure: true,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  const url = cloudinary.url(process.env.CLOUDINARY_URL, {
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

  (async function () {
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
    });
    console.log(results);
  })();
};
