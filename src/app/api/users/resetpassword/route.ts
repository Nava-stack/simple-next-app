import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, password } = reqBody;

    //* Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Update the user's password
    const updatedUser = await User.findOneAndUpdate(
      {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: { $gt: Date.now() },
      },
      { password: hashedPassword, resetToken: null, resetTokenExpiry: null },
      { new: true }
    );

    // Save

    const savedUser = await updatedUser.save();
    console.log(savedUser);

    return NextResponse.json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
