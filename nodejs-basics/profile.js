// Require https module:
const https = require('https');

// Require http module for status codes:
const http = require('http');

// Require print module:
const print = require('./print');

function get(username, topic) {
  try {
    // Connect to the API URL(https://teamtreehouse.com/username.json)
    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
      if (response.statusCode === 200) {
        let body = "";
        // Read the data
        response.on('data', data => {
          body += data.toString();
        });
        
        response.on('end', () => {
          try {
            // Parse data:
            const profile = JSON.parse(body);
            // Print data:
            print.msg(username, profile.badges.length, profile.points[topic], topic); 
          } catch (error) {
            print.err(error);
          }
        });
      } else {
        const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
        const statusCodeError = new Error(message);
        print.err(statusCodeError);
      }
    });
    request.on('error', print.err);
  } catch (error) {
    print.err(error);
  }
}

module.exports.get = get;