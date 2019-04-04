import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LevelDetected, MineSweeperTile } from 'src/app/model/minesweeper-tile';

@Component({
  selector: 'minesweeper-tile',
  templateUrl: './minesweeper-tile.component.html',
  styleUrls: ['./minesweeper-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MineSweeperTileComponent {

  @Input('tile') tile: MineSweeperTile;

  public levelDetected = LevelDetected

  constructor() { }

}
