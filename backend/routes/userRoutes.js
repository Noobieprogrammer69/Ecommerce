const router = require("express").Router()
const userCtrl = require("../controllers/userCtrl")

router.post("/signup", userCtrl.signUp)
router.post("/login", userCtrl.logIn)
router.post("/logout", userCtrl.logOut)
router.get("/profile/:query", userCtrl.getUserProfile)

module.exports = router