const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const asyncHandler = require('express-async-handler');

exports.download_file_get = async (req, res, next) => {
  const fileId = req.params.id;

  const findFileById = await prisma.file.findUnique({
    where: {
      id: Number(fileId)
    }
  });

  if (findFileById) {
    res.download(findFileById.filePath);
  } else {
    console.log(err);
    const errorMsg = 'Error: No file or invalid file type';
    res.render('view_file_information', { errors: [errorMsg] });
  }
};
