import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

interface Params {
  email: string;
  emailType: string;
  userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: Params) => {
  try {
    // * Create a hashed Token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 10 * 60 * 1000,
      });
    } else if (emailType === "FORGOT") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 10 * 60 * 1000,
      });
    }

    // * Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // * Define email options
    const mailOptions = {
      from: process.env.SMTP_USER_MAIL,
      to: email,
      subject: emailType === "VERIFY" ? "Verify Email" : "Reset Password",
      html: `
        <h1>Click the link below to ${
          emailType === "VERIFY" ? "verify your Email" : "reset your Password"
        }</h1>
        <p><a href="${
          process.env.DOMAIN
        }/verifyemail?token=${hashedToken}">Here</a></p>
      `,
    };

    // * Send email
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};
