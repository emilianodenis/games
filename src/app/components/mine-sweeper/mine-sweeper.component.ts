import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { timer } from 'rxjs/internal/observable/timer';
import { debounceTime } from 'rxjs/operators';
import { BaseComponent } from 'src/app/components/base-component';
import { Tile } from 'src/app/model/tile';
import { AppBaseService } from 'src/app/service/app-base.service';


export type AllowedOptions = "Easy" | "Beginner" | "Intermediate" | "Difficult" | "Advanced" | "Custom";

@Component({
  selector: 'ed-mine-sweeper',
  templateUrl: './mine-sweeper.component.html',
  styleUrls: ['./mine-sweeper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MineSweeperComponent extends BaseComponent implements OnInit {

  @ViewChild('grid') grid: ElementRef;

  private static MineSweeperTimerKey = "MineSweeperTimerKey";

  public math = Math;

  public timer$: Observable<number>;

  public gameInProgress: boolean = false;

  private easyOption: AllowedOptions = "Easy";
  private beginnerOption: AllowedOptions = "Beginner";
  private intermediateOption: AllowedOptions = "Intermediate";
  private difficultOption: AllowedOptions = "Difficult";
  private advancedOption: AllowedOptions = "Advanced";
  private customOption: AllowedOptions = "Custom";

  public allowedOptions: Array<AllowedOptions> = [
    this.easyOption,
    this.beginnerOption,
    this.intermediateOption,
    this.difficultOption,
    this.advancedOption,
    this.customOption,
  ];

  public currentOption: AllowedOptions;// = this.easyOption;

  public form: FormGroup;

  public nbCols: number;
  public nbRows: number;
  public rowHeight: string = "10%";
  public tileSide: number;
  public gridWidth: number;
  public gridHeight: number;

  public tiles: Array<Tile>;

  public seconds: number = 0;

  constructor(
    private appService: AppBaseService,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
  ) {
    super();

    this.form = fb.group({
      selectedOption: [this.currentOption, Validators.required],
    });

    this.subscriptions.push(
      this.form
        .get("selectedOption")
        .valueChanges
        .subscribe(opt => this.handleLevelChange(opt))
    );
  }

  ngOnInit() {
    setTimeout(() => this.form
      .get("selectedOption")
      .setValue(this.easyOption), 0);
    this.subscriptions
      .push(
        this.appService
          .windowResized$
          .pipe(debounceTime(25))
          .subscribe(evt => {
            this.manageDimensions();
          }
          )
      );
  }

  private resetTimer(): void {
    this.timer$ = timer(0, 1000);
    // this.addSubcription(MineSweeperComponent.MineSweeperTimerKey,
    //   this.timer$.subscribe(n => console.log(n)));
  }

  private stopTimer(): void {
    // this.removeSubscription(MineSweeperComponent.MineSweeperTimerKey);
    this.gameInProgress = false;
  }

  private handleLevelChange(level: AllowedOptions): void {
    if (level == undefined)
      return;

    this.stopTimer();

    if (level == this.easyOption) {
      this.setSize(9, 9);
    } else if (level == this.easyOption) {
      this.setSize(12, 12);
    } else if (level == this.beginnerOption) {
      this.setSize(16, 12);
    } else if (level == this.intermediateOption) {
      this.setSize(20, 12);
    } else if (level == this.difficultOption) {
      this.setSize(25, 14);
    } else if (level == this.advancedOption) {
      this.setSize(30, 16);
    } else {
      this.setSize(35, 20);
    }
  }

  private setSize(nbCols: number, nbRows: number): void {
    this.setCols(nbCols);
    this.setRows(nbRows);

    this.generateTiles(nbCols, nbRows);

    this.manageDimensions();
  }

  private generateTiles(nbCols: number, nbRows: number): void {

    let tiles = [];
    for (let i = 0; i < nbRows; i++) {

      for (let j = 0; j < nbCols; j++) {
        tiles.push(new Tile(i * nbCols + j));
      }

    }

    this.tiles = tiles;
  }

  private setRows(nbRows: number): void {
    this.nbRows = nbRows;
    this.rowHeight = `${(100 / nbRows).toFixed(4)}%`;
  }

  private setCols(nbCols: number): void {
    this.nbCols = nbCols;
  }

  private manageDimensions(): void {

    let maxtileWidth = this.grid.nativeElement.clientWidth / this.nbCols;
    let maxTileHeight = this.grid.nativeElement.clientHeight / this.nbRows;

    this.tileSide = Math.min(maxtileWidth, maxTileHeight);

    this.gridHeight = this.tileSide * this.nbRows;
    this.gridWidth = this.tileSide * this.nbCols;

    this.cd.detectChanges();
  }

  public clickTile(tile: Tile): void {
    if (!this.gameInProgress) {
      this.gameInProgress = true;
      this.resetTimer();
    }
    console.log(tile);
  }

}
