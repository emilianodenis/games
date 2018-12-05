import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ILetter } from 'src/app/model/iLetter';
import { GreekLetterService } from 'src/app/service/greek-letter.service';


@Component({
  selector: 'ed-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPageComponent implements OnInit {

  public baseLetters: ILetter[];
  public altLetters: ILetter[];

  constructor(private greekLetterService: GreekLetterService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.getLetters();
  }

  private getLetters(): void {
    this.greekLetterService
      .getCards()
      .subscribe(
        letters => this.distributeLetters(letters),
        error => {
          console.log(error);
          alert(error);
        }
      );
  }

  private distributeLetters(letters: ILetter[]): void {
    if (letters == undefined)
      return;

    this.baseLetters = letters.filter(c => c.type == 'base');
    this.altLetters = letters.filter(c => c.type == 'alt');

    this.cdRef.detectChanges();
  }

}
