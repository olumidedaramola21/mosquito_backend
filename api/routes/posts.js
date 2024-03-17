const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Category = require("../models/category");

// CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json({ error: "You can only update your post" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.deleteOne();
        res.status(200).json("Post has been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("you can only delete your posts!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json(post);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user; // extracts query parameter from the request url
  const catname = req.query.cat;

  try {
    let posts; // stores posts retrieved from db
    if (username) {
      posts = await Post.find({username})
    }   else if (catname) {
      posts = await Post.find({categories: {
        $in:[catName] // finds all post where the categories array containds the provided category
      }})
    } else {
      posts = await Post.find()
    }
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
