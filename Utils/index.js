import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";


export const  hashString = async (useValue) =>{

    const salt = await  bcrypt.genSalt(10);

    const hashedpassword = await bcrypt.hash(useValue, salt);

    return hashedpassword;
}

export const CompareString = async ( userPassword , password) => {

    const isMatch = await bcrypt.compare(userPassword, password)
    return isMatch
}

//JSON WEB TOKEN 

export function createJwt(id){

    return JWT.sign({userId : id}, process.env.JWT_SECRET , {
        expiresIn : "1d",
    });
}
