import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable } from "rxjs/internal/Observable";

export enum LevelDetected {
    none = 0,
    flag = 1,
    unknown = 2
}

export class Tile {

    public surroundingBombCount: number = 0;

    public _hasBomb: boolean = false;
    public get hasBomb(): boolean {
        return this._hasBomb;
    }

    private _currentDetectionLevel = LevelDetected.none;
    public get currentDetectionLevel(): LevelDetected {
        return this._currentDetectionLevel;
    }

    public get canReveal(): boolean {
        return this.isRevealed == false && this.currentDetectionLevel == LevelDetected.none;
    }

    public get canDetect(): boolean {
        return this.isRevealed == false;
    }

    public isRevealed: boolean = false;

    constructor(
        public id: number,
    ) {

    }

    public setBomb(hasBomb: boolean): void {
        this._hasBomb = hasBomb;
    }

    public setSurroundingBombCount(bombCount: number): Tile {
        let tile = new Tile(this.id);
        Object.assign(tile, this);
        Object.assign(tile, { _surroundingBombCount: bombCount });
        return this;
    }

    public reveal(): Tile {
        if (this.isRevealed)
            return this;

        let tile = new Tile(this.id);
        Object.assign(tile, this);
        Object.assign(tile, { isRevealed: true, _currentDetectionLevel: LevelDetected.none });
        return tile;
    }

    public detect(): Tile {
        if (this.isRevealed)
            return this;

        let detectionLevel = (this._currentDetectionLevel + 1) % 3;

        let tile = new Tile(this.id);
        Object.assign(tile, this);
        Object.assign(tile, { _currentDetectionLevel: detectionLevel });
        return tile;

    }
}