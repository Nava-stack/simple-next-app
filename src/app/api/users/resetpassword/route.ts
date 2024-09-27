import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, password } = reqBody;

    // Check if the user exists
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid token",
        },
        { status: 400 }
      );
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          error: "Password is incorrect",
        },
        { status: 400 }
      );
    }

    // Create token data
    const tokenData = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };

    // Hash the password
    const salt = await bcryptjs.gen
      .genSalt(10)
      .then((salt) => bcryptjs.hash(password, salt));

    // Update the user's password
    const updatedUser = await User.findOneAndUpdate(
      { resetToken: token, resetTokenExpiry: { $gt: Date.now() } },
      { password: salt, resetToken: null, resetTokenExpiry: null },
      { new: true }
    );

    // Save

    const savedUser = await updatedUser.save();

    return NextResponse.json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
