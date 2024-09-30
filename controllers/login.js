const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.log_in_get = (req, res, next) => {
    res.render('login', { title: 'Login' });
  };


exports.log_in_post = (req, res, next) => { 
    try {
        console.log("Request body:", req.body);
        res.redirect('/');
      } catch (err) {
        console.error("Error handling login:", err);
        next(err);
      }
}