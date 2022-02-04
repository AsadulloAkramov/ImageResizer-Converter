import multer from 'multer';
import path from 'path';
import { Router } from 'express';
const router = Router({mergeParams:true});
import * as express from 'express';
import FileController from '../controllers/FileController';
// upload image
const storage = multer.diskStorage({  
    destination: (req, file, cb) => {
      cb(null, __dirname + "/../../public/uploads");
    },
    filename: (req, file, cb) => {
      cb(
          null, 
          path.basename(file.originalname) + "-" + Date.now() + path.extname(file.originalname)
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

router.post('/' , upload.single("image"), (req, res)=>{
   try{
        res.send({
            code:200,
            message:"Succesfully uploaded"
        })
   }
   catch(error){
       res.send({
           code:-1,
           error:JSON.stringify(error)
       })
   }
})
router.patch('/resized/:file', FileController.getResized );
router.patch('/test/:file' , FileController.testResized);

export default router;

  



