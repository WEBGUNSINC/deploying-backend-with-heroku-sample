const express = require('express'); // import express module (simplifies routing/requests, among other things)
const app = express(); // create an instance of the express module (app is the conventional variable name used)
const fetch = require('node-fetch'); // import node-fetch (enables the fetch API to be used server-side)
const PORT = process.env.PORT || 5000; // use either the host env var port (PORT) provided by Heroku or the local port (5000) on your machine
const ttapitok = process.env.ttbearer



app.get('/', (req, res) => { 
  var sku = req.query.sku;
  // send a get request to root directory ('/' is this file (app.js))
  fetch('https://api.turnto.com/v1.2/reviews?sku='+sku, {
    method: 'GET',
    headers: { 'Authorization': 'bearer ' + ttapitok}
  }) // fetch TT reviews
    .then(res => res.json()) // return a promise containing the response
    .then(json => {
      res.write('<html><head><title>My Sample Heroku app using TurnTo\'s API</title>');
      res.write(`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</head>`)
      res.write('<body class="p-3">');
      res.write('<h1 class="p-3 border bg-light">My Sample Heroku app using TurnTo API</h1>')
      res.write('<div class="container overflow-hidden"><div class="row gy-5"><div class="border bg-light"><strong>Total Reviews:</strong> ' + json.total + '</div>')
          for(var i = 0; i < json.total; i++) {
          res.write('<div class="row border bg-light"><div class="col"><strong>Review Title:</strong> ' + json.reviews[i].title + '</div></div>')
          res.write('<div class="row border bg-light"><div class="col"><strong>Rating:</strong> ' + json.reviews[i].rating + '</div></div>')
          res.write('<div class="row border bg-light"><div class="col"><strong>Body:</strong> ' + json.reviews[i].text + '</div></div>')
          res.write('<div class="row border bg-light"><div class="col"><strong>Name:</strong> ' + json.reviews[i].user.nickName + '</div></div>')
        }
          //res.write(JSON.stringify(json))
          res.write('</div></div></body>');
          res.write('</html>');
          res.end()
    })
     // extract the JSON body content from the response and sends it to the client
    .catch(function(err){ // catch any errors
      console.log(err); // log errors to the console
    })
})



app.listen(PORT, () => { // start server and listen on specified port
  console.log(`App is running on ${PORT}`) // confirm server is running and log port to the console
}) 
