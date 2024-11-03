exports.download_file_get = (req, res, next) => { 

    res.download("<%=file.filePath %>");
} 



