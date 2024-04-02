const express = require("express");
const authRoute = require("./auth.js");
const userRoutes = require("./users.js");
const postRoute = require("./Post.js");
const courseRoute = require("./courseRoute.js");
const taskRoute = require("./taskRoute.js")
const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoutes);
router.use('/posts', postRoute);
router.use('/course', courseRoute);
router.use('/task',taskRoute);
module.exports = router;