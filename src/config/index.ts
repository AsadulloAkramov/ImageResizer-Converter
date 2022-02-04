import express from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import bodyParser from 'body-parser';
import appConfig from './config';
import routes from '../routes';

// Configure express and middleware
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

// Declare the static folder
const dir = "public";
const subDir = "public/uploads";

// Creating the directory if it doesn't exist
if(!fs.existsSync(dir)){ 
  fs.mkdirSync(dir); 
  fs.mkdirSync(subDir);
}

// upload image
const storage = multer.diskStorage({  
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(
        null, 
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      )
  }
});

const imageFilter = (req, file, cb) => {
  if(!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  else {
    return cb(null, true);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: imageFilter
});





// Listen on port
app.listen(appConfig.port, () => {
  console.log(`Server is listening on port ${appConfig.port}`);
});

// module export
module.exports = upload;
module.exports = app;
