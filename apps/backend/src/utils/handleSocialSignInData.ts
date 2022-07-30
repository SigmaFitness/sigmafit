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
    is_github_connected?: boolean;
    is_google_connected?: boolean;
    is_twitter_connected?: boolean;
  }
) => {
  const {
    email,
    first_name,
    last_name,
    picture,
    is_github_connected,
    is_google_connected,
    is_twitter_connected,
  } = userData;

  const tmpObj: Record<string, boolean> = {
    is_google_connected,
    is_github_connected,
    is_twitter_connected,
  };

  const socialConnectionStatus: Record<string, boolean> = {};
  Object.keys(tmpObj)
    .filter((e) => tmpObj[e])
    .forEach((e) => (socialConnectionStatus[e] = true));

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    // update async
    const newUser=await prisma.user.update({
      where: {
        email: user.email
      },
      data: {
        ...socialConnectionStatus,
        last_token_generated_at: new Date()
      }
    })

    // login user
    setAuthTokenAsCookie(res, newUser);
  } else {
    // register user
    const uuid = uuidv4();

    const newUser = await prisma.user.create({
      data: {
        ...socialConnectionStatus,
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
