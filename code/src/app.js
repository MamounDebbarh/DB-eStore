const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const port = 3303;

const db = mysql.createConnection ({
    host: 'mmd4.host.cs.st-andrews.ac.uk',
    user: 'mmd4',
    password: 'd1sMW5v0Av7.w5',
    database: 'mmd4_P2db'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

global.db = db;

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
     res.sendFile(__dirname + '/page.html');
});

app.get('/page.js', function(req, res) {
    res.sendFile(__dirname + '/page.js');
});

app.get('/a',function(req,res){
    let query ="SELECT audiobook.title, audiobook.ISBN, group_concat(DISTINCT CONCAT(person.surname, ' ', person.forename, ' ',person.middle_initials),'')AS authors, audiobook.purchase_price, audiobook.published_date, audiobook.publisher_name FROM audiobook LEFT JOIN audiobook_authors ON audiobook.ISBN = audiobook_authors.ISBN LEFT JOIN contributor ON contributor.person_ID = audiobook_authors.contributor_ID LEFT JOIN person ON person.ID = contributor.person_ID group by(audiobook.title);";
    db.query(query, function(err, result) {
        if (err) throw err;
        res.writeHeader(200, "text/JSON");
        res.end(JSON.stringify(result));
    });
});

app.get('/b/:isbn',function(req,res){
    let isbn = req.params.isbn;
     db.query("SELECT CONCAT(person.surname, ' ', person.forename, ' ',person.middle_initials) AS full_name, audiobook_reviews.rating, audiobook_reviews.title, audiobook_reviews.comment FROM audiobook_reviews LEFT JOIN customer ON customer.person_ID = audiobook_reviews.customer_ID LEFT JOIN person ON person.ID = customer.person_ID WHERE audiobook_reviews.ISBN = '" + isbn +"';",function (err, result){
        if (err) throw err;
         res.writeHeader(200, "text/JSON");
         res.end(JSON.stringify(result));
     });
});


// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
