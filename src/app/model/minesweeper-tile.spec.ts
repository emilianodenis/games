import { MineSweeperTile, LevelDetected } from "./minesweeper-tile";


describe('MineSweeperTile', () => {

    let tile_1: MineSweeperTile;
    let tile_id: number = 0;

    beforeEach(() => {
        tile_1 = getBaseTile(tile_id);
    });

    it('creating a tile without values (except id) in constructor should keep values to default values and equal to properties', () => {
        expect(tile_1.id).toEqual(tile_id, "creating a basic tile must not alter its id");
        expect(tile_1.surroundingBombCount).toEqual(0, "creating a basic tile must set 'surroundingBombCount' to 0");
        expect(tile_1.hasBomb).toBeFalsy("creating a basic tile must set 'hasBomb' to false");
        expect(tile_1.isRevealed).toBeFalsy("creating a basic tile must set 'isRevealed' to false");
        expect(tile_1.currentDetectionLevel).toEqual(LevelDetected.none, "creating a basic tile must 'currentDetectionLevel' to LevelDetected.none");
        expect(tile_1.canDetect).toBeTruthy("creating a basic tile must set 'canDetect' to true");
    });

    it('creating a tile with values in constructor should keep values equal to properties', () => {
        const id: number = 15,
            hasBomb: boolean = true,
            currentDetectionLevel: LevelDetected = LevelDetected.flag,
            isRevealed: boolean = true,
            surroundingBombCount: number = 5;

        const result = new MineSweeperTile(id, hasBomb, currentDetectionLevel, isRevealed, surroundingBombCount);

        expect(result.id).toEqual(id, "creating a basic tile must not alter its id");
        expect(result.hasBomb).toEqual(hasBomb, "creating a basic tile must not alter its id");
        expect(result.currentDetectionLevel).toEqual(currentDetectionLevel, "creating a basic tile must not alter its id");
        expect(result.isRevealed).toEqual(isRevealed, "creating a basic tile must not alter its id");
        expect(result.surroundingBombCount).toEqual(surroundingBombCount, "creating a basic tile must not alter its id");
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

export function getBaseTile(id: number = 0): MineSweeperTile {
    return new MineSweeperTile(id);
}