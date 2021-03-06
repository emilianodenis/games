import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { debounceTime } from 'rxjs/operators';
import { BaseComponent } from 'src/app/components/base-component';
import { LevelDetected, MineSweeperTile } from 'src/app/model/minesweeper-tile';
import { AppBaseService } from 'src/app/service/app-base.service';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';


export type AllowedOptions = "Easy" | "Beginner" | "Intermediate" | "Difficult" | "Advanced" | "Custom";

export class SurroundingContext {

    constructor(
        private nbCols: number,
        private totalCount: number,
        private actualIndex: number,
    ) {

    }

    public getDetectedIndexes(): number[] {
        let idxArray = [];

        const hasBottom = this.actualIndex < this.totalCount - this.nbCols;
        const hasTop = this.actualIndex >= this.nbCols;
        const hasLeft = this.actualIndex % this.nbCols > 0;
        const hasRight = this.actualIndex % this.nbCols != this.nbCols - 1

        const hasTopLeft = hasTop && hasLeft;
        const hasTopRight = hasTop && hasRight;
        const hasBottomLeft = hasBottom && hasLeft;
        const hasBottomRight = hasBottom && hasRight;

        if (hasTopLeft) {
            idxArray.push(this.actualIndex - this.nbCols - 1);
        }

        if (hasTop) {
            idxArray.push(this.actualIndex - this.nbCols);
        }

        if (hasTopRight) {
            idxArray.push(this.actualIndex - this.nbCols + 1);
        }

        if (hasLeft) {
            idxArray.push(this.actualIndex - 1);
        }

        if (hasRight) {
            idxArray.push(this.actualIndex + 1);
        }

        if (hasBottomLeft) {
            idxArray.push(this.actualIndex + this.nbCols - 1);
        }

        if (hasBottom) {
            idxArray.push(this.actualIndex + this.nbCols);
        }

        if (hasBottomRight) {
            idxArray.push(this.actualIndex + this.nbCols + 1);
        }

        return idxArray;
    }
}

