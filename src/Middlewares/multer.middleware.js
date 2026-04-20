
import multer from "multer"
import fs from "node:fs"
import { fileExtenstions } from "../Common/index.js";

 const multerLocal = (path) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const destination =`uploads/${path}`
            fs.mkdirSync(destination, { recursive: true })
            cb(null, destination)
        },
        filename: function (req, file, cb) {
            console.log(`File before multer parsing`);
            console.log({ file });
            
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
            cb(null, uniqueSuffix + "." + file.originalname)
            
            
        }
    })
     
     const fileFilter = function (req, file, cb) {
         const [fileType, fileExtension] = file.mimetype.split('/')         
         const allowedExtenstions = fileExtenstions[fileType]
         if (allowedExtenstions.includes(fileExtension)) {
             return cb(null, true)
         }
         return cb(new Error('File type not allowed'), false)

     }

     const limits = {
         files: 1,
         fields: 1
     }

     return multer({ fileFilter, storage, limits })
     
}

export default multerLocal