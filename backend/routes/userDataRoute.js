import express from "express";
import multer from "multer";
import {
  getUserById,
  getUsers,
  updateUser,
  usersUpload,
} from "../controller/userDataController.js";

const userDataRoute = express.Router();
/****
 * ENDPOINTS
 * 
    1. Upload users data
    2. Add users to segment
    3. Update users in local db
*/
// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

userDataRoute.post("/upload", upload.single("file"), usersUpload);
userDataRoute.get("/", getUsers);
userDataRoute.get("/:id", getUserById);
userDataRoute.put("/:id", updateUser);

export default userDataRoute;
