import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import argon2 from "argon2";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY =process.env.JWT_SECRET;

export const generateToken = (userId: string): string => {
  console.log("SECRET_KEY", SECRET_KEY);
  if(!SECRET_KEY) throw new Error("error while generating token"); 
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "1h" });
};

export const verifyToken = (token: string): string | object => {
  if (!SECRET_KEY) throw new Error("error while verifying token");
  const decoded = jwt.verify(token, SECRET_KEY);
  return decoded;
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

export const sendOTP = async (email: string, otp: string): Promise<any> => {
  try {
     const mailOptions = {
       from: "process.env.MAIL_USER",
       to: email,
       subject: "Your OTP Code",
       text: `Your OTP code is ${otp}`,
     };
     const info = await transporter.sendMail(mailOptions);
     return info;
  } catch (error) {
    console.error(error);
    throw error;
  }
 

}
  export const sendResetPasswordEmail = async (
    email: string,
    token: string,
    user: any
  ): Promise<void> => {

    try {
      const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
      console.log("resetLink", resetLink);
      const mailOptions = {
        from: "process.env.MAIL_USER",
        to: email,
        subject: "Password Reset Request",
        html: `
    <h1>Password Reset</h1>
    <p>Hi ${user.name},</p>
    <p>You requested to reset your password. Please click the link below to reset your password:</p>
    <a href="${resetLink}" style="background-color: #9BF0E1; color: black; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
    <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
    <p>Thanks,</p>
    <p>The [Your Company] Team</p>
  `,
      };

      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }


export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await argon2.hash(password);
  return hashedPassword;
};

