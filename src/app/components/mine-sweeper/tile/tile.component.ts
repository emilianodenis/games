import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { LevelDetected, MinesweeperTile } from 'src/app/model/minesweeper-tile';

@Component({
  selector: 'ed-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileComponent implements OnInit {

  @Input('tile') tile: MinesweeperTile;

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
