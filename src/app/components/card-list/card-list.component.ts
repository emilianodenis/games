import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ILetter } from 'src/app/model/iLetter';

@Component({
  selector: 'ed-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardListComponent implements OnInit {

  @Input()
  public letters: ILetter[];

  constructor() { }

  ngOnInit() {
  }



}
