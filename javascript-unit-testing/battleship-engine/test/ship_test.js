const expect = require('chai').expect;

describe('SHIP METHODS', () => {
    describe('checkForShip', () => {
        const checkForShip = require('../game_logic/ship_methods').checkForShip;
        var player;
        before(() => {
            player = {
                ships: [
                    {
                        locations: [
                            {x: 0, y: 0},
                            {x: 0, y: 1}
                        ]
                    },
                    {
                        locations: [
                            {x: 1, y: 0},
                            {x: 1, y: 1}
                        ]
                    },
                    {
                        locations: [
                            {x: 2, y: 0},
                            {x: 2, y: 1},
                            {x: 2, y: 2},
                            {x: 2, y: 3},
                        ]
                    },
                ]
            };
        });

        it(`should correctly report no ship at a given player's coordinate`, () => {
            expect(checkForShip(player, {x: 9, y: 9})).to.not.be.ok;
        });

        it(`should correctly report a ship at a given player's coordinate`, () => {
            expect(checkForShip(player, {x: 0, y: 0})).to.be.ok;
        });

        it(`should handle ships located at more than one coordinate`, () => {
            expect(checkForShip(player, {x: 9, y: 9})).to.not.be.ok;
            expect(checkForShip(player, {x: 0, y: 0})).to.be.ok;
            expect(checkForShip(player, {x: 0, y: 1})).to.be.ok;
        });

        it(`should handle checking multiple ships`, () => {
            expect(checkForShip(player, {x: 9, y: 9})).to.not.be.ok;
            expect(checkForShip(player, {x: 0, y: 0})).to.be.ok;
            expect(checkForShip(player, {x: 0, y: 1})).to.be.ok;
            expect(checkForShip(player, {x: 1, y: 0})).to.be.ok;
            expect(checkForShip(player, {x: 1, y: 1})).to.be.ok;
            expect(checkForShip(player, {x: 2, y: 3})).to.be.ok;
            
        });
    });

    describe('damageShip', () => {
        var damageShip = require('../game_logic/ship_methods').damageShip;

        it('should register damage on a given ship at a given location', () => {
            var ship = {
                locations: [{x: 0, y: 0}],
                damage: []
            }

            damageShip(ship, {x: 0, y: 0});
            expect(ship.damage).to.not.be.empty;
            expect(ship.damage[0]).to.deep.equal({x: 0, y: 0});
        });
    });

    describe('fire', () => {
        var fire = require('../game_logic/ship_methods').fire;
        var player;

        beforeEach(() => {
            player = {
                ships: [
                    {
                        locations: [{x: 0, y: 0}],
                        damage: []
                    }
                ]
            };
        });

        it('should record damage on the given player\'s ship at a given coordinate', () => {
            fire(player, {x: 0, y: 0});
            expect(player.ships[0].damage[0]).to.deep.equal({x: 0, y: 0});
        });

        it('should not record damage if there\'s no ship at a given coordinate', () => {
            fire(player, {x: 0, y: 1});
            expect(player.ships[0].damage).to.be.empty;
        });
    });
});