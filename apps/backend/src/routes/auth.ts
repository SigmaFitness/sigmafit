import { prisma } from "../db";
import { Router, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { setAuthTokenAsCookie } from "../utils/setAuthTokenAsCookie";
import { isAuthenticated } from "../utils/authMiddlewares";
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken'
import axios from "axios";


const router = Router();

router.get('/github/callback', async (req, res) => {
  try {
  const code = req.query.code

  const response = await axios({
    url: "https://github.com/login/oauth/access_token",
    data: {
      client_id: process.env.GITHUB_CLIENT,
      client_secret: process.env.GITHUB_SECRET,
      code
    }
  })

  const tmp: string = response.data
  const accessToken = tmp.split("&").filter((e) => e.startsWith("access_token=")).map(e => e.split("access_token=")[1])[0]

    const userDataResponse = await axios({
      url: "https://api.github.com/user/emails",
      headers: {
        "Authorization": `token ${accessToken}`,
        "Accept": "application/vnd.github+json"
      }
    })
    const email = userDataResponse.data.filter((e: any) => e.primary && e.verified)[0].email
    if (!email) throw { message: "No primary verified email" }


    const userGeneralDataResponse = await axios({
      url: "https://api.github.com/user",
      headers: {
        "Authorization": `token ${accessToken}`,
        "Accept": "application/vnd.github+json"
      }
    })

    const fullName: string=userGeneralDataResponse.data.name
    const chunks = fullName.split(" ").map(e => e.trim()).filter(e => e.length)
    const first_name = chunks.splice(0, 1).join(" ")
    const last_name = chunks.length ? chunks.join(" ") : "_"
    const picture = userGeneralDataResponse.data.avatar_url


    // perform magic
    socialSignInHandle(res, {
      first_name,
      last_name,
      email,
      picture,
    })


  } catch (err) {
    console.error(err)
    res.redirect('/error')
  }
});

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

    socialSignInHandle(res, {
      first_name,
      last_name,
      email,
      picture,
    })

  } catch (err) {
    console.error(err)
    res.redirect('/error')
  }

})
export default router;



const socialSignInHandle = async (res: Response, userData: {
  first_name: string,
  last_name: string,
  email: string,
  picture: string,
}) => {
  const { email, first_name, last_name, picture } = userData;
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
}
