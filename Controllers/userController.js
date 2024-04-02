const Verification = require("../models/emailVerification.js");
const PasswordReset = require("../models/passwordReset.js");
const User = require("../models/user.js");
const { hashString } = require("../Utils/index.js");
const { CompareString } = require("../Utils/index.js");
const { resetPasswordLink } = require("../Utils/sendEmail.js");
const FriendRequest = require("../Models/friendRequest.js");
const { createJwt } = require("../Utils/index.js");

 const verifyEmail = async (req, res) => {
    const { userId, token } = req.params;
  
    try {
      const result = await Verification.findOne({ userId });
  
      if (result) {
        const { expiresAt, token: hashedToken } = result;
  
        // token has expired
        if (expiresAt < Date.now()) {
          Verification.findOneAndDelete({ userId })
            .then(() => {
                User.findOneAndDelete({ _id: userId })
                .then(() => {
                  const message = "Verification token has expired.";
                  res.redirect(`/users/verified?status=error&message=${message}`);
                })
                .catch((err) => {
                  console.log(err);
                  res.redirect(`/users/verified?status=error&message=`);
                });
            })
            .catch((error) => {
              console.log(error);
              res.redirect(`/users/verified?message=`);
            });
        } else {
          // token valid
          CompareString(token, hashedToken)
            .then((isMatch) => {
              if (isMatch) {
                User.findOneAndUpdate({ _id: userId }, { verified: true })
                  .then(() => {
                    Verification.findOneAndDelete({ userId }).then(() => {
                      const message = "Email verified successfully";
                      res.redirect(
                        `/users/verified?status=success&message=${message}`
                      );
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                    const message = "Verification failed or link is invalid";
                    res.redirect(
                      `/users/verified?status=error&message=${message}`
                    );
                  });
              } else {
                // invalid token
                const message = "Verification failed or link is invalid";
                res.redirect(`/users/verified?status=error&message=${message}`);
              }
            })
            .catch((err) => {
              console.log(err);
              res.redirect(`/users/verified?message=`);
            });
        }
      } else {
        const message = "Invalid verification link. Try again later.";
        res.redirect(`/users/verified?status=error&message=${message}`);
      }
    } catch (error) {
      console.log(error);
      res.redirect(`/users/verified?message=`);
    }
  };


   const requestPasswordReset = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ status: "Failed", message: "Email does not exist" });
      }
  
      const existingRequest = await PasswordReset.findOne({ email });
  
      if (existingRequest) {
        if (existingRequest.expiresAt > Date.now()) {
          return res.status(200).json({
            status: "PENDING",
            message: "Reset password link has already been sent to your email.",
          });
        }
        await PasswordReset.findOneAndDelete({ email });
      }
  
      await resetPasswordLink(user, res);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };
  

 const resetPassword = async (req, res) => {
  const { userId, token } = req.params;

  try {
    // find record
    const user = await User.findById(userId);

    if (!user) {
      const message = "Invalid password reset link. Try again";
      res.redirect(`/users/resetpassword?status=error&message=${message}`);
    }

    const resetPassword = await PasswordReset.findOne({ userId });

    if (!resetPassword) {
      const message = "Invalid password reset link. Try again";
      console.log('not reseted')
      return res.redirect(
        `/users/resetpassword?status=error&message=${message}`
      );
    }

    const { expiresAt, token: resetToken } = resetPassword;

    if (expiresAt < Date.now()) {
      const message = "Reset Password link has expired. Please try again";
      res.redirect(`/users/resetpassword?status=error&message=${message}`);
    } else {
      const isMatch = await CompareString(token, resetToken);

      if (!isMatch) {
        const message = "Invalid reset password link. Please try again";
        res.redirect(`/users/resetpassword?status=error&message=${message}`);
      } else {
        res.redirect(`/users/resetpassword?type=reset&id=${userId}`);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
 const changePassword = async (req, res, next) => {
  try {
    const { userId, password } = req.body;

    const hashedpassword = await hashString(password);

    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { password: hashedpassword }
    );

    if (user) {
      await PasswordReset.findOneAndDelete({ userId });

      res.status(200).json({
        ok: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};



 const getUser = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { id } = req.params;
//chercher soit par id fourni dans params de requete soit id de utilsateur actuel 
    const user = await User.findById(id ?? userId).populate({
// récupérer les détails des amis de l'utilisateur à partir du champ "friends".
      path: "friends",
// L'option select: "-password" est utilisée pour exclure le champ de mot de passe des amis lors de la récupération
      select: "-password",
    });

    if (!user) {
      return res.status(200).send({
        message: "User Not Found",
        success: false,
      });
    }

    user.password = undefined;

    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "auth error",
      success: false,
      error: error.message,
    });
  }
};

 const updateUser = async (req, res, next) => {
  try {
    const { firstName, lastName, location, profileUrl } = req.body;

    if (!(firstName || lastName || contact  || location)) {
      next("Please provide all required fields");
      return;
    }
    const { userId } = req.body.user;
    const updateUser = {
      firstName,
      lastName,
      location,
      profileUrl,
      _id: userId,
    };
    const user = await User.findByIdAndUpdate(userId, updateUser, {
      new: true,
    });

    await user.populate({ path: "friends", select: "-password" });
    const token = createJwt(user?._id);

    user.password = undefined;

    res.status(200).json({
      sucess: true,
      message: "User updated successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

 const friendRequest = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { requestTo } = req.body;
    const requestExist = await FriendRequest.findOne({
      requestFrom: userId,
      requestTo,
    });

    if (requestExist) {
      next("Friend Request already sent.");
      return;
    }

    const accountExist = await FriendRequest.findOne({
      requestFrom: requestTo,
      requestTo: userId,
    });

    if (accountExist) {
      next("Friend Request already sent.");
      return;
    }

    const newRes = await FriendRequest.create({
      requestTo,
      requestFrom: userId,
    });

    res.status(201).json({
      success: true,
      message: "Friend Request sent successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "auth error",
      success: false,
      error: error.message,
    });
  }
};


 const getFriendRequest = async (req, res) => {
  try {
    const { userId } = req.body.user;

    const request = await FriendRequest.find({
      requestTo: userId,
      requestStatus: "Pending",
    })
    .populate({
      path: "requestFrom",
      select: "firstName lastName profileUrl profession",
    })
      .limit(10)
      .sort({
        _id: -1,
      });

    res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "auth error",
      success: false,
      error: error.message,
    });
  }
};

 const acceptRequest = async (req, res, next) => {
  try {
    const id = req.body.user.userId;

    const { rid, status } = req.body;

    const requestExist = await FriendRequest.findById(rid);

    if (!requestExist) {
      next("No Friend Request Found.");
      return;
    }

    const newRes = await FriendRequest.findByIdAndUpdate(
      { _id: rid },
      { requestStatus: status }
    );

    if (status === "Accepted") {
      const user = await User.findById(id);

      user.friends.push(newRes?.requestFrom);

      await user.save();

      const friend = await User.findById(newRes?.requestFrom);

      friend.friends.push(newRes?.requestTo);

      await friend.save();
    }

    res.status(201).json({
      success: true,
      message: "Friend Request " + status,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "auth error",
      success: false,
      error: error.message,
    });
  }
};

 const suggestedFriends = async (req, res) => {
  try {
    const { userId } = req.body.user;
    let queryObject = {};
//excluree l'utilisateur actuel par id ($ne(not equal))
    queryObject._id = { $ne: userId };
//exclure amis actuels (not in)
    queryObject.friends = { $nin: userId };
//chercher amis avec nos criteres 
    let queryResult = User.find(queryObject)
      .limit(15)
      .select("firstName lastName profileUrl profession");
    const suggestedFriends = await queryResult;
    res.status(200).json({
      success: true,
      data: suggestedFriends,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};


 const profileViews = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { id } = req.body;

    const user = await User.findById(id);

    user.views.push(userId);
    await user.save();

    res.status(201).json({
      success: true,
      message: "Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "auth error",
      success: false,
      error: error.message,
    });
  }
};

module.exports = { verifyEmail, requestPasswordReset, resetPassword, changePassword ,getUser , updateUser, friendRequest, getFriendRequest, acceptRequest,suggestedFriends, profileViews};