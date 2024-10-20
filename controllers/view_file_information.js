const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); 


exports.view_file_information_get = async (req, res, next) => { 

    const currentFolder = await prisma.folder.findUnique({
        where: { 
            id: Number(req.params.id),
        }
    })

    const getFilesFromFolder = await prisma.file.findMany({
        where: { 
            folderId: currentFolder.id
        }
    })

    res.render('view_file_information', { title: 'View File Info', currentFolder, files: getFilesFromFolder } );

    
}