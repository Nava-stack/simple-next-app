import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

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

    // Create token
    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    // Return token
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/", // Ensure the cookie is accessible throughout the site
    });

    console.log("Login successful, token set in cookies");
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
