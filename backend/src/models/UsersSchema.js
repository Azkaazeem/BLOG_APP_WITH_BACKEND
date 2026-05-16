import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  // Img
  // Heading
  // Description
});

const Users = mongoose.model("Blog", blogSchema);
export default Users;