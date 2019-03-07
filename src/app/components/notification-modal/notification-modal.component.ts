import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';

export interface NotificationModalContext {
  title: string;
  content: string;
}

@Component({
  selector: 'ed-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationModalComponent implements OnInit {

  public title: string;
  public content: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: NotificationModalContext,
    private dialogRef: MatDialogRef<NotificationModalContext>,
  ) {
    this.title = data.title;
    this.content = data.content;
  }

  ngOnInit() {
  }

  public static getDefaultConfig(title: string, content: string): MatDialogConfig {
    let config = new MatDialogConfig();
    let data = <NotificationModalContext>{
      title: title,
      content: content
    };
    config.data = data;
    return config;
  }
}
