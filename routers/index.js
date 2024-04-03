const express = require("express");
const authRoute = require("./auth.js");
const userRoutes = require("./users.js");

const postRoute = require("./Post.js");
const eventRoute = require("./event.js")

const ChatRoute = require('./chatRoute.js');
const MessageRoute = require('./messageRoute.js');

const courseRoute = require("./courseRoute.js");
const taskRoute = require("./taskRoute.js")

const storyRouter = require("./story.js")

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoutes);

router.use('/posts', postRoute);
router.use('/event', eventRoute);

router.use('/chat', ChatRoute);
router.use('/message', MessageRoute);

router.use('/course', courseRoute);
router.use('/task',taskRoute);
router.use('/stories', storyRouter);


module.exports = router;