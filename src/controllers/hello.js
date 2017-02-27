const HipChat = require('../models/HipChat');

module.exports.hello = (callback) => {
  HipChat.message('Saying hi from SG Bot', (err, res) =>{
    console.log('process.env');
    callback(process.env, res);
  });
};
