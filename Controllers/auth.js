import User from '../models/user.js'
import { hashString } from "../Utils/index.js"
import { CompareString } from "../Utils/index.js"
import { createJwt } from "../Utils/index.js"
import { sendVerificationEmail } from "../Utils/sendEmail.js";


export const register = async(req,res,next)=>{

   
        const { firstName,lastName,email,password}= req.body;

          if (!(firstName|| lastName || email || password)){

              next("Provide Required Fields");
                  return;
                 }

try {
 

         const userExist= await User.findOne({email})
         if(userExist){
            next("Email Already exists");
            return ;
         }


        const passwordHash= await hashString(password)

        const newUser= await User.create({
            firstName,
            lastName,
            email,
            password:passwordHash,
        

        });
        sendVerificationEmail(newUser,res)


    } catch(err){
        res.status(500).json({error:err.message});

    }
}
export const login = async (req, res, next) => {
    const { email, password } = req.body;
  
    try {
      //validation
      if (!email || !password) {
        next("Please Provide User Credentials");
        return;
      }
  
      // find user by email
      const user = await User.findOne({ email }).select("+password").populate({
        path: "friends",
        select: "firstName lastName location profileUrl -password",
      });
  
      if (!user) {
        next("Invalid email or password");
        return;
      }
  
      if (!user?.verified) {
        next(
          "User email is not verified. Check your email account and verify your email"
        );
        return;
      }
  
      // compare password
      const isMatch = await CompareString(password, user?.password);
  
      if (!isMatch) {
        next("Invalid email or password");
        return;
      }
  
      user.password = undefined;
  
      const token = createJwt(user?._id);
  
      res.status(201).json({
        success: true,
        message: "Login successfully",
        user,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error.message });
    }
}
