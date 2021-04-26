const User = require("../models/User");
const Post = require("../models/Post");

module.exports = {
  addPost: async (req, res) => {
    try {
      const id = req.user;    
      const name = await User.findOne({_id: id});  
      console.log(req)

      const newPost = new Post({
        text: req.body.text,
        user: id,
        // name: name.name,
        
      });

      const post = await newPost.save();
      res.status(201).json(post);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  },
  getPosts: async (req, res) => {
    try {
      const posts = await Post.find({}).exec();
      res.json(posts);
    } catch (err) {
      console.log("get post", err);
    }
  },
  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedPost = await Post.findByIdAndDelete(id).exec();

      if (deletedPost === null) {
        return res.status(404).send("Not found");
      }
      console.log(deletedPost);

      res.status(204).send("");
    } catch (err) {
      console.log(err);
    }
  },

  getPost: async (req, res) => {
    try {
      const { id } = req.params;

      const post = await Post.findById(id).exec();
      return res.json(post);
    } catch (err) {
      console.log(err);
    }
  },
  updatePost: async (req, res) => {
    try {
      const { id } = req.params;

      const newPost = await Post.findByIdAndUpdate(id, {
        $set: { text: req.body.text },
      }).exec();

      if (newPost === null) {
        res.status(404).send("Not Found");
        return;
      }
      return res.json(newPost);
    } catch (err) {
      console.log(err);
    }
  },
};
