const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); 

exports.view_folders_get = async (req, res, next) => { 

    // asyncHandler(async (req, res, next) => {
        
        // OG
        // const displayAllFolders = await prisma.folder.findMany();

        console.log('logging the user in view folders', req.user);
        
          
        const displayAllFolders = await prisma.folder.findMany({
            where: {
              userId: req.user.id
            }
          });

        res.render('view_folders', { title: 'View Folders', errors: [], messages: [], displayAllFolders, user: req.user });

    // }) 
}


