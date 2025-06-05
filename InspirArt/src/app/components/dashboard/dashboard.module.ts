import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ConfirmDialogComponent
 
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule
  ]
})
export class DashboardModule { }
