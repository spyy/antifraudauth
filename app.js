'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT;
  //var hostname = 'ec2-52-48-82-134.eu-west-1.compute.amazonaws.com';
  var hostname = '52.48.82.134';
  app.listen(hostname,port);

});
