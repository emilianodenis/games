import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'base-timer',
  templateUrl: './base-timer.component.html',
  styleUrls: ['./base-timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseTimerComponent implements OnDestroy, OnInit {
  public seconds: number = 0;
  public minutes: number = 0;
  public hours: number = 0;

  public totalTime: number = 0;

  private interval: any;

  constructor(
    private cd: ChangeDetectorRef,
  ) {

  }

  ngOnInit() {
    this.cd.detach();

    this.interval = setInterval(() => this.adjustTime(), 1000);
    this.cd.detectChanges();
  }

  private adjustTime(): void {
    ++this.totalTime;

    this.seconds = this.totalTime % 60;
    this.minutes = Math.floor(this.totalTime / 60);
    this.hours = Math.floor(this.totalTime / 3600);

    this.cd.detectChanges();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

}
