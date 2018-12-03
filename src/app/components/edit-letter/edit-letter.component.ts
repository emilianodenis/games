import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ILetter } from 'src/app/model/iLetter';

@Component({
  selector: 'ed-edit-letter',
  templateUrl: './edit-letter.component.html',
  styleUrls: ['./edit-letter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormBuilder]
})
export class EditLetterComponent implements OnInit {

  public form: FormGroup;

  public letterName: string;
  public letterDescription: string;
  public letterType: LetterType;
  public letterDate: Date;

  public letter: ILetter;

  constructor(
    @Inject(MAT_DIALOG_DATA) letter: ILetter,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditLetterComponent>,
    private dialog: MatDialog) {

    this.setFormFields(letter);

    this.form = fb.group({
      letterName: [this.letterName, Validators.required],
      letterDescription: [this.letterDescription, Validators.required],
      letterType: [this.letterType, Validators.required],
      letterDate: [this.letterDate, Validators.required]
    });
  }

  ngOnInit() {
  }

  private setFormFields(letter: ILetter): void {
    this.letter = letter;

    if (letter) {
      this.letterName = letter.name;
      this.letterDescription = letter.description;
      this.letterType = letter.type;
      this.letterDate = letter.date;
    }
  }

  private setControlFields(letter: ILetter): void {
    if (!this.letter)
      return;

    this.form.setValue({
      letterName: letter.name,
      letterDescription: letter.description,
      letterType: letter.type,
      letterDate: letter.date
    });
  }

  private getLetterFromForm(data: any = undefined): ILetter {

    if (!data)
      return undefined;

    let editedLetter = <ILetter>{
      name: data.letterName,
      description: data.letterDescription,
      date: data.letterDate,
      type: data.letterType,
      id: undefined,
      imageUrl: undefined
    };
    if (this.letter) {
      editedLetter.id = this.letter.id;
      editedLetter.imageUrl = this.letter.imageUrl;
    }

    return editedLetter;
  }

  public editLetter(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.data = this.getLetterFromForm(this.form.value);
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

    this.setControlFields(letter);
  }

  public save(): void {
    this.close(this.form.value);
  }

  public close(data: any = undefined): void {
    this.dialogRef.close(this.getLetterFromForm(data));
  }

}
