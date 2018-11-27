import { Component, OnInit } from '@angular/core';
import { ICardTest } from 'src/app/model/iCardTest';
import { GreekLetterService } from 'src/app/service/greek-letter.service';

@Component({
  selector: 'ed-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss']
})
export class CardPageComponent implements OnInit {

  public baseCards: ICardTest[];
  public altCards: ICardTest[];

  constructor(private greekLetterService: GreekLetterService) { }

  ngOnInit() {
    this.getCards();
  }

  private getCards(): void {
    this.greekLetterService.getCards().subscribe(
      cards => this.distributeCards(cards),
      error => {
        console.log(error);
        alert(error);
      }
    );
  }

  private distributeCards(cards: ICardTest[]): void {
    if (cards == undefined)
      return;

    this.baseCards = cards.filter(c => c.type == 'base');
    this.altCards = cards.filter(c => c.type == 'alt');
  }

}
