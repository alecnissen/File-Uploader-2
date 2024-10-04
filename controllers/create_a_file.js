// const { body, validationResult } = require("express-validator");
// const asyncHandler = require("express-async-handler");
// const bcrypt = require("bcryptjs");

// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();




exports.create_file_get = (req, res, next) => {
    res.render('create_a_file', { title: 'Create User', errors: [] });
  };


