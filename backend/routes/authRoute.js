import express from "express";
import {
  getAuthAccessToken,
  redirectAuthUser,
} from "../controller/authContriller.js";

const authRoute = express.Router();

/****
 * ENDPOINTS
 * 
  1. Auth and redirect
  2. Generate access token by using code
*/

authRoute.get("/redirect", redirectAuthUser);
authRoute.post("/access/:code", getAuthAccessToken);

export default authRoute;
