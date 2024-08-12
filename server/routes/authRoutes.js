const { login, signup, refresh } = require("../controllers/authControllers")
const { verifyToken } = require("../middlewares/verifyToken")

const router = require("express").Router()

router.post("/login", login)
router.post("/signup", signup)
router.get("/refresh", verifyToken, refresh)

module.exports = router 