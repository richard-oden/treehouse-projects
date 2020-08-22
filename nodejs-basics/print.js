//Print error message
function printError(error) {
  console.error(`Oops, there was a problem: "${error.message}"`);
}

// Print message to console:
function printMessage(username, badgeCount, points, topic) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points in ${topic}`;
  console.log(message);
}

module.exports.err = printError;
module.exports.msg = printMessage;