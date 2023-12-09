const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pegasus',
  database: 'users',
});

app.post('/CreateUser', (req, res) => {
  const sql = 'INSERT INTO cuentas (nombre, contra) VALUES (?, ?)';
  const values = [
    req.body.name,
    req.body.password
  ];

  console.log(values)

  db.query(sql, values, (err, data) => {  
    if (err) {
      console.error(err);  
      return res.json('error');
    }
    return res.json(data);
  });
});

app.listen(8081, () => {
  console.log('listening');
});
