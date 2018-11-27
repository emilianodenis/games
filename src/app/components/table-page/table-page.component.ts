import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ILetter } from 'src/app/model/iLetter';
import { GreekLetterService } from 'src/app/service/greek-letter.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'ed-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablePageComponent implements OnInit {

  public dataSource: MatTableDataSource<ILetter> = new MatTableDataSource([]);

  public letters: ILetter[];
  public displayedColumns: string[] = ["name", "description", "type"];

  constructor(private greekLetterService: GreekLetterService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.getLetters();
  }

  private getLetters(): void {

    this.greekLetterService
      .getCards()
      .subscribe(
        letters => this.setLetters(letters),
        error => {
          console.log(error);
          alert(error);
        }
      );
  }

  private setLetters(letters: ILetter[]): void {
    if (letters == undefined)
      return;

    this.letters = letters;
    this.dataSource.data = letters;
    this.cdRef.detectChanges();
  }

}
