'use strict';

const _ = require('lodash');
const http = require('superagent');

module.exports.hello = (event, context, callback) => {
  const usersName = _.get(event, 'queryStringParameters.name', '');
  const message = _.trim(`Hi ${usersName}`);

  http
    .post('https://h34t.hipchat.com/v2/room/3622915/notification')
    .query({'auth_token': 'XXXXXX'})
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send({
      'color':'green',
      'message':'My first notification (yey)',
      'notify':false,
      'message_format':'text'
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

      callback(null, response);
    });



  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
