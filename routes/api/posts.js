const express = require("express");
const router = express.Router();

//posts Model
const Post = require("../../models/Post");

// @routers GET api/posts
// @desc get all post
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts) throw Error("something went wrong while saving the post");
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

// @routers GET api/posts/:id
// @desc get an post by id
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) throw Error("No items with that id");
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

// @routers POST api/posts
// @desc Create an post
router.post("/", async (req, res) => {
  const newPost = Post(req.body);

  try {
    const post = await newPost.save();
    if (!post) throw Error("something went wrong while saving the post");

    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

// @routers DELETE api/posts
// @desc delete an post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) throw Error("no post found");

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

// @routers UPDATE api/posts
// @desc update an post
router.patch("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body);
    if (!post) throw Error("something went wrong while saving the post");

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

module.exports = router;
