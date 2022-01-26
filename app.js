const express = require('express'); // import express module (simplifies routing/requests, among other things)
const app = express(); // create an instance of the express module (app is the conventional variable name used)
const fetch = require('node-fetch'); // import node-fetch (enables the fetch API to be used server-side)
const PORT = process.env.PORT || 5000; // use either the host env var port (PORT) provided by Heroku or the local port (5000) on your machine
const auth = process.env.ttbearer


var myHeaders = new Headers();
myHeaders.append("Authorization", "bearer AuXYdS7BiIkWTi1xiQfS6pbb2PUC47b2yEx");
myHeaders.append("Cookie", "AWSALB=mxwKBInjbOVmDPCgVRV2krNOhmLerhUbzhWeAaezDCLFwEu27mgLy3+K61mL33k4CuB4Skvjd6nUUVNtVQpK4/EN0zy94kazhOetM1OTcQK9OPLe2N88PiIXogs8; AWSALBCORS=mxwKBInjbOVmDPCgVRV2krNOhmLerhUbzhWeAaezDCLFwEu27mgLy3+K61mL33k4CuB4Skvjd6nUUVNtVQpK4/EN0zy94kazhOetM1OTcQK9OPLe2N88PiIXogs8");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

app.get('/', (req, res) => { // send a get request to root directory ('/' is this file (app.js))
  fetch("https://api.turnto.com/v1.2/reviews?sku=01_1020_04&includeRelated=false", requestOptions) // fetch title from TT reviews
    .then(res => res.json()) // return a promise containing the response
    .then(json => res.send(`<h1> ${json.title}!</h1>`)) // extract the JSON body content from the response (specifically the title value) and sends it to the client
    .catch(function(err){ // catch any errors
      console.log(err); // log errors to the console
    })
})

app.listen(PORT, () => { // start server and listen on specified port
  console.log(`App is running on ${PORT}`) // confirm server is running and log port to the console
}) 



// fetch("https://api.turnto.com/v1.2/reviews?sku=01_1020_04&includeRelated=false", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
