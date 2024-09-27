/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import connect from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          error: "User does not exist",
        },
        { status: 400 }
      );
    }

    // * Send verification email
    await sendEmail({ email, emailType: "FORGOT", userId: user._id });

    return NextResponse.json({
      message: "Password reset link sent to your email",
      success: true,
    });
  } catch (error: any) {
    // Return a 400 response for any caught errors
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
