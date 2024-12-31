const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const asyncHandler = require('express-async-handler');

exports.delete_file = [
  asyncHandler(async (req, res, next) => {
    const deleteFile = await prisma.file.delete({
      where: {
        id: Number(req.params.id)
      }
    });
    res.redirect(`/view_file_information/${req.params.folderId}`);
  })
];
