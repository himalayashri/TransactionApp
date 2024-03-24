const express = require('express');
const MongoDb = require('./db');
const bodyParser = require("body-parser");
require('dotenv').config();
const transactionRoutes = require("./Routes/transactionRoutes");
const chartRoutes = require("./Routes/chartRoutes")
const PORT = process.env.PORT || 5000;


MongoDb();

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    next(); 
});

app.use('/api', transactionRoutes);
app.use('/chart', chartRoutes);


app.listen(PORT, () => {
    console.log(`Server is listening in ${PORT}`);
});



