require('dotenv').config();
import { KLAGER } from './get/klager';

var express = require('express');

var app = express();

const port = process.env.REACT_APP_API_PORT || 3001;
const MOCK_DATA = process.env.MOCK_DATA || true;

/////////////////
///////GET///////
////////////////

app.get('/', (req, res) => {
    res.send('Received a GET HTTP method');
});

app.get('/klager', (req, res) => {
    // var klager = localStorage.getItem('klager');
    // klagerParsed = JSON.parse(klager);
    // return res.send(klagerParsed);
    if (MOCK_DATA) {
        return res.send(KLAGER);
    }
});

/////////////////
//////POST//////
////////////////

app.post('/klager', (req, res) => {
    var klage = req.body;

    try {
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
});

app.post('/', (req, res) => {
    return res.send('Received a POST HTTP method');
});
app.put('/', (req, res) => {
    return res.send('Received a PUT HTTP method');
});
app.delete('/', (req, res) => {
    return res.send('Received a DELETE HTTP method');
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
