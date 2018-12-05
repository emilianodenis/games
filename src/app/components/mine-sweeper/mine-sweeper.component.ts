import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ed-mine-sweeper',
  templateUrl: './mine-sweeper.component.html',
  styleUrls: ['./mine-sweeper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MineSweeperComponent implements OnInit {

  public nbCols: number = 10;
  public tiles: Array<number>;
  public height: string = "10%";

  constructor() {
  }

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

  public log(obj: any): void {
    console.log(obj);
  }

}
