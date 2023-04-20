const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:4000", "http://localhost:3000"],
  })
);
const { DBuser, DBpass } = process.env;
const connection = mysql.createConnection({
  host: "localhost",
  user: DBuser,
  password: DBpass,
  database: "mysql_SPA",
});

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to MySQL database =", err);
  }
  console.log("MySQL Database Connented!");
});
//require("./routes")(app);
app.get("/api", async (req, res) => {
  console.log("Hello");
  res.status(200).send("Hellol World!!!");
});
app.post("/api/adduser", async (req, res) => {
  const { studentID, namePrefix, name, lastname } = req.body;
  try {
    connection.query(
      "INSERT INTO users(studentID, namePrefix, name, lastname) VALUES(?, ?, ?, ?)",
      [studentID, namePrefix, name, lastname],
      (err, results, fields) => {
        if (err) {
          console.log("Error while adding users", err);
          return res.status(400).send({ message: "Error adding users" });
        }
        return res.status(201).send({ message: "User added" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Error" });
  }
});
app.get("/api/users", async (req, res) => {
  try {
    console.log("getting users");
    connection.query("SELECT * FROM users", (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      return res.status(200).send(results);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});
port = 4000;
app.listen(port, () => {
  console.log(`SPA API SERVER IS RUNNIN AT PORT ${port}!!!`);
});
