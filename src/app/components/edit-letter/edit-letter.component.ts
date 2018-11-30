import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ILetter } from 'src/app/model/iLetter';

@Component({
  selector: 'ed-edit-letter',
  templateUrl: './edit-letter.component.html',
  styleUrls: ['./edit-letter.component.scss'],
  providers: [FormBuilder]
})
export class EditLetterComponent implements OnInit {

  public form: FormGroup;

  public letterName: string;
  public letterDescription: string;
  public letterType: LetterType;
  public letterDate: Date;

  private letter: ILetter;

  constructor(
    @Inject(MAT_DIALOG_DATA) letter: ILetter,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditLetterComponent>) {

    this.letter = letter;

    if (letter) {
      this.letterName = letter.name;
      this.letterDescription = letter.description;
      this.letterType = letter.type;
      this.letterDate = letter.date;
    }

    this.form = fb.group({
      letterName: [this.letterName, Validators.required],
      letterDescription: [this.letterDescription, Validators.required],
      letterType: [this.letterType, Validators.required],
      letterDate: [this.letterDate, Validators.required]
    });
  }

  ngOnInit() {
  }

  public save(): void {
    this.close(this.form.value);
  }

  public close(data: ILetter = undefined): void {
    this.dialogRef.close(data);
  }

}
