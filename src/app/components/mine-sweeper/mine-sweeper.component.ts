import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ed-mine-sweeper',
  templateUrl: './mine-sweeper.component.html',
  styleUrls: ['./mine-sweeper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MineSweeperComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
