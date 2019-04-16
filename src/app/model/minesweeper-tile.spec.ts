import { MineSweeperTile } from "./minesweeper-tile";


describe('MineSweeperTile', () => {

    let tile_1: MineSweeperTile;

    beforeEach(() => {
        tile_1 = getBaseTile();
    });

    it('setting bomb to true creates a new tile', () => {
        const result = tile_1.setBomb(true);

        expect(tile_1 === result).toBeFalsy();
    });

    it('setting bomb to false creates a new tile', () => {
        const result = tile_1.setBomb(false);

        expect(tile_1 === result).toBeFalsy();
    });

    it('revealing a tile creates a new tile', () => {
        const result = tile_1.reveal();

        expect(tile_1 === result).toBeFalsy();
    });

    it('revealing a revealed tile returns itself', () => {
        const tile_2 = tile_1.reveal();
        const result = tile_2.reveal();

        expect(result).toEqual(tile_2);
    });

    // it('I want a test to fail', () => {
    //     fail();
    // })


});

export function getBaseTile(): MineSweeperTile {
    return new MineSweeperTile(0);
}