import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'base-puzzle-tile',
  templateUrl: './base-puzzle-tile.component.html',
  styleUrls: ['./base-puzzle-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasePuzzleTileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
