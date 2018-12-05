import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ILetter } from 'src/app/model/iLetter';

@Component({
  selector: 'ed-edit-letter',
  templateUrl: './edit-letter.component.html',
  styleUrls: ['./edit-letter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormBuilder],
})
export class EditLetterComponent implements OnInit {

  public form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public letter: ILetter,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditLetterComponent>,
    private dialog: MatDialog) {

    this.form = fb.group({
      name: [this.letter.name, Validators.required],
      description: [this.letter.description, Validators.required],
      type: [this.letter.type, Validators.required],
      date: [this.letter.date, Validators.required]
    });
  }

  ngOnInit() {
  }

  private setControlFields({ name, description, type, date }: ILetter): void {
    this.form.setValue({ name, description, type, date });
  }

  private mergeValuesToLetter(source: ILetter, dest: ILetter): void {
    if (!dest || !source)
      return;

    dest.name = source.name;
    dest.description = source.description;
    dest.date = source.date;
    dest.type = source.type;
  }

  public editLetter(): void {
    const dialogConfig = new MatDialogConfig();

    let editedLetter = this.letter.clone();
    this.mergeValuesToLetter(this.form.value, editedLetter);

    dialogConfig.disableClose = true;
    dialogConfig.data = editedLetter;
    dialogConfig.autoFocus = true;
    dialogConfig.maxHeight = "100%";

    let dialog = this.dialog.open(EditLetterComponent, dialogConfig);

    dialog
      .afterClosed()
      .subscribe(
        data => this.receiveEditedLetter(data)
      );
  }

  private receiveEditedLetter(letter: ILetter): void {
    if (!letter)
      return;

    this.mergeValuesToLetter(letter, this.letter);

    this.setControlFields(this.letter);
  }

  public save(): void {
    if (!this.form.valid)
      return;

    this.mergeValuesToLetter(this.form.value, this.letter);
    this.close(this.letter);
  }

  public close(data: ILetter = undefined): void {
    this.dialogRef.close(data);
  }

}
