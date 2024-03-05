const express = require("express");
const path = require("path");

const {
  verifyEmail,
  requestPasswordReset,
  changePassword,
  resetPassword,
  getUser,
  updateUser,
  friendRequest,
  getFriendRequest,
  acceptRequest,
  profileViews,
  suggestedFriends
} = require("../Controllers/userController.js");

const userAuth = require("../middleware/authMiddleware.js");

const router = express.Router();

router.get("/verify/:userId/:token", verifyEmail);

router.get("/verified", (req, res) => {
  res.sendFile(path.join(__dirname, "views/verifiedpage.html")); // Update the path to your "verifiedpage.html" file
});

router.post("/request-passwordreset", requestPasswordReset);

router.get("/reset-password/:userId/:token", resetPassword);

router.post("/reset-password", changePassword);

router.get("/resetpassword", (req, res) => {
  res.sendFile(path.join(__dirname, "views/password.html")); // Update the path to your "password.html" file
});

router.post("/get-user/:id?", userAuth, getUser);

router.put("/update-user", userAuth, updateUser);


router.post("/friend-request", userAuth, friendRequest);

router.post("/get-friend-request", userAuth, getFriendRequest);

router.post("/accept-request", userAuth, acceptRequest);

router.post("/suggested-friends", userAuth, suggestedFriends);

router.post("/profile-view", userAuth, profileViews);

module.exports = router;