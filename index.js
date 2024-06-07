
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
// Below task related to data can be done within pgAdmin which is the application of postgreSQL
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "DataExp",// Create a database within pgAdmin
  password: "xxxx", // Type your pgAdmin password here
  port: xxxx, //Give your pgAdmin default port number here
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET home page
app.get("/", async (req, res) => {
  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  console.log(result.rows);
  res.render("index.ejs", { countries: countries, total: countries.length });
  db.end();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
