import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base-component';

@Component({
  selector: 'ed-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent extends BaseComponent implements OnInit {

  constructor() { super(); }

  ngOnInit() {
  }

}
