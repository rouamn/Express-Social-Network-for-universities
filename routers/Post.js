const express = require("express");
const userAuth = require("../middleware/authMiddleware");
const {
    commentPost,
    createPost,
    deletePost,
    getComments,
    getPost,
    getPosts,
    getUserPost,
    likePost,
    likePostComment,
    replyPostComment,
  } = require("../controllers/postController.js") ;

const router = express.Router();


router.get("/",userAuth,getPosts);
router.post("/create-post", userAuth, createPost);
router.get("/:id",userAuth,getPost);
router.post("/get-user-post/:id", userAuth, getUserPost);
router.get("/comments/:postId", getComments);
router.post("/like/:id", userAuth, likePost);
router.post("/like-comment/:id/:rid?", userAuth, likePostComment);
router.post("/comment/:id", userAuth, commentPost);
router.post("/reply-comment/:id", userAuth, replyPostComment);
router.delete("/:id", userAuth, deletePost);


module.exports = router;