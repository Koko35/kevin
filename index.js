const express = require("express");
const mysql = require("mysql");
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(express.static('public'));
app.set('view engine', 'ejs')
const connection = mysql.createConnection({
	host: 'remotemysql.com',
	user: 'MS48l6LMaU',
	port: '3306',
	password: 'icnXeTXtT9',
	database: 'MS48l6LMaU'
})

app.get("/", (req, res) => {
	res.render('index')
});
app.get("/cars", (req, res) => {
	connection.query(`SELECT * FROM cars`, (error, rows) => {
		if (error) throw error;
		if (!error) {
			console.log(rows)
			res.render('cars/index', { cars: rows })
		}
	})
})
app.get("/cars/:type", (req, res) => {
	if (req.params.type) {
		connection.query(`SELECT * FROM cars WHERE Type = "${req.params.type}" `, (error, rows) => {
			if (error) throw error;
			if (!error) {
				console.log(rows)
				res.render('cars/index', { cars: rows })
			}
		})
	}
});
app.get("/pizza", (req, res) => {
	connection.query(`SELECT * FROM pizza`, (error, rows) => {
		if (error) throw error;
		if (!error) {
			connection.query('SELECT * FROM ingredients', (err, items) => {
				res.render('pizza/index', { pizza: rows, ingredient: items })
			})
			//console.log(rows)
		}
	})
})
app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});