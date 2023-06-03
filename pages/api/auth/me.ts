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
  const token = bearerToken.split(" ")[1];
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

  if(!user) {
    res.status(401).json({
      userMessage: "User not found"
    });
  }

  const response = {
    ...user,
    firstName: user?.first_name,
    lastName: user?.last_name
  }

  return res.status(200).json(response)
}