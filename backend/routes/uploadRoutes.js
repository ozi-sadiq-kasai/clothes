const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

require('dotenv').config();
const router = express.Router();

//Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Multer setup using memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

Router.post('/',upload.single('image'),async(req,res)=>{
    try {
        if(!req.file){
            return res.status(400).json({message:'No File Uploaded'})
        }

        //Function to handle the stream upload to Cloudinary
        const streamUpload = (fileBuffer)=>{
            const stream = cloudinary.uploader.upload_stream((error,result)=>{
                if(result){
                    resolve(result);
                }else{
                    reject(error);
                }
            });
            //Use streamifier to upload the buffer to a stream
            streamifier.createReadStream(fileBuffer).pipe(stream);
        }
        const result = await streamUpload(req.file.buffer);
        //Respond with the uplaoded image URL
        res.json({imageUrl:result.secure_url});
    } catch (error) {
       console.error(error);
       res.status(500).json({message:'Server Error'}); 
    }
} )

module.exports = router;