const { createPost, getAllPost, getMyPosts } = require("../controllers/postController");
const { verifyToken } = require("../middlewares/verifyToken");
const router = require("express").Router(); 

router.post("/post/create", verifyToken, createPost);
router.get("/post/getAll", verifyToken, getAllPost)
router.get("/post /myPosts", verifyToken, getMyPosts)
module.exports = router