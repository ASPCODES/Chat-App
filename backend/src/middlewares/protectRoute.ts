import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import prisma from "../db/prisma.js";

// ✅ Define Authenticated Request
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    username: string;
    fullName: string;
    profilePic: string | null;
  };
}

// ✅ Define JWT Payload Type
interface DecodedToken extends JwtPayload {
  userId: string;
}

// ✅ Update Global Type Declaration
declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: string;
        username: string;
        fullName: string;
        profilePic: string | null;
      };
    }
  }
}

const protectRoute = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // ✅ Check for token
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json({ error: "Unauthorized - No token provided" });
      return;
    }

    // ✅ Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    // ✅ Fetch user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, username: true, fullName: true, profilePic: true },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // ✅ Assign user to req
    req.user = { ...user, profilePic: user.profilePic || "" };

    next();
  } catch (error: any) {
    console.log("Error in protectRoute middleware", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default protectRoute;
