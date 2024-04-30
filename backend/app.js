import express from "express";
const app = express();
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

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the Express server!" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
