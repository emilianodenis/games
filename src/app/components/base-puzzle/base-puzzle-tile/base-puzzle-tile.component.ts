import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { BaseTile } from 'src/app/model/base-tile';

@Component({
  selector: 'base-puzzle-tile',
  templateUrl: './base-puzzle-tile.component.html',
  styleUrls: ['./base-puzzle-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasePuzzleTileComponent implements OnInit {

  @Input() tile: BaseTile;

  constructor() { }

  ngOnInit() {
  }

}
