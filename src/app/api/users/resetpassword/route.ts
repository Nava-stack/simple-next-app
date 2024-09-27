import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, password } = reqBody;

    // Hash the password
    const saltedPassword = await bcryptjs
      .genSalt(10)
      .then((salt) => bcryptjs.hash(password, salt));

    // Update the user's password
    const updatedUser = await User.findOneAndUpdate(
      { resetToken: token, resetTokenExpiry: { $gt: Date.now() } },
      { password: saltedPassword, resetToken: null, resetTokenExpiry: null },
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
