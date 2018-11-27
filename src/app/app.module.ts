import { NgModule } from '@angular/core';
import { MatListModule, MatMenuModule, MatSidenavModule, MatToolbarModule, MatTabsModule, MatCardModule } from "@angular/material";
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { AboutComponent } from 'src/app/components/about/about.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { MineSweeperComponent } from 'src/app/components/mine-sweeper/mine-sweeper.component';
import { TopMenuComponent } from 'src/app/components/top-menu/top-menu.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { GreekLetterService } from 'src/app/service/greek-letter.service';
import { CardPageComponent } from './components/card-page/card-page.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    MineSweeperComponent,
    TopMenuComponent,
    CardListComponent,
    CardPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTabsModule,
    MatToolbarModule
  ],
  providers: [GreekLetterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
