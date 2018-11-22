import { Component, OnInit, Input } from '@angular/core';
import { ICardTest } from 'src/app/model/iCardTest';

@Component({
  selector: 'ed-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  @Input()
  public cards: ICardTest[];

  constructor() { }

  ngOnInit() {
  }

}
