import { prisma } from "../db";
import { Response } from "express";
import { setAuthTokenAsCookie } from "./setAuthTokenAsCookie";
import { v4 as uuidv4 } from "uuid";

export const handleSocialSignInData = async (
  res: Response,
  userData: {
    first_name: string;
    last_name: string;
    email: string;
    picture: string;
  }
) => {
  const { email, first_name, last_name, picture } = userData;
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (user) {
    // login user
    setAuthTokenAsCookie(res, user);
  } else {
    // register user
    const uuid = uuidv4();

    const newUser = await prisma.user.create({
      data: {
        id: uuid,
        first_name,
        last_name,
        email,
        picture,
      },
    });
    setAuthTokenAsCookie(res, newUser);
  }
  res.redirect("/dash");
};
