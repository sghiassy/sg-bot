const http = require('superagent');
const HIPCHAT_AUTH_TOKEN = process.env.HIPCHAT_AUTH_TOKEN;

module.exports.message = (message, callback) => {
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

      callback(null, response);
    });
};
