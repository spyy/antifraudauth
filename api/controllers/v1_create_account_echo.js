'use strict';

var https = require('https');



function post(request, response) {
  var userDetails = request.swagger.params.V1UserDetails.value;
  var body = JSON.stringify(userDetails);
  response.setHeader('Content-Type', 'application/json');
  response.end(body);
  
  
  //response.json({ user: 'USER', server: 'DOMAIN', password: 'PASS' });
}


module.exports = {
  post: post
};

