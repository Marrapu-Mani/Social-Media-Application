import express from 'express';
import multer from 'multer';

const router = express.Router();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');      // Sets the directory where uploaded files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, req.body.filename);    // Sets the name of the uploaded file
    }
});
const upload = multer({ storage: fileStorage });

router.post('/', upload.single('file'), (req, res) => {     // upload.single('file') handles single file uploads with the field name file
    try {
        return res.status(200).json("File uploaded successfully.");
    } catch (error) {
        console.log('Upload error from route:', error);
        return res.status(500).json("File upload failed.");
    }
});

export default router;
