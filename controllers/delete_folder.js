const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const asyncHandler = require('express-async-handler');

exports.delete_folder = [
  asyncHandler(async (req, res, next) => {
    const deleteFolder = await prisma.folder.delete({
      where: {
        id: Number(req.params.id)
      }
    });
    res.redirect('/view_folders');
  })
];
