import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule, MatDatepickerModule, MatDialogModule, MatInputModule, MatListModule, MatMenuModule, MatSelectModule, MatSidenavModule, MatTableModule, MatTabsModule, MatToolbarModule } from "@angular/material";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { AboutComponent } from 'src/app/components/about/about.component';
import { CardListComponent } from 'src/app/components/card-list/card-list.component';
import { CardPageComponent } from 'src/app/components/card-page/card-page.component';
import { EditLetterComponent } from 'src/app/components/edit-letter/edit-letter.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { MineSweeperComponent } from 'src/app/components/mine-sweeper/mine-sweeper.component';
import { TablePageComponent } from 'src/app/components/table-page/table-page.component';
import { TopMenuComponent } from 'src/app/components/top-menu/top-menu.component';
import { GreekLetterService } from 'src/app/service/greek-letter.service';



@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    CardListComponent,
    CardPageComponent,
    EditLetterComponent,
    HomeComponent,
    MineSweeperComponent,
    TablePageComponent,
    TopMenuComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatMomentDateModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    ReactiveFormsModule,
  ],
  entryComponents: [EditLetterComponent],
  providers: [GreekLetterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
