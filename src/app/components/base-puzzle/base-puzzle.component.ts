import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { timer } from 'rxjs/internal/observable/timer';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { take } from 'rxjs/internal/operators/take';
import { BaseTile } from 'src/app/model/base-tile';
import { AppBaseService } from 'src/app/service/app-base.service';
import { BaseComponent } from '../base-component';
import { AllowedOptions } from '../mine-sweeper/mine-sweeper.component';
import { finalize } from 'rxjs/internal/operators/finalize';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';

@Component({
  selector: 'ed-base-puzzle',
  templateUrl: './base-puzzle.component.html',
  styleUrls: ['./base-puzzle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasePuzzleComponent extends BaseComponent implements OnInit {

  @ViewChild('grid') grid: ElementRef;

  public math = Math;

  public gameInProgress: boolean = false;

  private dateStarted: Date;
  private dateEnded: Date;

  private isShuffling: boolean = false

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

  public clickCount: number = 0;

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

  public trackByTileId(index: number, tile: BaseTile): number {
    return index;
  }


  public refresh(): void {
    this.handleLevelChange(this.selectOptionCtrl.value)
  }

  private stopGame(): void {
    this.gameInProgress = false;
  }

  private handleLevelChange(level: AllowedOptions): void {
    if (level == undefined)
      return;

    this.isShuffling = true;
    this.clickCount = 0;

    this.stopGame();

    if (level == this.easyOption) {
      this.setSize(3, 3, 120);
    } else if (level == this.beginnerOption) {
      this.setSize(4, 4, 240);
    } else if (level == this.intermediateOption) {
      this.setSize(5, 5, 360);
    } else if (level == this.difficultOption) {
      this.setSize(6, 5, 480);
    } else if (level == this.advancedOption) {
      this.setSize(6, 6, 600);
    } else {
      this.setSize(7, 7, 720);
    }
  }


  private setSize(nbCols: number, nbRows: number, shuffleCount: number): void {
    this.setCols(nbCols);
    this.setRows(nbRows);

    this.generateTiles(nbCols, nbRows, shuffleCount);

    this.manageDimensions();
  }

  private generateTiles(nbCols: number, nbRows: number, shuffleCount: number): void {

    let tileCount = nbCols * nbRows - 1;

    let tiles = [];
    for (let i = 0; i < tileCount; i++) {
      tiles.push(new BaseTile(i + 1));
    }
    tiles.push(this.emptyTile)

    this.tiles = tiles;

    this.clickableTiles = this.getClickableTiles();
    this.shuffleTiles(shuffleCount);
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

    if (this.isShuffling == true || tile == undefined)
      return false;

    if (tile == this.emptyTile)
      return false;

    if (this.clickableTiles.indexOf(tile) < 0)
      return false;

    if (this.gameInProgress == false) {
      this.dateStarted = new Date();
      this.gameInProgress = true;
    }

    this.clickCount++;

    this.swapTiles(tile, this.emptyTile);

    if (this.checkWinningCondition() == true) {
      this.stopGame();
      this.dateEnded = new Date();
      let content = `you won boy! It only took you ${Math.floor((this.dateEnded.getTime() - this.dateStarted.getTime()) / 1000)} seconds and ${this.clickCount} clicks!`;
      let config = NotificationModalComponent.getDefaultConfig("Congratulation", content);
      this.showGameEnd(true, config);
    }

    this.calculateClickableTiles();

    return false
  }

  private checkWinningCondition(): boolean {
    //for base puzzle, tiles start at id 0. Last tile is the empty tile
    for (let i = 0; i < this.tiles.length - 1; i++) {
      if (i + 1 != this.tiles[i].id)
        return false;
    }
    return true;
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

  private shuffleTiles(shuffleCount: number): void {
    this.isShuffling = true;
    timer(0, Math.floor(5000 / shuffleCount))
      .pipe(
        take(shuffleCount),
        finalize(() => this.isShuffling = false)
      )
      .subscribe(() => {
        let tileIdx = Math.floor(Math.random() * this.clickableTiles.length);
        this.swapTiles(this.emptyTile, this.clickableTiles[tileIdx]);
        this.calculateClickableTiles();
        this.cd.detectChanges();
      });
  }

  private showGameEnd(isSuccessful: boolean, config: MatDialogConfig): void {
    this.dialog.open(NotificationModalComponent, config);
  }

}
