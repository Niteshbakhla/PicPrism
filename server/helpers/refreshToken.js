const jwt = require("jsonwebtoken")

exports.generateRefreshToken = (user) => {
            jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" })
}