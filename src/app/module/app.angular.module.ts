import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
  ],
  exports: [
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
  ]
})
export class AppAngularModule { }
