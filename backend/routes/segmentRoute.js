import express from "express";
import {
  addSegmentUsers,
  createSegment,
  getAllSegments,
  getSegmentById,
  updateSegment,
} from "../controller/segmentControler.js";

const segmentRoute = express.Router();

/****
 * ENDPOINTS
 * 
1. Create segment
2. Get all segments
3. Add users to segment
4. Get segment by id
5. Update segment
*/

segmentRoute.get("/:ad_account_id", getAllSegments);
segmentRoute.get("/:segment_id", getSegmentById);
segmentRoute.post("/create", createSegment);
segmentRoute.put("/update/:ad_account_id", updateSegment);
segmentRoute.post("/add_users/:segment_id", addSegmentUsers);

export default segmentRoute;
