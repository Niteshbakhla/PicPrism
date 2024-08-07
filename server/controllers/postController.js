
const Post = require("../model/post")
const User = require("../model/user")



const createPost = async (req, res) => {

            const authorId = req.id;
            const authorAccountType = req.accountType;

            if (authorAccountType === "buyer") {
                        return res.status(403).json({ success: false, message: "Forbidden, only seller can post" })
            }

            const { title, author, price, image, publicId } = req.body;

            try {
                        const post = new Post({ title, author, price, image, publicId, authorId })
                        await post.save();

                        await User.findByIdAndUpdate(authorId, {
                                    $push: { uploads: post._id }
                        });

                        return res.status(201).json({ success: true, message: "Post created successfully", post })

            } catch (error) {
                        console.log(error)
                        return res.status(500).json({ success: false, message: error.message })
            }
}

const getAllPost = async (req, res) => {
            try {
                        const post = await Post.find({})
                        if (post.length === 0) return res.status(404).json({ success: false, message: "No post found!" })

                        return res.status(200).json({ success: true, data: post })

            } catch (error) {
                        return res.status(500).json({ success: false, message: error.message })
            }
}

const getMyPosts = async (req, res) => {

            const authorId = req.id;
            const authorAccountType = req.accountType;



            try {
                        if (authorAccountType.toLowerCase() === "buyer") {
                                    const { purchased } = await User.find(authorId).populate("purchased");
                                    if (!purchased) {
                                                return res.status(404).json({ success: false, message: "No post found" })
                                    }

                                    return res.status(200).json({ success: true, data: purchased })
                        }

                        if (authorAccountType.toLowerCase() === "seller") {
                                    const { uploads } = await User.findById(authorId).populate("uploads")
                                    if (!uploads) {
                                                return res.status(404).json({ success: false, message: error.message });
                                    }
                                    return res.status(200).json({ success: true, data: uploads })
                        }
            } catch (error) {
                        return res.status(500).json({ success: false, message: "internal sever error" })
            }
}

const deletePost = async (req, res) => {
            const { id } = req.params;
            try {
                        const posts = await Post.find(id)
                        if (!posts) return res.status(404).json({ success: false, message: "Post not found" })

                        const { authorId } = posts
                        await User.findByIdAndUpdate(authorId, {
                                    $pull: { uploads: id }
                        });

                        // await Post.findByIdAndDelete(id)r

                        return res.status(200).json({ success: false, message: "Post deleted successfully" })



            } catch (error) {
                        return res.status(500).json({ success: false, message: "Internal Server Error" })
            }
}

const searchPost = async (req, res) => {
            const { } = req.query;
            try {
                        const posts = await Post.find({ title: { $regex: search, $options: "i" } })
                        if (posts.length === 0) {
                                    return res.status(404).json({ success: false, message: "no post found" })
                        }

                        return res.status(200).json({ success: false, data: posts })

            } catch (error) {
                        return res.status(500).json({ success: false, message: "Internal Server Error" })
            }
}

const addToFavourites = async (req, res) => {
            const { authorId } = req.id
            const { postId } = req.params

            try {
                        const user = await User.findByIdAndUpdate(authorId, {
                                    $push: { favourites: postId }
                        });

                        if (!user) {
                                    return res.status(404)
                                                .json({ success: false, message: "User Not Found!" })
                        }

                        return res.status(200).json({ success: true, message: "Added to favourite" })
            } catch (error) {
                        return res.status(500).json({ success: false, message: "Internal server error" })
            }
}

const removeFromFavourites = async (req, res) => {
            const { authorId } = req.id
            const { postId } = req.params

            try {
                        const user = await User.findByIdAndUpdate(authorId, {
                                    $pull: { favourites: postId }
                        });

                        if (!user) {
                                    return res.status(404)
                                                .json({ success: false, message: "User Not Found!" })
                        }

                        return res.status(200).json({ success: true, message: "Removed from  favourite" })
            } catch (error) {
                        return res.status(500).json({ success: false, message: "Internal server error" })
            }
}


const getFavourites = async (req, res) => {
            const authorId = req.id;
            try {
                        const { favourites } = await User.findById(authorId).populate("favourites")
                        if (!favourites) {
                                    return res.status(404).json({ success: false, message: "No favourites added" })
                        }

                        return res.status(200).json({ success: true, data: favourites })
            } catch (error) {
                        return res.status(500).json({ success: false, message: "Internal Server Error" })
            }
}

module.exports = {
            createPost,
            getAllPost,
            getMyPosts,
            deletePost,
            searchPost,
            addToFavourites,
            removeFromFavourites,
            getFavourites
}