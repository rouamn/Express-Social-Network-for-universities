const express = require("express");
const authRoute = require("./auth.js");
const userRoutes = require("./users.js");
const postRoute = require("./Post.js")
const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoutes);
router.use('/posts', postRoute);
module.exports = router;