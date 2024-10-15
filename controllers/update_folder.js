const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// exports.update_folder_get = asyncHandler(async (req, res, next) => { 
//     console.log("GET request received for folder ID:", req.params.id);

//     const selectedFolder = req.params.id;

//     res.render('update_folder', { folder: selectedFolder, errors: [] } );



// })

exports.update_folder_get = asyncHandler(async (req, res, next) => {
    console.log("GET request received for folder ID:", req.params.id);

    // Fetch the folder from the database using Prisma
    const selectedFolder = await prisma.folder.findUnique({
        where: { id: Number(req.params.id) },
    });

    // Check if the folder exists
    if (!selectedFolder) {
        return res.status(404).send('Folder not found');
    }

    // Pass the folder object to the view
    res.render('update_folder', { folder: selectedFolder, errors: [] });
});



exports.update_folder_post = [
    body("folderName", "Folder name must contain at least 3 characters ")
    .trim()
    .isLength({ min: 3 })
    .escape(),




    asyncHandler(async (req, res, next) => { 
        console.log("POST request received for folder ID:", req.params.id); 

        const currentFolder = await prisma.folder.findUnique({
            where: { 
                id: Number(req.params.id),
            }
        })
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.render('update_folder', {
            folder: currentFolder,
            errors: errors.array(),
        });
    }

        console.log("Updating folder ID:", req.params.id);
        console.log("New folder name:", req.body.folderName);


        console.log("Current folder:", currentFolder);


        const updateFolder = await prisma.folder.update({
            where: { 
                id: Number(req.params.id),
            },

            data: { 
                name: req.body.folderName,
                userId: req.user.id,
            }
        })

        console.log("Updated folder:", updateFolder);

        


        res.redirect("/view_folders");

     


    })


]

