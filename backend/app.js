import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import authRoute from "./routes/authRoute.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 7001;

/****
 * ENDPOINTS
 * 
  1. Auth and redirect
	2. Generate access token by using code 
	3. Create segment
	4. Get all segments
	5. Upload users data
	6. Add users to segment
  7. Get segment by id
	8. Update segment
  9. Update users in local db
 */

//auth
app.use("/api/auth", authRoute);

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the Express server!" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
