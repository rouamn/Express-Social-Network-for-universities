const express = require("express");
const authRoute = require("./auth.js");
const userRoutes = require("./users.js");
const ChatRoute = require('./chatRoute.js');
const MessageRoute = require('./messageRoute.js');
const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoutes);
router.use('/chat', ChatRoute);
router.use('/message', MessageRoute);

module.exports = router;