@Component({
    selector: 'ed-mine-sweeper',
    templateUrl: './mine-sweeper.component.html',
    styleUrls: ['./mine-sweeper.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MineSweeperComponent extends BaseComponent implements OnInit {

    @ViewChild('grid') grid: ElementRef;

    private static MineSweeperTimerKey = "MineSweeperTimerKey";

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

    public currentOption: AllowedOptions;

    public form: FormGroup;

    public nbCols: number;
    public nbRows: number;
    public bombCount: number;
    public rowHeight: string = "10%";
    public tileSide: number;
    public gridWidth: number;
    public gridHeight: number;

    public tiles: Array<MineSweeperTile>;

    public tilesWithBombs: Array<MineSweeperTile>;
    public tilesSuspected: Array<MineSweeperTile>;
    public tilesEmpty: Array<MineSweeperTile>;

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

    public trackByTileId(index: number, tile: MineSweeperTile): number {
        //console.log("track by " + index);
        return index;
    }

    public refresh(): void {
        this.handleLevelChange(this.selectOptionCtrl.value)
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
        } else if (level == this.beginnerOption) {
            this.setSize(12, 12, 15);
        } else if (level == this.intermediateOption) {
            this.setSize(16, 12, 20);
        } else if (level == this.difficultOption) {
            this.setSize(20, 12, 30);
        } else if (level == this.advancedOption) {
            this.setSize(25, 14, 50);
        } else {
            this.setSize(30, 16, 100);
        }
    }

    private setSize(nbCols: number, nbRows: number, bombCount: number): void {
        this.setCols(nbCols);
        this.setRows(nbRows);
        this.bombCount = bombCount;

        this.generateTiles(nbCols, nbRows);

        this.manageDimensions();
    }

    private generateTiles(nbCols: number, nbRows: number): void {

        let tiles = [];
        for (let i = 0; i < nbRows; i++) {

            for (let j = 0; j < nbCols; j++) {
                tiles.push(new MineSweeperTile(i * nbCols + j));
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

    public detect(tile: MineSweeperTile, evt: MouseEvent): boolean {
        evt.stopPropagation();
        if (tile == undefined || !this.gameInProgress || tile.canDetect == false)
            return false;

        let newTile = tile.detect();

        this.setTile(newTile);

        if (newTile.currentDetectionLevel == LevelDetected.flag) {
            this.tilesSuspected.push(newTile);
            if (this.checkWiningConditions()) {
                this.stopGame();
                let content = `you won boy! It only took you ${Math.floor((this.dateEnded.getTime() - this.dateStarted.getTime()) / 1000)} seconds`;
                let config = NotificationModalComponent.getDefaultConfig("Congratulation", content);
                this.showGameEnd(true, config);
            }
        } else if (newTile.currentDetectionLevel == LevelDetected.unknown) {
            let idx = this.tilesSuspected.findIndex(t => t.id == newTile.id);
            this.tilesSuspected.splice(idx, 1);
        }
        return false;
    }

    public clickTile(tile: MineSweeperTile): void {
        if (!tile || tile.canReveal == false)
            return;

        if (!this.gameInProgress) {
            this.generateGame(tile);
        }
        this.revealTile(tile);
    }

    private revealTile(tile: MineSweeperTile): void {
        if (tile == undefined || tile.canReveal == false || !this.gameInProgress)
            return;

        let newTile = tile.reveal();
        this.setTile(newTile);

        if (tile.hasBomb) {
            this.stopGame();
            this.tiles.forEach(t => this.setTile(t.unHide()));
            let content = `you lost boy! after barely ${Math.floor((this.dateEnded.getTime() - this.dateStarted.getTime()) / 1000)} seconds`;
            let config = NotificationModalComponent.getDefaultConfig("Sorry", content);
            this.showGameEnd(false, config);
            return;
        } else if (this.checkWiningConditions()) {
            this.stopGame();
            let content = `you won boy! It only took you ${Math.floor((this.dateEnded.getTime() - this.dateStarted.getTime()) / 1000)} seconds`;
            let config = NotificationModalComponent.getDefaultConfig("Congratulation", content);
            this.showGameEnd(true, config);
        }

        if (tile.surroundingBombCount == 0) {
            const tilesIdxToReveal = new SurroundingContext(this.nbCols, this.tiles.length, tile.id).getDetectedIndexes();
            tilesIdxToReveal.forEach(idx => this.revealTile(this.tiles[idx]));
        }
    }

    private setTile(tile: MineSweeperTile): void {
        if (tile == undefined)
            return;

        this.tiles[tile.id] = tile;

        let idx = this.tilesEmpty.findIndex(t => t.id == tile.id);
        if (idx > -1) {
            this.tilesEmpty[idx] = tile;
        }

        if (tile.hasBomb == true) {
            idx = this.tilesWithBombs.findIndex(t => t.id == tile.id);
            if (idx > -1) {
                this.tilesWithBombs[idx] = tile;
            }
        }
    }

    private checkWiningConditions(): boolean {
        if (this.tilesEmpty.some(t => t.isRevealed == false))
            return false;

        if (this.tilesWithBombs.some(t => t.currentDetectionLevel != LevelDetected.flag))
            return false;

        if (this.tilesSuspected.some(t => t.hasBomb == false))
            return false;

        return true;
    }

    private generateGame(tile: MineSweeperTile): void {
        this.gameInProgress = true;
        this.tilesWithBombs = [];
        this.tilesSuspected = [];
        this.tilesEmpty = [];
        this.dropBombs(tile);
        this.dateStarted = new Date();
    }

    private stopGame(): void {
        this.dateEnded = new Date();
        this.gameInProgress = false;
    }

    private dropBombs(actualTile: MineSweeperTile): void {

        let tileIdxWithoutBombs = [];
        if (actualTile) {
            tileIdxWithoutBombs.push(actualTile.id);

            const surroundingContext = new SurroundingContext(this.nbCols, this.tiles.length, actualTile.id);
            tileIdxWithoutBombs.push(...surroundingContext.getDetectedIndexes());
        }

        let tileWithBombs = [];
        while (tileWithBombs.length < this.bombCount) {
            let idx = Math.floor(Math.random() * this.tiles.length);

            if (tileIdxWithoutBombs.includes(idx) || tileWithBombs.includes(idx))
                continue;

            tileWithBombs.push(idx);
            this.setTile(this.tiles[idx].setBomb(true));
            this.tilesWithBombs.push(this.tiles[idx]);
        }

        for (let i = 0; i < this.tiles.length; i++) {
            let tile = this.tiles[i];
            if (tile.hasBomb == false) {
                this.setTile(tile.setSurroundingBombCount(this.getSurroundingBombCount(tile.id, tileWithBombs)));
                this.tilesEmpty.push(tile);
            }
        }
    }

    private getSurroundingBombCount(idx: number, idxWithBombs: number[]): number {
        let surroundingBombCount = 0;
        const surroundingIndxes = new SurroundingContext(this.nbCols, this.tiles.length, idx).getDetectedIndexes();
        surroundingIndxes.forEach(i => {
            if (idxWithBombs.indexOf(i) > -1) {
                ++surroundingBombCount;
            }
        });
        return surroundingBombCount;
    }

    private showGameEnd(isSuccessful: boolean, config: MatDialogConfig): void {
        this.dialog.open(NotificationModalComponent, config);
    }

}
