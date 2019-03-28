import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutComponent } from 'src/app/components/about/about.component';
import { CardListComponent } from 'src/app/components/card-list/card-list.component';
import { CardPageComponent } from 'src/app/components/card-page/card-page.component';
import { EditLetterComponent } from 'src/app/components/edit-letter/edit-letter.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { MineSweeperComponent } from 'src/app/components/mine-sweeper/mine-sweeper.component';
import { TablePageComponent } from 'src/app/components/table-page/table-page.component';
import { TopMenuComponent } from 'src/app/components/top-menu/top-menu.component';
import { AppMaterialModule } from 'src/app/module/app.material.module';
import { TileComponent } from '../components/mine-sweeper/tile/tile.component';
import { NotificationModalComponent } from '../components/notification-modal/notification-modal.component';
import { BasePuzzleComponent } from '../components/base-puzzle/base-puzzle.component';

@NgModule({
  declarations: [
    AboutComponent,
    BasePuzzleComponent,
    CardListComponent,
    CardPageComponent,
    EditLetterComponent,
    HomeComponent,
    MineSweeperComponent,
    TileComponent,
    TablePageComponent,
    TopMenuComponent,
    NotificationModalComponent,
  ],
  imports: [
    AppMaterialModule,
    RouterModule,
  ],
  exports: [
    AppMaterialModule,
    AboutComponent,
    BasePuzzleComponent,
    CardListComponent,
    CardPageComponent,
    EditLetterComponent,
    HomeComponent,
    MineSweeperComponent,
    TileComponent,
    TablePageComponent,
    TopMenuComponent,
  ],
  entryComponents: [
    EditLetterComponent,
    NotificationModalComponent,
  ],
})
export class AppBaseFeaturesModule { }
