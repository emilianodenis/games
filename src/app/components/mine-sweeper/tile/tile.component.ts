import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Tile, LevelDetected } from 'src/app/model/tile';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'ed-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileComponent implements OnInit {

  @Input('tile') tile: Tile;

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
