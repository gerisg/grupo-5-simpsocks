const multer = require("multer");
const path = require("path");

const ALLOWED_MIME_TYPES = ["image/jpg", "image/jpeg", "image/png", "image/gif", "image/webp"];

module.exports = function(destination) {
    return multer({
        storage : multer.diskStorage({
            destination: path.join(__dirname, '..', 'public', 'images', 'tmp', destination),
            filename: (req, file, cb) => cb(null, `${file.fieldname}-${Date.now()}` + path.extname(file.originalname))
        }),
        fileFilter : (req, file, cb) => ALLOWED_MIME_TYPES.includes(file.mimetype) ? cb(null, true) : cb(null, false)
    })
};