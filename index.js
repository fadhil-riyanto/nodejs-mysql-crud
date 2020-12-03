const path = require('path');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { static } = require('express');
const app = express();
//buat koneksi
let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodejs-crud'
});
//create conn
conn.connect((err) => {
    if (err) throw err;
    console.log('connected');
});
//set view
app.set('views', path.join(__dirname, 'views'));
///set view egine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set publik sebagai static folder
app.use('/assets', express.static(__dirname + '/public'));

//route homepage
app.get('/', (req, res) => {
    let sql = 'SELECT * FROM info';
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.render('product_view', {
            results: results
        });
    });
});
