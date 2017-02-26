'use strict';

const _ = require('lodash');

module.exports.hello = (event, context, callback) => {
  const usersName = _.get(event, 'queryStringParameters.name', '');
  const message = _.trim(`Hi ${usersName}`);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: message,
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
