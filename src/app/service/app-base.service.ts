import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { fromEvent } from "rxjs";

@Injectable()
export class AppBaseService {

  private _windowResized$: Observable<Event>;
  get windowResized$(): Observable<Event> {
    return this._windowResized$;
  }

  constructor() {
    this._windowResized$ = fromEvent(window, "resize");
  }
}