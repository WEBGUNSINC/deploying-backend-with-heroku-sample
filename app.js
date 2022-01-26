const https = require('follow-redirects').https;
const fs = require('fs');

let options = {
  'method': 'GET',
  'hostname': 'api.turnto.com',
  'path': '/v1.2/reviews?sku=01_1020_04&includeRelated=false',
  'headers': {
    'Authorization': 'bearer AuXYdS7BiIkWTi1xiQfS6pbb2PUC47b2yEx',
    'Cookie': 'AWSALB=mxwKBInjbOVmDPCgVRV2krNOhmLerhUbzhWeAaezDCLFwEu27mgLy3+K61mL33k4CuB4Skvjd6nUUVNtVQpK4/EN0zy94kazhOetM1OTcQK9OPLe2N88PiIXogs8; AWSALBCORS=mxwKBInjbOVmDPCgVRV2krNOhmLerhUbzhWeAaezDCLFwEu27mgLy3+K61mL33k4CuB4Skvjd6nUUVNtVQpK4/EN0zy94kazhOetM1OTcQK9OPLe2N88PiIXogs8'
  },
  'maxRedirects': 20
};

const req = https.request(options, (res) => {
  let chunks = [];

  res.on("data", (chunk) => {
    chunks.push(chunk);
  });

  res.on("end", (chunk) => {
    let body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", (error) => {
    console.error(error);
  });
});

req.end();