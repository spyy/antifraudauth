'use strict';

var https = require('https');




function post(request, response) {
  var postData = JSON.stringify({
    'user': 'user1', 
    'server': 'eesee.io', 
    'password': 'user1'
    
  });
  var options = { 
    hostname: 'eesee0-test.m.in-app.io',
    port: 5281, 
    path: '/api/delete_account',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length
    }
  };  

  var saasRequest = https.request(options, function(saasResponse) {
    
    console.log('statusCode: ', saasResponse.statusCode);
    console.log('headers: ', saasResponse.headers);
    
    var body = ''; 

    saasResponse.on('data', function(chunk) {
      console.log('saasResponse.on: data');
      body += chunk;
    }); 

    saasResponse.on('end', function() {
      console.log('saasResponse.on: end');
      response.statusCode = saasResponse.statusCode;
      response.setHeader('Content-Type', 'application/json');
      response.end(body);
    });
    
  });
  
  saasRequest.write(postData);
  saasRequest.end();
  
  saasRequest.on('error', function(e) {
    console.error(e);
  });
}


module.exports = {
  post: post
};

