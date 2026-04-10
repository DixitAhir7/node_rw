const { registerUser, loginUser, logout } = require("../controlers/auth")
const router = require("express").Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logout)

module.exports = router;