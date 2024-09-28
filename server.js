// import our dependencies 

//HTTP framework for handling requests
const express = require("express");
const app = express();
//DBMS Mysql
const mysql = require('mysql2');
//Cross origin resource sharing
const cors = require('cors');
//Environment variable doc
const dotenv = require('dotenv');


app.use(express.json());
app.use(cors());
dotenv.config();

//Connect to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Check if there is a connection 
db.connect((err) => {
    // If no connection
    if(err) return console.log("Error connecting to MYSQL");

    // If connect works successfully
    console.log("connected to MYSQL ad id:", db.threadId);
})

// YOUR code goes down here

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//1. Retrieve all patients
app.get('/patient', (req,res) => {
    db.query('SELECT * FROM patients', (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving patients')
        }else {
        res.render('patient', {results: results});
        }
    });
});

//2. Retrieve all providers first_name, last_name and provider_specialty
app.get('/providers', (req,res) => {
    db.query('SELECT first_name, last_name, provider_specialty FROM providers', (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving providers')
        }else {
        res.render('providers', {results: results});
        }
    });
});

//3. Retrieve all patients by their first name
app.get('/patientsname', (req,res) => {
    db.query('SELECT first_name FROM patients', (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving patient first name')
        }else {
        res.render('patientsname', {results: results});
        }
    });
});

//4. Retrieve all providers by specialty
app.get('/providerspecialty', (req,res) => {
    db.query('SELECT provider_specialty FROM providers', (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving provider specialty')
        }else {
        res.render('providerspecialty', {results: results});
        }
    });
});
// <Your code goes up there
//basic endpoint to say hello world

    //sending a message to the browser
    console.log('sending message to browser...');
    app.get('/', (req,res) => {
    res.send('Server Started Successfully');
});


// start and listen to the server
app.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`);

});


