import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base-component';

@Component({
  selector: 'ed-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HomeComponent extends BaseComponent implements OnInit {

  constructor() { super(); }

  ngOnInit() { }

}
