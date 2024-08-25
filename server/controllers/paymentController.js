const Razorpay = require("razorpay")
const User = require("../model/user");
const Crypto = require("crypto")
const Order = require("../model/order")
const Post = require("../model/post")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

exports.generateOrders = async (req, res) => {
            return console.log(req)
            const purchaseId = req.id;
            const { price, } = req.body;
            try {

                        let user = await User.findById(purchaseId);
                        if (!user) {
                                    return res.status(404).json({ success: false, message: "User not found" })
                        }

                        const options = {
                                    amount: Number(price * 10),
                                    currency: "INR",
                                    receipt: Crypto.randomBytes(10).toString("hex")
                        }

                        razorpayInstance.orders.create(options, (error, order) => {
                                    if (error) {
                                                console.error("Razorpay API Error:", error); // Log the exact error
                                                return res.status(500).json({ success: false, message: error.message });
                                    }

                                    if (!order) {
                                                console.error("Order creation returned null.");
                                                return res.status(500).json({ success: false, message: "Order creation failed. Order is null." });
                                    }

                                    return res.status(200).json({ success: true, data: order });
                        });

            } catch (error) {
                        return res.status(500).json({ success: false, message: "Internal server error" })
            }
}

exports.generateOrder = async (req, res) => {

            const purchaseId = req.id;
            const { postId, } = req.body;



            try {
                        const post = await Post.findById(postId);
                        const user = await User.findById(purchaseId)



                        if (!post) {
                                    return res.status(404).json({ success: false, message: "Post not found" });
                        }

                        const product = {
                                    name: post.author,
                                    price: post.price,
                                    image: post.image // Ensure price is in cents for Stripe
                        };

                        const newOrder = new Order({
                                    userId: purchaseId,
                                    postId,
                                    nameOfBuyer: user.username,
                                    author: product.name,
                                    title: post.title,
                                    price: product.price,
                                    stripeSessionId: "",
                                    paymentStatus: "paid",
                                    reciept: Crypto.randomBytes(10).toString("hex")
                        });

                        await newOrder.save();



                        await User.findByIdAndUpdate(purchaseId, {
                                    $push: { purchased: purchaseId },
                        });

                        await Post.findByIdAndUpdate(postId, {
                                    $push: { purchaseBy: purchaseId },
                        });

                        const posts = await Post.findById(postId).populate("purchaseBy")

                        const session = await stripe.checkout.sessions.create({
                                    payment_method_types: ['card'],
                                    line_items: [
                                                {
                                                            price_data: {
                                                                        currency: 'usd',
                                                                        product_data: {
                                                                                    name: product.name,
                                                                                    images: [product.image]
                                                                        },
                                                                        unit_amount: product.price,
                                                            },
                                                            quantity: 1,
                                                },
                                    ],
                                    mode: 'payment',
                                    success_url: `http://localhost:5000/success?orderId=${newOrder._id}`,
                                    cancel_url: 'http://localhost:5000/cancel',
                        });

                        newOrder.stripeSessionId = session.id;
                        await newOrder.save();

                        return res.status(200).json({ success: true, id: session.id, posts });
            } catch (error) {
                        console.error("Error generating order:", error); // Log the error
                        return res.status(500).json({ success: false, message: "Internal server error" });
            }
};





