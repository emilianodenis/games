import { NgModule } from '@angular/core';
import { AppBaseService } from 'src/app/service/app-base.service';
import { GreekLetterService } from 'src/app/service/greek-letter.service';

@NgModule({
  providers: [
    AppBaseService,
    GreekLetterService,
  ],
})
export class AppServiceModule { }
