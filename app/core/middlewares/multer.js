const path = require('path')
const multer = require('multer')

module.exports = multer({
    storage: multer.diskStorage({
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    }),
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.xlsx') {
            cb(new Error('Unsupported file type!'), false);
            return;
        }
        cb(null, true);
    }
})