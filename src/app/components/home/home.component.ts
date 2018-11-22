import { Component, OnInit } from '@angular/core';
import { ICardTest } from 'src/app/model/iCardTest';

@Component({
  selector: 'ed-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public baseCards: ICardTest[];
  public altCards: ICardTest[];

  constructor() { }

  ngOnInit() {
    let cards = this.getCards();
    this.baseCards = cards.filter(c => c.type == 'base');
    this.altCards = cards.filter(c => c.type == 'alt');
  }

  private getCards(): ICardTest[] {
    let cards = new Array<ICardTest>();

    let card1 = <ICardTest>{
      name: 'alpha',
      description: 'Le A grec',
      imageUrl: 'https://cdn1.iconfinder.com/data/icons/ringtone-music-instruments/512/sigma-symbol-greek-alphabet-letter-3-512.png',
      type: 'base'
    };

    let card2 = <ICardTest>{
      name: 'beta',
      description: 'premiere description',
      imageUrl: 'https://png.pngtree.com/svg/20170622/beta_66473.png',
      type: 'alt'
    };

    let card3 = <ICardTest>{
      name: 'gamma',
      description: 'premiere description',
      imageUrl: 'https://cdn1.iconfinder.com/data/icons/electricity-and-functional-elements/512/gamma-symbol-letter-greek-alphabet-512.png',
      type: 'base'
    };

    let card4 = <ICardTest>{
      name: 'delta',
      description: 'premiere description',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Greek_uc_delta.png',
      type: 'alt'
    };

    let card5 = <ICardTest>{
      name: 'epsilon',
      description: 'premiere description',
      imageUrl: 'https://banner2.kisspng.com/20180406/ukq/kisspng-epsilon-greek-alphabet-koppa-letter-string-5ac76f2bda5d76.1915839615230195638944.jpg',
      type: 'base'
    };

    let card6 = <ICardTest>{
      name: 'omega',
      description: 'premiere description',
      imageUrl: 'https://cdn0.iconfinder.com/data/icons/mathematics-geometry/512/omega-greek-alphabet-letter-512.png',
      type: 'alt'
    };

    return [
      card1,
      card2
      , card3, card4, card5, card6, card2, card3, card4, card5, card6, card2, card3, card4, card5, card6, card2, card3, card4, card5, card6
    ];
  }

}
