var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var PORT = Number(process.env.PORT || 3000);
var counters = require('./lib/counters');
var cors = require('cors');

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


function sendFile (name) {
  return function (req, res) {
    res.sendFile(__dirname + '/static/' + name);
  };
}

app.get('/', sendFile('index.html'));
app.get('/app.js', sendFile('app.js'));
app.get('/app.css', sendFile('app.css'));



app.get('/api/v1/counters', function (req, res) {
  res.json(counters.all());
});



app.post('/api/v1/counter', function (req, res) {
  console.log(req.body);
  res.json(counters.create(req.body.title));
});



app.delete('/api/v1/counter', function (req, res) {
  res.json(counters.delete(req.query.id));
});



app.post('/api/v1/counter/inc', function (req, res) {
  console.log(req);
  res.json(counters.inc(req.body.id));
});



app.post('/api/v1/counter/dec', function (req, res) {
  res.json(counters.dec(req.body.id));
});

app.get('*', sendFile('index.html'));
app.head('*', sendFile('index.html'));

app.listen(PORT, console.log.bind(null, 'PORT: ' + PORT));

