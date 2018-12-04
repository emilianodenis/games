import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { AppBaseFeaturesModule } from 'src/app/module/app.base-features.module';
import { AppServiceModule } from 'src/app/module/app.service.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    AppBaseFeaturesModule,
    AppServiceModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
