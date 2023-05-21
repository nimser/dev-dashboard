// import some node modules for later

const fs = require("node:fs");
const path = require("node:path");

// create express app

const express = require("express");
const cors = require("cors");
const connection = require("./db");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to db");
  } else {
    console.info("Connected to db");
  }
});
app.get("/resources", async (req, res) => {
  try {
    const [results] = await connection
      .promise()
      .query("SELECT * FROM resources");
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error in querying the SQL server");
  }
});
app.get("/resources/:id", () => {});

// serve REACT APP

const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
);

if (fs.existsSync(reactIndexFile)) {
  // serve REACT resources

  app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

  // redirect all requests to the REACT index file

  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

// ready to export

module.exports = app;
