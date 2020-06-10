// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// 1) API Project: Timestamp Microservice
app.get("/api/timestamp", function (req, res) {
  var date = new Date();
  res.json({"unix": date.getTime(), "utc" : date.toUTCString() })
});
app.get("/api/timestamp/:date_string", function (req, res) {
  var date;
  if (isNaN(req.params.date_string)) {
    date = new Date(req.params.date_string);  
  } else {
    date = new Date(+req.params.date_string);
  }
  
  if (date.toString() === 'Invalid Date') {
    res.json({"error" : "Invalid Date" });
  } else {    
    res.json({"unix": date.getTime(), "utc" : date.toUTCString()});
  }
});

// 2) API Project: Request Header Parser Microservice
app.get('/api/whoami', function(req, res) {
  res.send({"ipaddress": req.headers['x-forwarded-for'], "language": req.headers['accept-language'], "software": req.headers['user-agent']})
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});