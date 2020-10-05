const multer = require("multer");
const path = require("path");

const ALLOWED_MIME_TYPES = ["image/jpg", "image/jpeg", "image/png", "image/gif", "image/webp"];

module.exports = function(destination) {
    return multer({
        storage : multer.diskStorage({
            destination: path.join(__dirname, '..', 'public', 'images', destination, 'tmp'),
            filename: (req, file, cb) => cb(null, `${file.fieldname}-${Date.now()}` + path.extname(file.originalname))
        }),
        fileFilter : (req, file, cb) => {
            if(!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
                file.error = 'type';
                req.file = file;
                return cb(null, false);
             }
             return cb(null, true);
        }
    })
};