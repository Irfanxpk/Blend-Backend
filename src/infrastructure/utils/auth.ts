import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY =process.env.JWT_SECRET;

export const generateToken = (userId: string): string => {
  if(!SECRET_KEY) throw new Error("error while generating token"); 
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "1h" });
};

export const verifyToken = (token: string): string | object => {
  if (!SECRET_KEY) throw new Error("error while verifying token");
  return jwt.verify(token, SECRET_KEY);
};



const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user:process.env.MAIL_USER,
    pass:process.env.MAIL_PASS,
  },
});



export const generateOTP = () => {
  return otpGenerator.generate(5, {
    upperCaseAlphabets: false,
    specialChars: false,
    digits: true,
    lowerCaseAlphabets: false, 
  });
};

export const sendOTP = async (email: string, otp: string): Promise<void> => {
   const mailOptions = {
     from: "process.env.MAIL_USER",
     to: email,
     subject: "Your OTP Code",
     text: `Your OTP code is ${otp}`,
   };




  await transporter.sendMail(mailOptions);


};
