import express from "express";
const app = express();
const port = 7001;

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the Express server!" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
