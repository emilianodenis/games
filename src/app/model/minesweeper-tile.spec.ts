import { MineSweeperTile } from "./minesweeper-tile";


describe('MineSweeperTile', () => {

    it('setting bomb to true creates a new instance', () => {
        const tile_1 = new MineSweeperTile(1, false, 0, false, 0);
        const result = tile_1.setBomb(true);

        expect(tile_1 === result).toBeFalsy();
    })

    it('setting bomb to false creates a new instance', () => {
        const tile_1 = new MineSweeperTile(1, false, 0, false, 0);
        const result = tile_1.setBomb(false);

        expect(tile_1 === result).toBeFalsy();
    })

    // it('I want a test to fail', () => {
    //     fail();
    // })


});