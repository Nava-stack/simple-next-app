import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getTokenData = async (request: NextRequest) => {
  const token = request.cookies.get("token")?.value; // Retrieve token from cookies
  if (!token) {
    return null; // Return null if token doesn't exist
  }

  try {
    // Define the structure of the token
    interface TokenData {
      _id: string; // Token should include _id
      // Add other properties from the token if necessary
    }

    // Verify the token using the secret
    const data = jwt.verify(token, process.env.JWT_SECRET!) as TokenData;

    return data._id; // Return just the user ID
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message); // Handle any JWT verification errors
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
