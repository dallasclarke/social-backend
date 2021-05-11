const User = require("../models/User");
const Post = require("../models/Post");
const { findById } = require("../models/User");
const { v4: uuid } = require("uuid");
const path = require("path");
const { rootDir } = require("../../config");
const fs = require("fs");
const fsPromises = fs.promises;

module.exports = {
  addPost: async (req, res) => {
    try {
      const id = req.user;
      // const usersName = await User.findById({ _id: req.user}).populate("user").exec();
      // console.log("name =>", usersName.name)

      // const user = await User.findById(req.user).select("-password")
      // console.log("user =>", user)
      const filename = uuid();
      const base64 = req.body.image;
      const ext = req.body.extension;

      const buffer = Buffer.from(base64, "base64");
      const filePath = path.resolve(
        rootDir,
        "public",
        "content",
        `${filename}.${ext}`
      );

      const fullPath = filePath.split("/");
      const fileName = fullPath[fullPath.length - 1];

      const post = await Post.create({
        text: req.body.text,
        image: fileName,
        user: id,
      });

      await fsPromises.writeFile(filePath, buffer);

      const postWithUser = await Post.findById(post.id).populate("user");

      res.status(201).json(postWithUser);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  },
  getPosts: async (req, res) => {
    try {
      const posts = await Post.find({})
        .sort({ date: -1 })
        .populate("user")
        .exec();

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

      const post = await Post.findById(id).populate("user").exec();
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
