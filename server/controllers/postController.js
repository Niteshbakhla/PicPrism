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
                                    $push: { uploads: post._Id }
                        });

                        return res.status(201).json({ success: true, message: "Post created successfully", post })

            } catch (error) {
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
                        if (authorAccountType === "buyer") {
                                    const { purchased } = await User.find(authorId).populate("purchased");
                                    if (!purchased) {
                                                return res.status(404).json({ success: false, message: "No post found" })
                                    }

                                    return res.status(200).json({ success: true, data: purchased })
                        } else {
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

module.exports = { createPost, getAllPost, getMyPosts }