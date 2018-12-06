import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ILetter } from 'src/app/model/iLetter';
import { GreekLetterService } from 'src/app/service/greek-letter.service';
import { BaseComponent } from 'src/app/components/base-component';


@Component({
  selector: 'ed-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPageComponent extends BaseComponent implements OnInit {

  public baseLetters: ILetter[];
  public altLetters: ILetter[];

  constructor(
    private greekLetterService: GreekLetterService,
    private cdRef: ChangeDetectorRef) { super(); }

  ngOnInit() {
    this.getLetters();
  }

  private getLetters(): void {
    this.subscriptions
      .push(
        this.greekLetterService
          .getCards()
          .subscribe(
            letters => this.distributeLetters(letters),
            error => {
              console.log(error);
              alert(error);
            }
          )
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
