exports.create_file_get = (req, res, next) => {
  res.render('create_a_file', { title: 'Create User', errors: [], messages: [] });
};

const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|jpg|jpeg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  if (extname) {
    return cb(null, true);
  } else {
    cb('Error: File type not allowed!', false);
  }
};

exports.create_file_post = (req, res, next) => {
  if (req.file) {
    console.log('File created successfully');
    req.message = 'File created successfully';
    res.render('create_a_file', { title: 'Create File', messages: [req.message], errors: [] });
  } else {
    const errorMsg = 'Error: No file or invalid file type';
    res.render('create_a_file', { title: 'Create File', errors: [errorMsg], messages: [] });
  }
};
