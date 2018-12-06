import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base-component';

@Component({
  selector: 'ed-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopMenuComponent extends BaseComponent implements OnInit {

  constructor() { super(); }

  ngOnInit() {
  }

}
