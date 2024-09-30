const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.create_user_get = (req, res, next) => {
  res.render('create_user', { title: 'Create User' });
};

// // exports.create_user_post = async (req, res, next) => {
// try {
//   console.log('Request body:', req.body);
//   let checkUser = await prisma.users.findUnique({
//     where: {
//       email: req.body.email
//     }
//   });
//   // res.redirect('/');
// } catch (err) {
//   console.error('Error handling login:', err);
//   next(err);
// }
// // }

exports.create_user_post = [


// sanitize form data before being saved to the backend? 




  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) { 
        res.render("create_user", { 
            title: "Create User", 
            errors: errors.array(),
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
        // if user is found render the create user page again 
        // also display the error???
        res.render("create_user", { 
            title: "Create User",
            errors: [{ msg: "Username is already taken"}],
        });
        return;
      }

      const user = await prisma.users.create({
        data: {
          username: req.body.username,
          password: req.body.password
        }
      });


      res.redirect("/");

      console.log('User created', user);

    } 
    
    
    catch (err) {
      console.error('Error handling login:', err);
      next(err);
    }
  })
];
