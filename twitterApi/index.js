var Twitter = require('twit');
var config = require('../config.js');
var T = new Twitter(config);

var Promise  = require('promise');

class twitterAPIs {
  constructor () {

  }

  static getTweets (params) {
    return new Promise(function(resolve, reject){
      T.get('statuses/user_timeline', params, function(err, data, response) {
        if(!err){
          resolve(data);
        } else {
          console.log(err);
          reject(err);
        }
      });
    });
  }

}



module.exports = twitterAPIs;