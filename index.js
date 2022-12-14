var express = require('express');
var app = express();
require('dotenv').config();
const PORT = process.env.PORT;
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
// var cors = require('cors');
// app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api', (req,res) => {
  res.json({ 
      unix: new Date().getTime() ,
      utc: new Date().toUTCString(),
  });
});


app.get('/api/:timestamp', (req,res) => {

  const timestamp = req.params.timestamp;

  if (!isNaN( Number(timestamp) ) && timestamp.length === 13 ) {
    let num = Number(timestamp);
    res.json({
      unix: num,
      utc: new Date( num ).toUTCString()
    });
  } else if ( new Date( timestamp ).toString() !== "Invalid Date" ) {
    let dateObj = new Date( timestamp );
    res.json({
      unix: dateObj.getTime(),
      utc: dateObj.toUTCString()
    });
  } else res.json({ error : "Invalid Date" });
});

// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + PORT);
});
