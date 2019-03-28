import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/internal/Observable';
import { timer } from 'rxjs/internal/observable/timer';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { Tile } from 'src/app/model/tile';
import { AppBaseService } from 'src/app/service/app-base.service';
import { BaseComponent } from '../base-component';
import { AllowedOptions } from '../mine-sweeper/mine-sweeper.component';

@Component({
  selector: 'ed-base-puzzle',
  templateUrl: './base-puzzle.component.html',
  styleUrls: ['./base-puzzle.component.scss']
})
export class BasePuzzleComponent extends BaseComponent implements OnInit {

  @ViewChild('grid') grid: ElementRef;

  public math = Math;

  public timer$: Observable<number>;

  public gameInProgress: boolean = false;

  private dateStarted: Date;
  private dateEnded: Date;

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

  public get selectOptionCtrl(): FormControl {
    return <FormControl>this.form.get("selectOptionCtrl");
  }

  constructor(
    private appService: AppBaseService,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    super();

    this.form = fb.group({
      selectOptionCtrl: [this.currentOption, Validators.required],
    });

    this.subscriptions.push(
      this.selectOptionCtrl
        .valueChanges
        .subscribe(opt => this.handleLevelChange(opt))
    );
  }

  ngOnInit() {
    setTimeout(() => this.selectOptionCtrl
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

  public trackByTileId(index: number, tile: Tile): number {
    if (tile == undefined)
      return index;

    return tile.id;
  }


  public refresh(): void {
    this.handleLevelChange(this.selectOptionCtrl.value)
  }
  private resetTimer(): void {
    this.timer$ = timer(0, 1000);
  }

  private stopTimer(): void {
    this.gameInProgress = false;
  }

  private handleLevelChange(level: AllowedOptions): void {
    if (level == undefined)
      return;

    this.stopTimer();

    if (level == this.easyOption) {
      this.setSize(9, 9, 10);
    } else if (level == this.easyOption) {
      this.setSize(12, 12, 15);
    } else if (level == this.beginnerOption) {
      this.setSize(16, 12, 20);
    } else if (level == this.intermediateOption) {
      this.setSize(20, 12, 30);
    } else if (level == this.difficultOption) {
      this.setSize(25, 14, 50);
    } else if (level == this.advancedOption) {
      this.setSize(30, 16, 100);
    } else {
      this.setSize(35, 20, 150);
    }
  }


  private setSize(nbCols: number, nbRows: number, bombCount: number): void {
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

    if (this.grid == undefined)
      return;

    let maxtileWidth = this.grid.nativeElement.clientWidth / this.nbCols;
    let maxTileHeight = this.grid.nativeElement.clientHeight / this.nbRows;

    this.tileSide = Math.min(maxtileWidth, maxTileHeight);

    this.gridHeight = this.tileSide * this.nbRows;
    this.gridWidth = this.tileSide * this.nbCols;

    this.cd.detectChanges();
  }

  public clickTile(tile: Tile, evt: MouseEvent): boolean {
    if (evt != undefined) {
      evt.stopPropagation();
      return false;
    }
  }

}
