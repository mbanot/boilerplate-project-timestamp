// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const res = require('express/lib/response');
const req = require('express/lib/request');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function(req, res){
  
  let newDate;

  if (req.params && req.params.date !== undefined) {
    const date = req.params.date;
    console.log("DATE", date)

    if (typeof date === 'string' && date.trim() === '') {
      newDate = new Date();
      console.log('date is an empty string');
    } else if (typeof date === 'string') {
        // Check if the string contains only numbers
        if (/^\d+$/.test(date)) {
          newDate = new Date(Number(date));
          console.log('date is a number (string containing only numbers)');
        } else {
          newDate = new Date(date);
          console.log('date is a string');
          if(newDate.toString() === 'Invalid Date'){
            res.json({
              error: newDate.toString()
            });
            return;
          }
        }
    } else if (typeof date === 'number') {
      console.log('date is a number');
      newDate = new Date(Number(date));
    } else {
        console.log('date is of unknown type or undefined');
    }
  } else {
    newDate = new Date();
    console.log('date parameter is not provided');
  }
  
  res.json({
    unix: Number(Math.floor(newDate.valueOf())),
    utc: newDate.toUTCString()
  });
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
