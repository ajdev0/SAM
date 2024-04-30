import sqlite3 from "sqlite3";

const sqlite3Verbose = sqlite3.verbose();
// SQLite setup
export const db = new sqlite3Verbose.Database("users.db");
db.serialize(function () {
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, hashed_email TEXT, unhashed_email TEXT, name TEXT, age INTEGER, gender TEXT, country TEXT, city TEXT)"
  );
});
