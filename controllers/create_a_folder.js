exports.create_folder_get = (req, res, next) => {
    res.render('create_a_folder', { title: 'Create Folder', errors: [], messages: [] });
};

exports.create_folder_post = (req, res, next) => { 
    console.log('folder name', req.body.folderName);
    res.redirect('/');
}
