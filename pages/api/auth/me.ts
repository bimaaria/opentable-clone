import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import * as jose from "jose";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  const bearerToken = req.headers["authorization"] as string;

  if(!bearerToken) {
    return res.status(401).json({
      errorMessage: "Unauthorized"
    });
  }

  const token = bearerToken.split(" ")[1];

  if(!token) {
    return res.status(401).json({
      errorMessage: "Unauthorized"
    });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    return res.status(401).json({
      errorMessage: "Unauthorized"
    });
  }
  
  const payload = jwt.decode(token) as {email: string};
  
  if(!payload.email) {
    return res.status(401).json({
      errorMessage: "Unauthorized"
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: payload.email
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      city: true,
      phone: true,
      email: true,
    }
  });

  return res.status(200).json(user)
}