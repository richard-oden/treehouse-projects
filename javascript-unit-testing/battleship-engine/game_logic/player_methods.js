const checkForShip = require('./ship_methods.js').checkForShip;
const fire = require('./ship_methods.js').fire;

const validateEmptyLocation = (player, coords) => {
    return (coords.x <= 9 && coords.x >= 0) && 
        (coords.y <= 9 && coords.y >= 0) && 
        !checkForShip(player, coords);
}

const validateEmptyLocations = (player, locations) => {
    const validated = locations.map(location => {
        return validateEmptyLocation(player, location);
    });
    return validated.indexOf(false) === -1;
}

const placeShip = (player, ship, startingCoords, direction) => {
    if (!(direction.toLowerCase() === 'vertical' || 
          direction.toLowerCase() === 'horizontal'))
        throw new Error('Invalid direction! Must be horizontal or vertical.');

    let proposedLocations = [];
    let previousLocation,
        rowNumber,
        columnNumber;

    for (let i = 0; i < ship.size; i++) {
        previousLocation = proposedLocations[i - 1] || [];
        rowNumber = previousLocation.x;
        columnNumber = previousLocation.y;
        
        proposedLocations[i] = (i === 0)
        ? startingCoords
        : (direction.toLowerCase() === 'horizontal')
            ? [rowNumber, ++columnNumber]
            : [++rowNumber, columnNumber];
    }
    
    if (validateEmptyLocations(player, proposedLocations)) {
        ship.locations = proposedLocations;
    } else {
        return false;
    }
}

// COMPUTER METHODS ============================================= //

const getRandomCoordinates = () => {
    const x = Math.floor(Math.random() * 9);
    const y = Math.floor(Math.random() * 9);
    return {x: x, y: y};
};

const getRandomDirection = () => {
    return Math.random() > 0.5 ? 'horizontal' : 'vertical';
};

module.exports = {
    placeShip: placeShip,
    validateLocations: validateEmptyLocations,
    validateLocation: validateEmptyLocation,
    getRandomCoordinates: getRandomCoordinates,
    getRandomDirection: getRandomDirection
};