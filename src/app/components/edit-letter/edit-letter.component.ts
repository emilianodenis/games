import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'ed-edit-letter',
  templateUrl: './edit-letter.component.html',
  styleUrls: ['./edit-letter.component.scss']
})
export class EditLetterComponent implements OnInit {

  constructor(/*
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditLetterComponent>*/) { }

  ngOnInit() {
  }

}
