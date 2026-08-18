import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/User";

export async function protect() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as {
      userId: string;
      email: string;
    };

    const user = await User.findById(decoded.userId).select(
      "-password"
    );

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Protect error:", error);
    return null;
  }
}