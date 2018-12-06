import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
} from "@angular/material";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { AppAngularModule } from 'src/app/module/app.angular.module';


@NgModule({
    imports: [
        AppAngularModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatDatepickerModule,
        MatDialogModule,
        MatGridListModule,
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
        MatGridListModule,
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