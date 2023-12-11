const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "contra", // Contraseña del usuario root 
  database: "users", // Nombre de la database
});

app.post("/nuevousuario", (req, res) => {
  const sql =
    "INSERT INTO cuentas (nombre, contra, email, userType) VALUES (?, ?, ?, ?)";
  const values = [
    req.body.name,
    req.body.password,
    req.body.email,
    req.body.userType,
  ];

  console.log(values);

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.json("error");
    }
    return res.json(data);
  });
});

app.post("/login", (req, res) => {
  const sql =
    "SELECT * FROM cuentas WHERE nombre = ? AND contra = ?";

  db.query(sql, [req.body.nombre,req.body.contra], (err, data) => {
    if (err) {
      console.error(err);
      return res.json("error");
    }
    console.log(data);
    if (data.length > 0 ) {
      console.log("user conected")
      return res.json("user found");
    } else {
      console.log("user tried to connect");
      return res.json("user not found");
    }
  });
});

app.listen(8081, () => {
  console.log("listening");
});
