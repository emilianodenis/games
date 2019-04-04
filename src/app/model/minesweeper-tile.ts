
export enum LevelDetected {
    none = 0,
    flag = 1,
    unknown = 2
}

export class MineSweeperTile {

    public get id(): number {
        return this._id;
    }

    public get surroundingBombCount(): number {
        return this._surroundingBombCount;
    }

    public get hasBomb(): boolean {
        return this._hasBomb;
    }
    public get isRevealed(): boolean {
        return this._isRevealed;
    }

    public get currentDetectionLevel(): LevelDetected {
        return this._currentDetectionLevel;
    }

    public get canReveal(): boolean {
        return this.isRevealed == false && this.currentDetectionLevel == LevelDetected.none;
    }

    public get canDetect(): boolean {
        return this.isRevealed == false;
    }

    constructor(
        private readonly _id: number,
        private readonly _hasBomb: boolean = false,
        private readonly _currentDetectionLevel: number = LevelDetected.none,
        private readonly _isRevealed: boolean = false,
        private readonly _surroundingBombCount: number = 0,
    ) {

    }

    public setBomb(hasBomb: boolean): MineSweeperTile {
        return new MineSweeperTile(this.id, hasBomb, this.currentDetectionLevel, this.isRevealed, this.surroundingBombCount);
    }

    public setSurroundingBombCount(bombCount: number): MineSweeperTile {
        return new MineSweeperTile(this.id, this.hasBomb, this.currentDetectionLevel, this.isRevealed, bombCount);
    }

    public reveal(): MineSweeperTile {
        if (this.isRevealed)
            return this;

        return new MineSweeperTile(this.id, this.hasBomb, this.currentDetectionLevel, true, this.surroundingBombCount);
    }

    public unHide(): MineSweeperTile {
        if (this.isRevealed && this.hasBomb == false)
            return this;

        return new MineSweeperTile(this.id, this.hasBomb, LevelDetected.none, true, this.surroundingBombCount);
    }

    public detect(): MineSweeperTile {
        if (this.isRevealed)
            return this;

        return new MineSweeperTile(this.id, this.hasBomb, (this._currentDetectionLevel + 1) % 3, this.isRevealed, this.surroundingBombCount);
    }
}