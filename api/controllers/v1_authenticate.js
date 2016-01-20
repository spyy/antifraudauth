'use strict';
var uuid = require('node-uuid');
var util = require('util');
var randomstring = require('randomstring');
var redisreader = require('../helpers/redisreader');
var rediswriter = require('../helpers/rediswriter');

function fetchFraudScore(params) {
  // TODO: add redis cache (LRU strategy most likely)
  return new Promise(function(resolve, reject) {
    resolve({
        score: 5,
        coverage: 'KYC+MAXIMUM'
      });
  });
}

function getMultiplierForFraudScore(fraudScore) {
  var easiestMultiplier = 100;
  if(fraudScore >= 0 && fraudScore < 10) {
    return easiestMultiplier;
  }
  if(fraudScore >= 10 && fraudScore < 20) {
    return easiestMultiplier * 10;
  }
  if(fraudScore >= 20 && fraudScore < 30) {
    return easiestMultiplier * 100;
  }
  if(fraudScore >= 30 && fraudScore < 40) {
    return easiestMultiplier * 1000;
  }
  if(fraudScore >= 40 && fraudScore < 50) {
    return easiestMultiplier * 10000;
  }
  if(fraudScore >= 50 && fraudScore < 60) {
    return easiestMultiplier * 100000;
  }
  if(fraudScore >= 60 && fraudScore < 70) {
    return easiestMultiplier * 100000;
  }
  if(fraudScore >= 80 && fraudScore < 90) {
    return easiestMultiplier * 1000000;
  }
  if(fraudScore >= 90 || fraudScore < 0) {
    return easiestMultiplier * 10000000;
  }
  return easiestMultiplier * 10000000;
}

function getMultiplierForCoverage(coverage) {
  var easiestMultiplier = 1000;
  var multiplier;
  switch(coverage) {
    case 'MINIMAL':
      multiplier = easiestMultiplier * 1000000;
      break;
    case 'LOW':
      multiplier = easiestMultiplier * 100000;
      break;
    case 'MEDIUM':
      multiplier = easiestMultiplier * 10000;
      break;
    case 'HIGH':
      multiplier = easiestMultiplier * 1000;
      break;
    case 'MAXIMUM':
      multiplier = easiestMultiplier * 100;
      break;
    case 'KYC+MAXIMUM':
      multiplier = easiestMultiplier;
      break;
    default:
      multiplier = easiestMultiplier * 1000000;
      break;
  }
  return multiplier;
}

function getIterations(fraudScore) {
  return 1 * getMultiplierForFraudScore(fraudScore.score) * getMultiplierForCoverage(fraudScore.coverage);
}

function determineChallenge(fraudScore) {
  return new Promise(function(resolve, reject) {
    resolve({
      iterations: getIterations(fraudScore),
      algorithm: 'PBKDF2',
      value: randomstring.generate(128)
    });
  });
}

function get(req, res) {
  var params = {
    uuid: uuid.v4(),
    domain: req.swagger.params.domain.value,
    ipAddress: req.swagger.params.ipAddress.value,
    userId: req.swagger.params.userId.value,
    deviceId: req.swagger.params.deviceId.value
  };

  fetchFraudScore(params)
    .then(determineChallenge)
    .then(function(challenge) {
      res.json({
        'uuid': params.uuid,
        'value': challenge.value,
        'algorithm': challenge.algorithm,
        'iterations': challenge.iterations
      });
    });
}

function post(req, res) {
  res.json({});
}

module.exports = {
  get: get,
  post: post
};

