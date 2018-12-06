import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base-component';

@Component({
  selector: 'ed-mine-sweeper',
  templateUrl: './mine-sweeper.component.html',
  styleUrls: ['./mine-sweeper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MineSweeperComponent extends BaseComponent implements OnInit {

  public nbCols: number = 10;
  public tiles: Array<number>;
  public height: string = "10%";

  constructor() { super(); }

  ngOnInit() {
    this.generateTiles();
  }

  private generateTiles(): void {
    this.tiles = [];
    for (let i = 0; i < this.nbCols; i++) {

      for (let j = 0; j < this.nbCols; j++) {
        this.tiles.push(i * 10 + j);
      }

    }
  }

}
