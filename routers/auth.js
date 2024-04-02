const express = require("express");
const { userAuth } = require("../middleware/authMiddleware");
const {
    register,
    login,
   
} = require("../Controllers/auth.js");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);


module.exports = router;
