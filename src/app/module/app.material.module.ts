import { NgModule } from '@angular/core';
import { MatCardModule, MatDatepickerModule, MatDialogModule, MatInputModule, MatListModule, MatMenuModule, MatSelectModule, MatSidenavModule, MatTableModule, MatTabsModule, MatToolbarModule } from "@angular/material";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { AppAngularModule } from 'src/app/module/app.angular.module';


@NgModule({
    imports: [
        AppAngularModule,
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
    ],
    exports: [
        AppAngularModule,
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
    ]
})
export class AppMaterialModule { }