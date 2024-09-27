/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getTokenData } from "@/helpers/getTokenData";
import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    // Retrieve the user ID from the token
    const userId = await getTokenData(request);

    // Handle case where userId is null (token missing or invalid)
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Query the database for the user by ID, excluding the password field
    const user = await User.findOne({ _id: userId }).select("-password");

    // If user not found, return 404
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the user data
    return NextResponse.json({ data: user });
  } catch (error: any) {
    // Return a 400 response for any caught errors
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
