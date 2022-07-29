import { prisma } from "../db";
import { Router } from "express";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import {
  signInPayloadValidator,
  signUpPayloadValidator,
} from "../validators/auth";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { setAuthTokenAsCookie } from "../utils/setAuthTokenAsCookie";
import { isAuthenticated } from "../utils/authMiddlewares";
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken'


const router = Router();

/**
 * Route to get the currently authenticated user
 */
router.get("/currentUser/", isAuthenticated, (req, res) => {
  // If I'm inside this route handler
  // it means that I'm authenticated
  res.send({
    user: req.user,
  });
});

/**
 * Route to get the currently authenticated user
 */
router.get("/logOut/", isAuthenticated, (req, res) => {
  // If I'm inside this route handler
  // it means that I'm authenticated

  res.cookie("sigmaKeeper", null, {
    maxAge: -1,
  });
  res.send({
    error: false,
    user: "Logged out successfully!",
  });
});


router.get('/google/callback', async (req, res) => {
  try {
    const oAuth2ClientInstance = new OAuth2Client({
      clientId: process.env.GIS_CLIENT_ID,
      clientSecret: process.env.GIS_CLIENT_SECRET,
      redirectUri: process.env.GIS_REDIRECT_URI
    })


    const code: string = (req.query as any).code
    let { tokens } = await oAuth2ClientInstance.getToken(code)
    oAuth2ClientInstance.setCredentials(tokens);

    // get data
    // also we're damn sure that the token integrity is okay
    const data: any = jwt.decode(tokens.id_token)
    const { given_name: first_name, family_name: last_name, email, picture } = data

    const user = await prisma.user.findFirst({
      where: {
        email
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
          picture
        },
      });
      setAuthTokenAsCookie(res, newUser);
    }
    res.redirect('/dash')

  } catch (err) {
    console.error(err)
    res.redirect('/error')
  }

})
export default router;
