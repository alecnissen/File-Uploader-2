const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.create_folder_get = (req, res, next) => {
  res.render('create_a_folder', { title: 'Create Folder', messages: [], errors: [] });
};

exports.create_folder_post = [
  body('folderName', 'Folder name must contain at least 3 characters ')
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('create_a_folder', {
        title: 'Create Folder',
        errors: errors.array(),
        messages: []
      });
      return;
    }

    try {
      console.log(req.body.folderName);
      let checkFolder = await prisma.folder.findUnique({
        where: {
          name: req.body.folderName
        }
      });

      if (checkFolder) {
        req.message = 'Folder Name Is Already Taken';
        res.render('create_a_folder', {
          title: 'Create Folder',
          messages: [req.message],
          errors: []
        });
        return;
      }

      const folderName = await prisma.folder.create({
        data: {
          name: req.body.folderName,
          userId: req.user.id
        }
      });

      req.message = 'Folder Created Successfully';
      res.render('create_a_folder', {
        title: 'Create Folder',
        messages: [req.message],
        errors: []
      });

      console.log('Folder Created', folderName);
    } catch (err) {
      console.error('Error creating folder:', err);
      next(err);
    }
  })
];
