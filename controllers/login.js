const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


passport.use( 
  new LocalStrategy( 
    { usernameField: 'username', passwordField: 'password', passReqToCallback: true },
  
    async (req, email, password, done) => { 
      try { 
        const user = await prisma.users.findUnique({ 
          where: { 
            username: req.body.username
          }
        })
        if (!user) { 
          console.log('Incorrect Username');
          return done(null, false, { message: 'Incorrect Username'})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) { 
          console.log('Incorrect Password');
          return done(null, false, { message: 'Incorrect Password' });
        }

        console.log('MATCH');
        return done(null, user);

      
    } catch (err) { 
      return done(err);
    }
  }
  )
)

passport.serializeUser((user, done) => { 
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => { 
  try { 
    const user = await prisma.users.findUnique({ 
      where: { id: id }
    })
  } catch (err) { 
    done(err);
  }
})



exports.log_in_get = (req, res, next) => {
    res.render('login', { title: 'Login' });
  };


  exports.log_in_post = (req, res, next) => { 
  
    passport.authenticate('local', (err, user, info) => { 
      if (err) { 
        return next(err);
      }


      if (!user) { 
        console.log('Login failed');
        return res.render('login', { title: 'Login', errorMessage: info.message})
      }

      req.logIn(user, (err) => { 
        if (err) { 
          return next(err);
        }
        console.log('Login successful');
        return res.redirect('/');
      });
    })(req, res, next);
};