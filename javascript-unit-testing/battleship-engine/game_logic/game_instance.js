const fire = require('./ship_methods.js').fire;

const checkGameStatus = (players) => {
    return false;
}

const takeTurn = (opposingPlayer, guessFunction) => {
    const coordinates = guessFunction;
    fire(opposingPlayer, coordinates);
    const gameOver = checkGameStatus();

    return gameOver;
}

module.exports.checkGameStatus = checkGameStatus;
module.exports.takeTurn = takeTurn;