import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getTokenData = async (request: NextRequest) => {
  const token = await request.cookies.get("token")?.value;
  if (!token) {
    return null;
  }
  try {
    interface TokenData {
      id: string;
      // Add other properties if needed
    }
    const data = jwt.verify(token, process.env.JWT_SECRET!) as TokenData;
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
