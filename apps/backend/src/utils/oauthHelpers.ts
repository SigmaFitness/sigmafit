import { OAuth } from "oauth";

// CREDITS: https://cri.dev/posts/2020-03-05-Twitter-OAuth-Login-by-example-with-Node.js/

export async function getOAuthRequestToken(oauthConsumer: OAuth): Promise<{
  oauthRequestToken: string;
  oauthRequestTokenSecret: string;
  results: any;
}> {
  return new Promise((resolve, reject) => {
    oauthConsumer.getOAuthRequestToken(function (
      error,
      oauthRequestToken,
      oauthRequestTokenSecret,
      results
    ) {
      return error
        ? reject(new Error("Error getting OAuth request token"))
        : resolve({ oauthRequestToken, oauthRequestTokenSecret, results });
    });
  });
}

export async function getOAuthAccessTokenWith(
  oauthConsumer: OAuth,
  oauthRequestToken: string,
  oauthRequestTokenSecret: string,
  oauthVerifier: string
): Promise<{
  oauthAccessToken: string;
  oauthAccessTokenSecret: string;
  results: any;
}> {
  return new Promise((resolve, reject) => {
    oauthConsumer.getOAuthAccessToken(
      oauthRequestToken,
      oauthRequestTokenSecret,
      oauthVerifier,
      function (error, oauthAccessToken, oauthAccessTokenSecret, results) {
        return error
          ? reject(new Error("Error getting OAuth access token"))
          : resolve({ oauthAccessToken, oauthAccessTokenSecret, results });
      }
    );
  });
}
