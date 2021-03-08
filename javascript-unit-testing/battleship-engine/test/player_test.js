var expect = require('chai').expect;

describe('PLAYER METHODS', () => {
  describe('validateEmptyLocation', () => {
    var validateEmptyLocation = require('../game_logic/player_methods.js').validateLocation;
    var player;

    beforeEach(() => {
      player = {
        ships: [
          {
            locations: [{x: 9, y: 9}]
          }
        ]
      };
    });

    it('shoud confirm valid for unoccupied locations in range', () => {
      var location = {x: 0, y: 0};
      var actual = validateEmptyLocation(player, location);

      expect(actual).to.be.ok;
    });

    it('shoud confirm INvalid for occupied locations in range', () => {
      var location = {x: 9, y: 9};
      var actual = validateEmptyLocation(player, location);

      expect(actual).to.be.false;
    });

    it('shoud confirm INvalid for UNoccupied locations OUT of range', () => {
      var locationHigh = {x: 10, y: 10};
      var locationLow = {x: -1, y: -1};

      expect(validateEmptyLocation(player, locationHigh)).to.be.false;
      expect(validateEmptyLocation(player, locationLow)).to.be.false;
    });
  });

  describe('validateEmptyLocations', () => {
    var validateEmptyLocations = require('../game_logic/player_methods.js').validateLocations;
    var player;

    beforeEach(() => {
      player = {
        ships: [
          {
            locations: [{x: 0, y: 0}]
          }
        ]
      };
    });

    it('should correctly report a list of unoccupied locations is valid', () => {
      var locations = [{x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}, {x: 1, y: 4}];
      expect(validateEmptyLocations(player, locations)).to.be.ok;
    });

    it('should correctly report a a problem if any location in the list is invalid', () => {
      var locations = [{x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}, {x: 10, y: 10}];
      expect(validateEmptyLocations(player, locations)).to.be.false;

      locations = [{x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}, {x: 0, y: 0}];
      expect(validateEmptyLocations(player, locations)).to.be.false;
    });
  });

  describe('placeShip', () => {
    var placeShip = require('../game_logic/player_methods.js').placeShip;
    var player;

    beforeEach(() => {
      player = {
        ships: [
          {
            size: 1,
            locations: []
          },
          {
            size: 2,
            locations: [{x: 1, y: 0}, {x: 1, y: 1}]
          }
        ]
      };
    });

    it('should update a ship with a valid starting location', () => {
      var ship = player.ships[0];
      var coordinates = {x: 0, y: 1};

      placeShip(player, ship, coordinates, 'horizontal');
      var actual = ship.locations;

      expect(actual).to.be.ok;
      expect(actual).to.have.length(1);
      expect(actual[0]).to.deep.equal({x: 0, y: 1});
    });

    it('should throw an error if no direction is specified', () => {
        var ship = player.ships[0];
        var coordinates = {x: 0, y: 1};
        const handler = () => placeShip(player, ship, coordinates);

        expect(handler).to.throw(Error);
    });
  });
});