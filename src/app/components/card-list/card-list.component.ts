import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ILetter } from 'src/app/model/iLetter';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { EditLetterComponent } from 'src/app/components/edit-letter/edit-letter.component';
import { BaseComponent } from 'src/app/components/base-component';

@Component({
  selector: 'ed-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListComponent extends BaseComponent implements OnInit {

  @Input()
  public letters: ILetter[];

  private editedLetter: ILetter;

  constructor(
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
  ) { super(); }

  ngOnInit() {
  }

  public editLetter(letter: ILetter): void {
    this.editedLetter = letter;

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.data = letter.clone();
    dialogConfig.autoFocus = true;
    dialogConfig.maxHeight = "100%";

    let dialog = this.dialog.open(EditLetterComponent, dialogConfig);

    this.subscriptions
      .push(
        dialog
          .afterClosed()
          .subscribe(
            letter => this.receiveEditedLetter(letter)
          ));
  }

  private receiveEditedLetter(letter: ILetter): void {
    if (!letter || !this.editedLetter)
      return;

    this.editedLetter.initialize(letter);

    this.cdRef.detectChanges();
  }



}
