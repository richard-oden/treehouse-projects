var expect = require('chai').expect;

describe('GAME INSTANCE FUNCTIONS', () => {
    describe('checkGameStatus', () => {
        const checkGameStatus = require('../game_logic/game_instance').checkGameStatus;

        it('should tell me when the game is over', () => {
            const players = [
                {
                    ships: [
                        {
                            locations: [{x: 0, y: 0}],
                            damage: [{x: 0, y: 0}]
                        }
                    ]
                }
            ];

            var actual = checkGameStatus(players);
            expect(actual).to.be.false;
        });
    });

    describe('takeTurn', () => {
        const takeTurn = require('../game_logic/game_instance').takeTurn;
        let guess, player;

        beforeEach(() => {
            guess = () => { return {x: 0, y: 0} };
            player = {
                ships: [
                    {
                        locations: [{x: 0, y: 0}],
                        damage: []
                    }
                ]
            }
        });

        it('should return false if the game ends', () => {
            var actual = takeTurn(player, guess);
            expect(actual).to.be.false;
        });
    });

    const saveGame = callback => {
        setTimeout(() => {
            callback();
        }, 1000);
    }

    describe('saveGame', () => {
        it('should update save status', (done) => {
            let status = 'Game not saved.';
            
            saveGame(() => {
                status = 'Game saved.'
                expect(status).to.equal('Game saved.');
                done();
            });
        });
    });
});