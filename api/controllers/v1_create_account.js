'use strict';
var uuid = require('node-uuid');
var util = require('util');
var randomstring = require('randomstring');
var redisreader = require('../helpers/redisreader');
var rediswriter = require('../helpers/rediswriter');
var https = require('https');


function post3(req, res) {
  /*
  var response = {
    user: req.swagger.params.user.value,
    server: req.swagger.params.server.value,
    password: req.swagger.params.password.value
  };
  */
  //console.log(JSON.stringify(response));
  
  console.log(req.headers);
  
  console.log(req.swagger.body.user.value);
  
  res.json({'user': 'USER', 'server': 'DOMAIN', 'password': 'PASS'});
  
  /*
  req.on('data', function(chunk) {
    console.log('got %d bytes of data', chunk.length);
  });
  
  req.on('end', function() {
    console.log('there will be no more data.');
    
    res.json({"user": "USER", "server": "DOMAIN", "password": "PASS"});
  });
  
  */
  
  //res.json(JSON.stringify(response));
}





function post(req, res) {
  
  var userDetails = req.swagger.params.V1UserDetails.value;
  
  
  console.log(userDetails);
  
  res.json({'user': 'USER', 'server': 'DOMAIN', 'password': 'PASS'});
}







function post2(req, res) {
  var postData = JSON.stringify({
    'user': 'user1', 
    'server': 'eesee.io', 
    'password': 'user1'
    
  });
  var options = { 
    hostname: 'eesee0-test.m.in-app.io',
    port: 5281, 
    path: '/api/create_account',
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
        body += chunk;
    }); 

    saasResponse.on('end', function() {
        res.writeHead(saasResponse.statusCode, saasResponse.headers);
        res.end(body);
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

