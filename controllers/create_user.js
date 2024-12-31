const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.create_user_get = (req, res, next) => {
  res.render('create_user', { title: 'Create User', errors: [], messages: [] });
};

exports.create_user_post = [
  body('username', 'Username must contain at least 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('password', 'Password must contain at least 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('create_user', {
        title: 'Create User',
        errors: errors.array()
      });
      return;
    }

    try {
      console.log('Request body:', req.body);
      let checkUser = await prisma.users.findUnique({
        where: {
          username: req.body.username
        }
      });

      if (checkUser) {
        res.render('create_user', {
          title: 'Create User',
          errors: [{ msg: 'Username Is Already Taken' }],
          messages: []
        });
        return;
      }
      console.log('password before hashing', req.body.password);
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      console.log(hashedPassword);
      const user = await prisma.users.create({
        data: {
          username: req.body.username,
          password: hashedPassword
        }
      });

      res.render('create_user', {
        title: 'Create User',
        messages: [{ msg: 'User Created Successfully' }],
        errors: []
      });

      console.log('User created', user);
    } catch (err) {
      console.error('Error handling login:', err);
      next(err);
    }
  })
];
