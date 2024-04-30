import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import authRoute from "./routes/authRoute.js";
import segmentRoute from "./routes/segmentRoute.js";
import userDataRoute from "./routes/userDataRoute.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 7001;

//auth
app.use("/api/auth", authRoute);
//segments
app.use("/api/segment", segmentRoute);
//users
app.use("/api/users", userDataRoute);

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the Express server!" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
