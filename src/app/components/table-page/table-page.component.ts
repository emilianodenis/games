import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatTableDataSource } from '@angular/material';
import { EditLetterComponent } from 'src/app/components/edit-letter/edit-letter.component';
import { ILetter } from 'src/app/model/iLetter';
import { GreekLetterService } from 'src/app/service/greek-letter.service';

@Component({
  selector: 'ed-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablePageComponent implements OnInit {

  private editedLetter: ILetter;

  public dataSource: MatTableDataSource<ILetter> = new MatTableDataSource([]);

  public letters: ILetter[];
  public displayedColumns: string[] = ["name", "description", "imageUrl", "type", "date", "action"];

  constructor(
    private greekLetterService: GreekLetterService,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
  ) { }

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

  public filter(search: string = ""): void {
    this.dataSource.filter = search.trim().toLocaleLowerCase();
  }

  public editLetter(letter: ILetter): void {
    this.editedLetter = letter;

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.data = letter.clone();
    dialogConfig.autoFocus = true;
    dialogConfig.maxHeight = "100%";

    let dialog = this.dialog.open(EditLetterComponent, dialogConfig);

    dialog
      .afterClosed()
      .subscribe(
        letter => this.receiveEditedLetter(letter)
      );
  }

  private receiveEditedLetter(letter: ILetter): void {
    if (!letter || !this.editedLetter)
      return;

    this.editedLetter.initialize(letter);

    this.cdRef.detectChanges();
  }

}
