const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")
const { addPost, getPosts, deletePost, getPost, updatePost } = require("./controllers/postController");

// /api/posts/
router.get("/", getPosts);
router.get("/:id", getPost);

// /api/posts/
router.post("/", addPost);

router.put("/:id", updatePost);

router.delete("/:id", deletePost);

module.exports = router;
