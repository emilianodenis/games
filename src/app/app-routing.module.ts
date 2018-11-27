import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from 'src/app/components/about/about.component';
import { CardPageComponent } from 'src/app/components/card-page/card-page.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { MineSweeperComponent } from 'src/app/components/mine-sweeper/mine-sweeper.component';
import { TablePageComponent } from 'src/app/components/table-page/table-page.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent

  },
  {
    path: "card",
    component: CardPageComponent
  },
  {
    path: "table",
    component: TablePageComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "minesweeper",
    component: MineSweeperComponent
  },
  {
    path: "**",
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
