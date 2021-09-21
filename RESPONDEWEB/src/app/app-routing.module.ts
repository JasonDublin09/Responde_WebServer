import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {redirectLoggedInTo} from '@angular/fire/auth-guard'
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { FullIncomingReportComponent } from './full-incoming-report/full-incoming-report.component';
import { FullArchivedReportComponent } from './full-archived-report/full-archived-report.component';

const routes: Routes = [
  {path:'incoming-report/:uid', component:FullIncomingReportComponent},
  {path:'report/:uid', component:FullArchivedReportComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule,ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [FullIncomingReportComponent,
                                  FullArchivedReportComponent]
