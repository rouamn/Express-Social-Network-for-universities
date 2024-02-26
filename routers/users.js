import express from "express";
import path from "path";

import { verifyEmail } from "../Controllers/userController.js";


import { requestPasswordReset } from "../Controllers/userController.js";
import { changePassword } from "../Controllers/userController.js";
import { resetPassword } from "../Controllers/userController.js";


import userAuth from "../middleware/authMiddleware.js";


import { getUser } from "../Controllers/userController.js";
import { updateUser } from "../Controllers/userController.js";


import { friendRequest } from "../Controllers/userController.js";
import { getFriendRequest } from "../Controllers/userController.js";
import { acceptRequest } from "../Controllers/userController.js";

import { profileViews } from "../Controllers/userController.js";

//---------------------------------------------------------------------------


const router= express.Router();

const __dirname = path.resolve(path.dirname(""));
//---------------------------------------------------------------------------
router.get("/verify/:userId/:token", verifyEmail);

router.get("/verified", (req, res) => {
    res.sendFile(path.join(__dirname, "views/verifiedpage.html")); // Update the path to your "verifiedpage.html" file
});

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


//PASSWORD RESET
router.post("/request-passwordreset", requestPasswordReset);
router.get("/reset-password/:userId/:token", resetPassword);
router.post("/reset-password", changePassword);

router.get("/resetpassword", (req, res) => {
    res.sendFile(path.join(__dirname, "views/password.html")); // Update the path to your "verifiedpage.html" file
  });


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


// user routes
router.post("/get-user/:id?", userAuth, getUser);
router.put("/update-user", userAuth, updateUser);



//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


// friend request
router.post("/friend-request", userAuth, friendRequest);
router.post("/get-friend-request", userAuth, getFriendRequest);
// accept / deny friend request
router.post("/accept-request", userAuth, acceptRequest);

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
router.post("/profile-view", userAuth, profileViews);


  



export default router;