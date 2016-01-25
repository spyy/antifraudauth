'use strict';

var https = require('https');


function post(request, response) {
  var userDetails = request.swagger.params.V1UserDetails.value;
  var body = JSON.stringify(userDetails);
  var options = { 
    hostname: 'eesee0-test.m.in-app.io',
    port: 5281, 
    path: '/api/create_account',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': body.length
    }
  };  

  var saasRequest = https.request(options, function(saasResponse) {
    console.log('statusCode: ', saasResponse.statusCode);
    
    var body = ''; 

    saasResponse.on('data', function(chunk) {
      body += chunk;
    }); 

    saasResponse.on('end', function() {
      response.setHeader('Content-Type', 'application/json');
      response.end(body);
    });
    
  });
  
  saasRequest.end(body);
  
  saasRequest.on('error', function(e) {
    console.error(e);
  });
}


module.exports = {
  post: post
};

