const http = require('superagent');
const HIPCHAT_URL = process.env.HIPCHAT_URL;
const HIPCHAT_AUTH_TOKEN = process.env.HIPCHAT_AUTH_TOKEN;

module.exports.message = (message, callback) => {
  http
    .post(HIPCHAT_URL)
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
      callback(err, res);
    });
};
