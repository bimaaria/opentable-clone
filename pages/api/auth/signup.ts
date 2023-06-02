import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if(req.method === "POST") {
    const { firstName, lastName, phone, city, email, password } = req.body;
    const errors: string[] = [];
    const validationSchema = [
      {
        valid: validator.isLength(firstName, {
          min: 1,
          max: 20
        }),
        errorMessage: "First name must have 1 - 16 characters"
      },
      {
        valid: validator.isLength(lastName, {
          min: 1,
          max: 20
        }),
        errorMessage: "Last name must have 1 - 16 characters"
      },
      {
        valid: validator.isMobilePhone(phone),
        errorMessage: "Phone is invalid"
      },
      {
        valid: validator.isLength(city, {
          min: 1
        }),
        errorMessage: "City needs at least 1 character"
      },
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is invalid"
      },
      {
        valid: validator.isStrongPassword(password),
        errorMessage: "Password must have at least 1 character, number, and special character"
      }
    ];

    validationSchema.forEach((check) => {
      if(!check.valid) {
        errors.push(check.errorMessage)
      }
    });

    if(errors.length) {
      return res.status(400).json({
        message: errors[0]
      });
    }

    const userExist = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if(userExist) {
      return res.status(400).json({
        message: "This email has been used by another account"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        password: hashedPassword,
        city,
        phone,
        email
      }
    });

    const alg = "HS256";
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new jose.SignJWT({ email: user.email })
      .setProtectedHeader({ alg })
      .setExpirationTime("24h")
      .sign(secret);

    const response = (
      ({ first_name, last_name, city, phone, email }) => ({ first_name, last_name, city, phone, email })
    )(user);

    res.status(200).json({...response, token: token});
  }
}