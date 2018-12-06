import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { BaseComponent } from 'src/app/components/base-component';
import { AppBaseService } from 'src/app/service/app-base.service';

@Component({
  selector: 'ed-mine-sweeper',
  templateUrl: './mine-sweeper.component.html',
  styleUrls: ['./mine-sweeper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MineSweeperComponent extends BaseComponent implements OnInit {

  @ViewChild('grid') grid: ElementRef;

  public nbCols: number;
  public nbRows: number;
  public gridSide: number;
  public rowHeight: string = "10%";

  public tiles: Array<number>;

  constructor(
    private appService: AppBaseService,
    private cd: ChangeDetectorRef,
  ) {
    super();
    this.generateTiles(10, 10);
  }

  ngOnInit() {
    setTimeout(() => this.manageDimensions(), 0);
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

  private generateTiles(nbCols: number, nbRows: number): void {

    this.setCols(nbCols);
    this.setRows(nbRows);

    let tiles = [];
    for (let i = 0; i < nbCols; i++) {

      for (let j = 0; j < nbRows; j++) {
        tiles.push(i * 10 + j);
      }

    }

    this.tiles = tiles;
  }

  private setRows(nbRows: number): void {
    this.nbRows = nbRows;
    this.rowHeight = `${Math.floor(100 / nbRows)}%`;
  }

  private setCols(nbCols: number): void {
    this.nbCols = nbCols;
  }

  private manageDimensions(): void {
    this.gridSide = Math.min(this.grid.nativeElement.clientWidth, this.grid.nativeElement.clientHeight);
    this.cd.detectChanges();
  }

}
