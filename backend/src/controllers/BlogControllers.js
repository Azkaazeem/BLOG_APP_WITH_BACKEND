import { deleteImg, uploadImg } from "../config/cloudinary.js";
import Blog from "../models/BlogSchema.js";

// Blog Create karne ka Controller
const CreateBlog = async (req, res) => {
    try {
        console.log("Body Data:", req.body);
        const { title, content } = req.body;

        // Check karein ke file aayi hai ya nahi
        if (req.file) {
            // Helper function ke zariye Cloudinary par upload karein
            const check = await uploadImg(req.file);
            
            // Database ke liye object banayein (Yahan se author nikal diya hai taake bina login test ho sake)
            const data1 = { 
                title, 
                content, 
                image: check.image, 
                public_id: check.public_id 
            };
            
            const blog = new Blog(data1);
            const data = await blog.save();
            
            return res.status(201).json({ status: true, message: 'Blog created successfully', data });
        } else {
            return res.status(400).json({ status: false, message: 'Image is required' });
        }

    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

// Blog Delete karne ka Controller
const DeleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        // 1. Pehle database se blog dhoondein taake public_id mil sake
        const findd = await Blog.findById(id);
        if (findd == null) {
            return res.status(404).json({ status: false, message: 'Blog not found' });
        }
        
        // 2. Cloudinary se image delete karein
        const dltImg = await deleteImg(findd.public_id);
        console.log('Cloudinary Delete Result --->', dltImg);
        
        // 3. Phir database se blog delete karein
        const blog = await Blog.findByIdAndDelete(id);
        console.log('Database Delete Result --->', blog);
        
        if (blog == null) {
            return res.status(404).json({ status: false, message: 'Blog not found' });
        }
        
        return res.status(200).json({ status: true, message: 'SUCCESSFULLY DELETED' });

    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

export { CreateBlog, DeleteBlog };