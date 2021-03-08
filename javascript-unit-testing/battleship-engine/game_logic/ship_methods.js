const checkForShip = (player, coords) => {
    return player.ships.find(ship => {
        return ship.locations.some(location => {
            return location.x === coords.x
                && location.y === coords.y;
        });
    });
};

const damageShip = (ship, coords) => {
    ship.damage.push(coords);
};

const fire = (player, coords) => {
    const ship = checkForShip(player, coords);
    if (ship) {
        damageShip(ship, coords);
        console.log('Hit!');
    } else {
        console.log('Miss!');
    }
};

module.exports = {
    checkForShip: checkForShip,
    damageShip: damageShip,
    fire: fire
};