const express =  require("express")
const router = express.Router()

const authController = require("../controllers/authController")


router.post("/signup", authController.signUp)
router.post("/login", authController.login)
router.get("/allusers",authController.getAllUsers)
router.delete("/deluser/:id",authController.deleteUser)
module.exports = router