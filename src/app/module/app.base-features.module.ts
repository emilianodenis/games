import { NgModule } from '@angular/core';
import { AboutComponent } from 'src/app/components/about/about.component';
import { CardListComponent } from 'src/app/components/card-list/card-list.component';
import { CardPageComponent } from 'src/app/components/card-page/card-page.component';
import { EditLetterComponent } from 'src/app/components/edit-letter/edit-letter.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { MineSweeperComponent } from 'src/app/components/mine-sweeper/mine-sweeper.component';
import { TablePageComponent } from 'src/app/components/table-page/table-page.component';
import { TopMenuComponent } from 'src/app/components/top-menu/top-menu.component';
import { AppMaterialModule } from 'src/app/module/app.material.module';

@NgModule({
  declarations: [
    AboutComponent,
    CardListComponent,
    CardPageComponent,
    EditLetterComponent,
    HomeComponent,
    MineSweeperComponent,
    TablePageComponent,
    TopMenuComponent,
  ],
  imports: [
    AppMaterialModule,
  ],
  exports: [
    AppMaterialModule,
    AboutComponent,
    CardListComponent,
    CardPageComponent,
    EditLetterComponent,
    HomeComponent,
    MineSweeperComponent,
    TablePageComponent,
    TopMenuComponent,
  ],
  entryComponents: [EditLetterComponent],
})
export class AppBaseFeaturesModule { }
