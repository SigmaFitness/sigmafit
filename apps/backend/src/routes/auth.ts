import { Router } from "express";
import {
  isAuthenticated,
  isAuthenticatedWithoutErr,
} from "../utils/authMiddlewares";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import axios from "axios";
import OAuth from "oauth";
import {
  getOAuthRequestToken,
  getOAuthAccessTokenWith,
} from "../utils/oauthHelpers";
import { handleSocialSignInData } from "../utils/handleSocialSignInData";
import { sendErrorResponse } from "../utils/sendErrorResponse";
import { breakUserFullName } from "../utils/breakUserFullName";
import { prisma } from "../db";

const router = Router();

let twitterOauthClientInstance = new OAuth.OAuth(
  "https://api.twitter.com/oauth/request_token",
  "https://api.twitter.com/oauth/access_token",
  process.env.TWITTER_CONSUMER_API_KEY,
  process.env.TWITTER_CONSUMER_API_SECRET,
  "1.0A",
  null,
  "HMAC-SHA1"
);

const googleOAuth2ClientInstance = new OAuth2Client({
  clientId: process.env.GIS_CLIENT_ID,
  clientSecret: process.env.GIS_CLIENT_SECRET,
  redirectUri: `${process.env.AUTH_CLIENT_REDIRECT_BASE_URL}/api/auth/google/callback`,
});

/**
 * Route to start the oauth process of twitter
 */
router.get("/twitter/start", async (req, res) => {
  try {
    const { oauthRequestToken, oauthRequestTokenSecret } =
      await getOAuthRequestToken(twitterOauthClientInstance);
    const method = "authenticate";
    const authUrl = `https://api.twitter.com/oauth/${method}?oauth_token=${oauthRequestToken}`;
    res.cookie("twitter_tmp_oauth_token_secret", oauthRequestTokenSecret);

    res.redirect(authUrl);
  } catch (err) {
    sendErrorResponse(res, err);
  }
});

/**
 * Twitter Oauth Callback
 */
router.get("/twitter/callback", async (req, res) => {
  try {
    const {
      oauth_token,
      oauth_verifier,
    }: {
      oauth_token: string;
      oauth_verifier: string;
    } = req.query as any;

    const oauthRequestTokenSecret =
      req.cookies["twitter_tmp_oauth_token_secret"];

    const { oauthAccessToken, oauthAccessTokenSecret, results } =
      await getOAuthAccessTokenWith(
        twitterOauthClientInstance,
        oauth_token,
        oauthRequestTokenSecret,
        oauth_verifier
      );
    const user_id: string = results.user_id;

    twitterOauthClientInstance.get(
      "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true",
      oauthAccessToken,
      oauthAccessTokenSecret,
      (err, results: any) => {
        if (err) throw err;
        const userObject = JSON.parse(results);
        const picture: string = userObject.profile_image_url_https;
        const [first_name, last_name] = breakUserFullName(userObject.name);
        const email = userObject.email;
        // perform magic
        handleSocialSignInData(res, {
          first_name,
          last_name,
          email,
          picture,
          is_twitter_connected: true,
        });
      }
    );
  } catch (err) {
    console.error(err);
    res.redirect("/error");
  }
});

/**
 * Route to start github auth
 */
router.get("/github/start", async (req, res) => {
  try {
    const params = new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID ?? "",
      redirect_uri: `${process.env.AUTH_CLIENT_REDIRECT_BASE_URL}/api/auth/github/callback`,
      scope: "user:email read:user",
    });
    const authUrl = `https://github.com/login/oauth/authorize?${params}`;

    res.redirect(authUrl);
  } catch (err) {
    console.error(err);
    res.redirect("/error");
  }
});

/**
 * GitHub Oauth Callback
 */
router.get("/github/callback", async (req, res) => {
  try {
    const code = req.query.code;

    const response = await axios({
      url: "https://github.com/login/oauth/access_token",
      data: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
    });

    const tmp: string = response.data;
    const accessToken = tmp
      .split("&")
      .filter((e) => e.startsWith("access_token="))
      .map((e) => e.split("access_token=")[1])[0];

    const userDataResponse = await axios({
      url: "https://api.github.com/user/emails",
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github+json",
      },
    });
    const email = userDataResponse.data.filter(
      (e: any) => e.primary && e.verified
    )[0].email;
    if (!email) throw { message: "No primary verified email" };

    const userGeneralDataResponse = await axios({
      url: "https://api.github.com/user",
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github+json",
      },
    });

    const [first_name, last_name] = breakUserFullName(
      userGeneralDataResponse.data.name
    );
    const picture = userGeneralDataResponse.data.avatar_url;

    // perform magic
    handleSocialSignInData(res, {
      first_name,
      last_name,
      email,
      picture,
      is_github_connected: true,
    });
  } catch (err) {
    console.error(err);
    res.redirect("/error");
  }
});

router.get("/google/start", async (req, res) => {
  try {
    const authUrl = googleOAuth2ClientInstance.generateAuthUrl({
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
    });
    res.redirect(authUrl);
  } catch (err) {
    console.error(err);
    res.redirect("/error");
  }
});
/**
 * Google Oauth Callback
 */
router.get("/google/callback", async (req, res) => {
  try {
    const code: string = (req.query as any).code;
    let { tokens } = await googleOAuth2ClientInstance.getToken(code);
    googleOAuth2ClientInstance.setCredentials(tokens);

    // get data
    // also we're damn sure that the token integrity is okay
    const data: any = jwt.decode(tokens.id_token);

    const {
      given_name: first_name,
      family_name: last_name,
      email,
      picture,
    } = data;

    handleSocialSignInData(res, {
      first_name,
      last_name,
      email,
      picture,
      is_google_connected: true,
    });
  } catch (err) {
    console.error(err);
    res.redirect("/error");
  }
});

/**
 * Route to get the profile
 */
router.get("/profile/", isAuthenticated, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
  });
  res.send(user);
});

/**
 * Route to get the currently authenticated user
 */
router.get("/currentUser/", isAuthenticatedWithoutErr, (req, res) => {
  res.send({
    is_logged_in: req.user ? true : false,
    user: req.user,
  });
});

/**
 * Route to logout the user
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

export default router;
