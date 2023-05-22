// import some node modules for later

const fs = require("node:fs");
const path = require("node:path");

// create express app

const express = require("express");
const cors = require("cors");
const connection = require("./db");

connection.connect((err) => {
  if (err) {
    console.error("error connecting db");
  } else {
    console.info("connected to db");
  }
});

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.get("/resources", async (req, res) => {
  try {
    const [results] = await connection
      .promise()
      .query("SELECT * FROM resources");
    console.info("Sent results:", results);
    res.json(results);
  } catch (err) {
    res.status(500).send("Failure to retrieve data from the database.");
  }
});
app.post("/resources", async (req, res) => {
  try {
    const { title, url, type, topics, description } = req.body;
    const [result] = await connection
      .promise()
      .query(
        "INSERT INTO resources (title, url, type, topics, description) VALUES (?, ?, ?, ?, ?)",
        [title, url, type, topics, description]
      );
    console.log("result: ", result);
    const createdResource = {
      id: result.insertId,
      title,
      url,
      type,
      topics,
      description,
    };
    res.status(201).json(createdResource);
  } catch (err) {
    console.log(err);
    res.status(500).send("Failure to write data to the database.");
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
