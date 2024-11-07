const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Controller action to view all files within a folder
exports.files_in_folder_get = async (req, res, next) => { 
    const folderId = req.params.folderId;

    const currentFolder = await prisma.folder.findUnique({
        where: { id: Number(folderId) }
    });

    if (!currentFolder) {
        return res.status(404).send('Folder not found');
    }

    const filesInFolder = await prisma.file.findMany({
        where: { folderId: currentFolder.id }
    });

    const displayAllFolders = await prisma.folder.findMany();

    res.render('view_file_information', { title: 'Files in Folder', currentFolder, files: filesInFolder, errors: [], messages: [], displayAllFolders });
};
