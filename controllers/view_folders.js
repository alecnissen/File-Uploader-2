const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); 

exports.view_folders_get = async (req, res, next) => { 

    // asyncHandler(async (req, res, next) => {

        const displayAllFolders = await prisma.folder.findMany();

        res.render('view_folders', { title: 'View Folders', errors: [], messages: [], displayAllFolders });

    // }) 
}

