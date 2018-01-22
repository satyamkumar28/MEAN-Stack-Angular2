const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const authentication = require('./routes/authentication')(router);
const bodyParser = require('body-parser');


mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if (err) {
        console.log('Could not connect to database: ', err);
    } else {
        console.log('Connect to database: ' + config.db);
    }
});

// Provider static directory for frontend
app.use(bodyParser.urlencoded({extend:false}));
//parser application/Form
app.use(bodyParser.json());
app.use(express.static(__dirname+'/client/dist/'));
app.use('/authentication',authentication);

// Connect server to Angular 2 Index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/dist/index.html'));
});

//Start Server: Listen on port 3000

app.listen(3000, () => {
    console.log('Start server')
});