/****
 * ENDPOINTS
 * 
  1. Auth and redirect
  2. Generate access token by using code
*/

import axios from "axios";
import querystring from "querystring";

// Redirect &  Authenticate from snapchat
export const redirectAuthUser = async (req, res) => {
  const redirectUrl = `${process.env.SNAPCHAT_URL}/authorize?client_id=${process.env.OAUTH_APP_CLIENT_ID}&redirect_uri=${process.env.OAUTH_APP_REDIRECT_URI}&response_type=code&scope=snapchat-marketing-api`;

  res.redirect(redirectUrl);
};

//Generate access token by using code generate in redirect
export const getAuthAccessToken = async (req, res) => {
  try {
    const code = req.params.code;

    const data = querystring.stringify({
      grant_type: "authorization_code",
      client_id: process.env.OAUTH_APP_CLIENT_ID,
      client_secret: process.env.OAUTH_APP_CLIENT_SECRET,
      code,
      redirect_uri: process.env.OAUTH_APP_REDIRECT_URI,
    });
    const response = await axios.post(
      `${process.env.SNAPCHAT_URL}/access_token`,
      data
    );

    // Send the response from Snapchat API back to the client
    res.send(response.data);
  } catch (error) {
    // If there's an error, send an error response
    console.error("Error:", error);
    res.status(error.response.status).send(error.response.data);
  }
};
