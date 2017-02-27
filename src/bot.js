'use strict';

const _ = require('lodash');
const http = require('superagent');
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const HIPCHAT_AUTH_TOKEN = process.env.HIPCHAT_AUTH_TOKEN;



module.exports.hello = (event, context, callback) => {
  const usersName = _.get(event, 'queryStringParameters.name', undefined);
  const points = _.get(event, 'queryStringParameters.points', undefined);
  const message = _.trim(`User:${usersName} gets ${points}points`);
  const requestHasInsufficientInfo = usersName === undefined || points === undefined;

  if (requestHasInsufficientInfo) {
    const message = 'Error 3458gdxh: Your request is missing required info';
    console.warn(message);
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        message: message
      })
    });
  }

  http
    .post('https://h34t.hipchat.com/v2/room/3622915/notification')
    .query({
      'auth_token': HIPCHAT_AUTH_TOKEN
    })
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send({
      'color': 'green',
      'message': message,
      'notify': false,
      'message_format': 'text'
    })
    .end(function(err, res) {
      const response = {
        statusCode: err ? 500 : 200,
        body: JSON.stringify({
          message: message,
          err: err,
          res: res,
        }),
      };

      var params = {
        TableName: 'Persons',
        Item: {
          'PersonID': usersName.toLowerCase(),
          'points': points,
        }
      };

      dynamo.put(params, function(err, res) {
        if (err) {
          console.error(err);
        } else {
          console.log(res);
        }
        callback(null, response);
      });
    });
};
