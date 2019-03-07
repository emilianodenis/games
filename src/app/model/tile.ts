import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable } from "rxjs/internal/Observable";

export enum LevelDetected {
    none = 0,
    flag = 1,
    unknown = 2
}
export class Tile {

    public surroundingBombCount: number = 0;

    private _icon: BehaviorSubject<string> = new BehaviorSubject(undefined);
    private _icon$ = this._icon.asObservable();
    get icon$(): Observable<string> {
        return this._icon$;
    }

    private _iconColor: BehaviorSubject<string> = new BehaviorSubject("white");
    private _iconColor$ = this._iconColor.asObservable();
    get iconColor$(): Observable<string> {
        return this._iconColor$;
    }

    private _hasBomb: boolean = false;
    public get hasBomb(): boolean {
        return this._hasBomb;
    }
    private _hasBombSubject: BehaviorSubject<boolean> = new BehaviorSubject(this._hasBomb);

    private _hasBomb$ = this._hasBombSubject.asObservable();
    get hasBomb$(): Observable<boolean> {
        return this._hasBomb$;
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
        this._hasBombSubject.next(this._hasBomb);
    }

    public reveal(): void {
        if (this.isRevealed)
            return;

        this.isRevealed = true;
        if (this.hasBomb) {
            this._icon.next("filter_tilt_shift");
            this._iconColor.next("red");
        } else if (this.surroundingBombCount) {
            this._icon.next(`filter_${this.surroundingBombCount}`);
            this._iconColor.next("white");
        } else {
            this._icon.next("filter_none");
        }
    }

    public detect(): void {
        if (this.isRevealed)
            return;

        this._currentDetectionLevel = (this._currentDetectionLevel + 1) % 3;
        this.handleIcon(this._currentDetectionLevel);
    }

    private handleIcon(level: LevelDetected): void {
        this._icon.next(level == LevelDetected.none ? "" :
            level == LevelDetected.flag ? "flag"
                : "device_unknown");
        this._iconColor.next("burlywood");

        //"filter_tilt_shift"
    }
}