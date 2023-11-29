const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  pasword: "",
  database: "case",
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM brukere";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/create", (req, res) => {
  const sql =
    "INSERT INTO brukere (`navn`, `etternavn`, `fødselsedato`, `adresse`, `telefonnummer`, `email`) VALUES (?)";
  const values = [
    req.body.navn,
    req.body.etternavn,
    req.body.fødselsedato,
    req.body.adresse,
    req.body.telefonnummer,
    req.body.email,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("created");
  });
});

app.put("/update/:id", (req, res) => {
  const sql =
    "UPDATE brukere set `navn` = ?, `etternavn` = ?, `fødselsedato` = ?, `adresse` = ?, `telefonnummer` = ?, `email` =? WHERE id = ?";
  const id = req.params.id;
  const values = [
    req.body.navn,
    req.body.etternavn,
    req.body.fødselsedato,
    req.body.adresse,
    req.body.telefonnummer,
    req.body.email,
  ];
  db.query(sql, [...values, id], (err, data) => {
    if (err) return res.json(err);
    return res.json("updated");
  });
});

app.delete("/delete/:id", (req, res) => {
  const sql = "DELETE FROM brukere WHERE id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json("deleted");
  });
});

// Function in work

/*app.get("/update/:id", (req, res) => {
  const sql = "SELECT * FROM brukere WHERE id = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});*/

app.listen(8081, () => {
  console.log("Listening...");
});
