import { MineSweeperTile } from "./minesweeper-tile";


describe('MineSweeperTile', () => {

    let tile_1: MineSweeperTile;

    beforeEach(() => {
        tile_1 = getBaseTile();
    });

    it('creating a tile with values (or not) in constructor should keep values equal to properties', () => {
        pending();
    });

    it('setting bomb to true creates a new tile, change "hasBomb" but not other properties', () => {
        const result = tile_1.setBomb(true);

        expect(result.hasBomb).toBeTruthy("put a bomb in a tile should set hasBomb to true");

        expect(tile_1 === result).toBeFalsy("put a bomb in a tile should create a new tile");
        expect(tile_1.id).toEqual(result.id, "put a bomb in a tile should not change the id");
        expect(tile_1.surroundingBombCount).toEqual(result.surroundingBombCount, "put a bomb in a tile should not change the surroundingBombCount");
        expect(tile_1.isRevealed).toEqual(result.isRevealed, "put a bomb in a tile should not change the isRevealed");
        expect(tile_1.currentDetectionLevel).toEqual(result.currentDetectionLevel, "put a bomb in a tile should not change the currentDetectionLevel");
        expect(tile_1.canReveal).toEqual(result.canReveal, "put a bomb in a tile should not change the canReveal");
        expect(tile_1.canDetect).toEqual(result.canDetect, "put a bomb in a tile should not change the canDetect");
    });

    it('setting bomb to false creates a new tile', () => {
        const result = tile_1.setBomb(false);

        expect(result.hasBomb).toBeFalsy("put a bomb to false in a tile should set hasBomb to false");

        expect(tile_1 === result).toBeFalsy("put a bomb in a tile should create a new tile");
        expect(tile_1.id).toEqual(result.id, "put a bomb in a tile should not change the id");
        expect(tile_1.surroundingBombCount).toEqual(result.surroundingBombCount, "put a bomb in a tile should not change the surroundingBombCount");
        expect(tile_1.isRevealed).toEqual(result.isRevealed, "put a bomb in a tile should not change the isRevealed");
        expect(tile_1.currentDetectionLevel).toEqual(result.currentDetectionLevel, "put a bomb in a tile should not change the currentDetectionLevel");
        expect(tile_1.canReveal).toEqual(result.canReveal, "put a bomb in a tile should not change the canReveal");
        expect(tile_1.canDetect).toEqual(result.canDetect, "put a bomb in a tile should not change the canDetect");
    });

    it('revealing a tile creates a new tile', () => {
        const result = tile_1.reveal();

        expect(tile_1 === result).toBeFalsy();

        expect(result.isRevealed).toBeTruthy("revealing a tile should change the property 'isRevealed' to true");
        expect(result.canReveal).toBeFalsy("revealing a tile should change the property 'isRevecanRevealaled' to true if levelDetected is none");
        expect(result.canDetect).toBeFalsy("revealing a tile should change the property 'canDetect' to false");

        expect(tile_1.id).toEqual(result.id, "put a bomb in a tile should not change the id");
        expect(tile_1.surroundingBombCount).toEqual(result.surroundingBombCount, "put a bomb in a tile should not change the surroundingBombCount");
        expect(tile_1.hasBomb).toEqual(result.hasBomb, "put a bomb in a tile should not change the hasBomb");
        expect(tile_1.currentDetectionLevel).toEqual(result.currentDetectionLevel, "put a bomb in a tile should not change the currentDetectionLevel");
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