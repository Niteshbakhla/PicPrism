const jwt = require("jsonwebtoken")

exports.generateAccessToken = (user) => {
            jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20m" })
}