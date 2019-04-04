import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { LevelDetected, MineSweeperTile } from 'src/app/model/minesweeper-tile';

@Component({
  selector: 'minesweeper-tile',
  templateUrl: './minesweeper-tile.component.html',
  styleUrls: ['./minesweeper-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MineSweeperTileComponent implements OnInit {

  @Input('tile') tile: MineSweeperTile;

  public levelDetected = LevelDetected

  constructor(
    private cd: ChangeDetectorRef,
  ) {

  }

  ngOnInit() {
  }



  public reveal(): void {

  }

}
