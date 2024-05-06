import crypto from "crypto";
import { db } from "../utils/db.js";

/****
 * User Data And upload ENDPOINTS
 * 
1. Upload users data
2. get users from db
3. get users by id
4. Update users in local db

TODO:
- remove duplicate by check if the user is exist dont add it.
- add phones data
*/

//Upload users data
// Function to store user data in the database
export const storeUserData = (hashedValue, unhashedValue) => {
  const stmt = db.prepare(
    "INSERT INTO users (type, hashed_email, unhashed_email) VALUES (?, ?, ?)"
  );
  stmt.run("user", hashedValue, unhashedValue || ""); // Provide a default value if unhashedValue is null
  stmt.finalize();
};
export const usersUpload = async (req, res) => {
  // Get the uploaded file
  // Function to normalize email addresses
  const normalizeEmail = (email) => {
    return email.trim().toLowerCase();
  };

  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded." });
    }
    // Convert buffer to string
    const dataText = file.buffer.toString("utf8");

    // Parse and classify data
    const entries = dataText.split("\n").map((entry) => entry.trim());
    const classifiedEntries = entries.map((entry) => {
      const normalizedEntry = normalizeEmail(entry); // Normalize all entries
      const hashedValue = crypto
        .createHash("sha256")
        .update(normalizedEntry)
        .digest("hex");
      return [hashedValue]; // Return as array of arrays
    });

    // Schedule storage of user data after the response is sent
    process.nextTick(() => {
      // Store classified data in SQLite
      entries.forEach((entry) => {
        const normalizedEntry = normalizeEmail(entry); // Normalize all entries
        console.log(normalizedEntry);
        const hashedValue = crypto
          .createHash("sha256")
          .update(normalizedEntry)
          .digest("hex");
        storeUserData(hashedValue, normalizedEntry); // Store both hashed and unhashed values
      });
    });

    // Return classified entries
    res.json(classifiedEntries);
  } catch (error) {
    console.log(error);
  }
};
//Get users from db
export const getUsers = (req, res) => {
  // Query the SQLite database to get all user data
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    // Return the user data
    res.json(rows);
  });
};

//Get User by id from db
export const getUserById = (req, res) => {
  const userId = req.params.id;

  // Query the SQLite database to get the user data by ID
  db.get("SELECT * FROM users WHERE id = ?", userId, (err, row) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!row) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user data
    res.json(row);
  });
};

//update users in db
export const updateUser = (req, res) => {
  const userId = req.params.id;
  const userData = req.body;

  // Construct the SQL UPDATE query dynamically based on the keys in userData
  const columnsToUpdate = Object.keys(userData)
    .map((key) => `${key} = ?`)
    .join(", ");
  const valuesToUpdate = Object.values(userData);

  // Add the userId to the values array for the WHERE clause
  valuesToUpdate.push(userId);

  // Execute the SQL UPDATE query
  db.run(
    `UPDATE users SET ${columnsToUpdate} WHERE id = ?`,
    valuesToUpdate,
    function (err) {
      if (err) {
        console.error("Error updating user:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      if (this.changes === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      // Return success response
      res.json({ message: "User updated successfully." });
    }
  );
};
