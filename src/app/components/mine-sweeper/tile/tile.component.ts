import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Tile } from 'src/app/model/tile';

@Component({
  selector: 'ed-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileComponent implements OnInit {

  @Input('tile') tile: Tile;

  constructor() { }

  ngOnInit() {
  }

}
