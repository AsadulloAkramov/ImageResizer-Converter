import * as express from "express";
import fs from 'fs';
import sharp from 'sharp';

export default class FileController {
   
    static async getResized(req:express.Request, res:express.Response){
        const file = req.params.file;
        const path = __dirname +"/../../public/uploads/";
        const resizedPath =__dirname + "/../../files/";
        if(!fs.existsSync(path + file)){
            return res.json({
                message:"File not found",
                fileName:file,
                path
            })
        }

        console.log("Passed");
        let image = await sharp(path+file); 
        const metadata = await image.metadata();
        if(metadata.width < metadata.height){
            console.log("more height");
            await image.rotate(-90);
            const temp = metadata.width;
            metadata.width = metadata.height;
            metadata.height = temp
        }
        if( metadata && (metadata.width >1600 || metadata.height > 900)){
            console.log("Resized");
            
            await image.resize({
                width:1600
            });
        }
        const finalPath = resizedPath +file;
        await image.toFile(finalPath);

        const stats = fs.statSync(finalPath);
        if(stats.size >= 420000){
            let image = sharp(finalPath);
            await image.jpeg({
                quality:70
            })

            await image.toFile(finalPath);
        }
        
       res.send({
           info: image
       })

    }
    static async testResized(req: express.Request , res:express.Response){
        const file = req.params.file;
        const path = __dirname +"/../../public/uploads/";
        const resizedPath =__dirname + "/../../files/";
        if(!fs.existsSync(path + file)){
            return res.json({
                message:"File not found",
                fileName:file,
                path
            })
        }

        console.log("Passed");
        let image = await sharp(path+file); 
        const metadata = await image.metadata();
        await image.resize({
            width:800
        }).jpeg({
            quality:80
        }).toFile(resizedPath+file);
    }
}
