import express from "express";
import {
  createSegment,
  getAllSegments,
  getSegmentById,
  updateSegment,
} from "../controller/segmentControler.js";

const segmentRoute = express.Router();

/****
 * ENDPOINTS
 * 
3. Create segment
4. Get all segments
6. Add users to segment
7. Get segment by id
8. Update segment
*/

segmentRoute.get("/", getAllSegments);
segmentRoute.get("/:segment_id", getSegmentById);
segmentRoute.post("/create", createSegment);
segmentRoute.put("/update/:ad_account_id", updateSegment);

export default segmentRoute;
