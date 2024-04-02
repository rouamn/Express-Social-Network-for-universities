const express = require("express");
const authRoute = require("./auth.js");
const userRoutes = require("./users.js");

const postRoute = require("./Post.js");
const eventRoute = require("./event.js")

const ChatRoute = require('./chatRoute.js');
const MessageRoute = require('./messageRoute.js');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoutes);

router.use('/posts', postRoute);
router.use('/event', eventRoute);

router.use('/chat', ChatRoute);
router.use('/message', MessageRoute);


module.exports = router;