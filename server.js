const express = require('express');
var exphbs = require("express-handlebars");
var mysql = require("mysql");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "burgers_db"
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

app.get("/", function (req, res) {
  connection.query(
    "SELECT * FROM burgers;",
    function (err, data) {
      if (err) {
        return res.status(500).end;
      }
      console.log(data);
      res.render('index', { burgers: data })
    })
});

// api routes

app.post('/api/burgers', function (req, res) {
  connection.query(
    'INSERT INTO burgers (burger_name) VALUES (?)',
    [req.body.burger_name],
    function (err, result) {
      if (err) return res.status(500).end();
      res.json({ id: result.indertId })
      // console.log({ id: result.insertId });
    });
});

app.put('/api/burgers/:id', function (req, res) {
  // connection.query(
  //   'SELECT * FROM burgers',
  //   function (err, data) {
  //     if (err) throw err;

  //     for (var i = 0; i < data.length; i++) {

  connection.query(
    `UPDATE burgers SET devoured = ${req.body.devoured === '0' ? 'true' : 'false'} WHERE id = ?`,
    [req.params.id],
    function (err, result) {
      res.status(200).end();
    })

})

app.listen(PORT, function () {
  console.log(`go here ---> http://localhost:${PORT}`);
})