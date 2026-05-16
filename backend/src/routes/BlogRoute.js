import express from "express";
import { CreateBlog, DeleteBlog } from "../controllers/BlogControllers.js";
import multer from 'multer';

const blogroute = express.Router();

// Multer configuration: Image ko memory mein save karne ke liye
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // Maximum file size 5MB allow ki hai
    }
});

// Blog bananane aur image upload karne ka route
blogroute.post('/create', upload.single('image'), CreateBlog);

// Blog aur image delete karne ka route
blogroute.delete('/delete/:id', DeleteBlog);

export default blogroute;