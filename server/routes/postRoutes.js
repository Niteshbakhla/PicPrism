const { createPost, getAllPost, getMyPosts, deletePost, searchPost, addToFavourites, removeFromFavourites, getFavourites } = require("../controllers/postController");
const { verifyToken } = require("../middlewares/verifyToken");

const router = require("express").Router();

router.post("/post/create", verifyToken, createPost);
router.get("/post/getAll", verifyToken, getAllPost)
router.get("/post/", verifyToken, getMyPosts)
router.delete("/post/delete/:id", verifyToken, deletePost);
router.get("/posts/search", searchPost)
router.put("/posts/addToFavourites/:postId", verifyToken, addToFavourites)
router.put("/posts/addToFavourites/:postId", verifyToken, removeFromFavourites)
router.get("/post/favourite", verifyToken, getFavourites)

module.exports = router