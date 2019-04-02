import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/internal/Observable';
import { timer } from 'rxjs/internal/observable/timer';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { BaseTile } from 'src/app/model/base-tile';
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

  public emptyTile: BaseTile = new BaseTile();
  public tiles: Array<BaseTile>;
  public clickableTiles: Array<BaseTile> = [];

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

  // public trackByTileId(index: number, tile: MinesweeperTile): number {
  //   if (tile == undefined)
  //     return index;

  //   return tile.id;
  // }


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
      this.setSize(3, 3);
    } else if (level == this.beginnerOption) {
      this.setSize(4, 4);
    } else if (level == this.intermediateOption) {
      this.setSize(5, 5);
    } else if (level == this.difficultOption) {
      this.setSize(6, 5);
    } else if (level == this.advancedOption) {
      this.setSize(6, 6);
    } else {
      this.setSize(7, 7);
    }
  }


  private setSize(nbCols: number, nbRows: number): void {
    this.setCols(nbCols);
    this.setRows(nbRows);

    this.generateTiles(nbCols, nbRows);

    this.manageDimensions();
  }

  private generateTiles(nbCols: number, nbRows: number): void {

    let tileCount = nbCols * nbRows - 1;

    let tiles = [];
    for (let i = 0; i < tileCount; i++) {
      tiles.push(new BaseTile(i + 1));
    }
    tiles.push(this.emptyTile)

    this.tiles = tiles;

    this.clickableTiles = this.getClickableTiles();
    this.shuffleTiles(this.selectOptionCtrl.value);
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

  public clickTile(tile: BaseTile, evt: MouseEvent): boolean {
    if (evt != undefined) {
      evt.stopPropagation();
    }

    if (tile == this.emptyTile)
      return false;

    if (this.clickableTiles.indexOf(tile) < 0)
      return false;

    this.swapTiles(tile, this.emptyTile);
    this.calculateClickableTiles();

    return false
  }

  private calculateClickableTiles(): void {
    this.clickableTiles = this.getClickableTiles();
  }

  private getClickableTiles(): BaseTile[] {
    let idx = this.tiles.indexOf(this.emptyTile);
    if (idx < 0)
      return [];

    const hasBottom = idx < this.tiles.length - this.nbCols;
    const hasTop = idx >= this.nbCols;
    const hasLeft = idx % this.nbCols > 0;
    const hasRight = idx % this.nbCols != this.nbCols - 1

    let tiles = []

    if (hasBottom) {
      tiles.push(this.tiles[idx + this.nbCols]);
    }
    if (hasTop) {
      tiles.push(this.tiles[idx - this.nbCols]);
    }
    if (hasRight) {
      tiles.push(this.tiles[idx + 1]);
    }
    if (hasLeft) {
      tiles.push(this.tiles[idx - 1]);
    }

    return tiles;
  }

  private swapTiles(tile_1: BaseTile, tile_2: BaseTile): void {
    if (tile_1 == undefined || tile_2 == undefined)
      return;

    let idx_1 = this.tiles.indexOf(tile_1);
    if (idx_1 < 0)
      return;

    let idx_2 = this.tiles.indexOf(tile_2);
    if (idx_2 < 0)
      return;

    this.tiles[idx_1] = tile_2;
    this.tiles[idx_2] = tile_1;
  }

  private shuffleTiles(level: AllowedOptions): void {

    if (level == undefined)
      return;

    let nbShuffles: number = 0;

    if (level == this.easyOption) {
      nbShuffles = 30;
    } else if (level == this.beginnerOption) {
      nbShuffles = 60;
    } else if (level == this.intermediateOption) {
      nbShuffles = 90;
    } else if (level == this.difficultOption) {
      nbShuffles = 120;
    } else if (level == this.advancedOption) {
      nbShuffles = 150;
    } else {
      nbShuffles = 180;
    }

    for (let i = 0; i < nbShuffles; i++) {
      var array = new Uint8Array(this.clickableTiles.length);
      window.crypto.getRandomValues(array);
      let tileIdx = array[0] % this.clickableTiles.length;
      this.swapTiles(this.emptyTile, this.clickableTiles[tileIdx]);
      this.calculateClickableTiles();
    }



  }

}
