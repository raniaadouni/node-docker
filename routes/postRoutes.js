const express = require("express")

const postController =  require("../controllers/postController")
const protect = require("../miiddleware/authMiddleware")
const router =  express.Router()


//localhost:3000/
router
.route("/")
.get(postController.getAllPosts)
.post(protect,postController.createPost)

router
.route('/:id')
.get(postController.getOnPost)
.patch(postController.updatePost)
.delete(postController.deletePost)

module.exports = router;