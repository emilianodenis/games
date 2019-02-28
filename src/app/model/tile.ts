import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable } from "rxjs/internal/Observable";


export class Tile {

    private _hasBomb: BehaviorSubject<boolean> = new BehaviorSubject(false);

    private _hasBomb$ = this._hasBomb.asObservable();
    get hasBomb$(): Observable<boolean> {
        return this._hasBomb$;
    }

    constructor(
        public id: number,
    ) {
    }

    public setBomb(hasBomb: boolean): void {
        this._hasBomb.next(hasBomb);
    }
}