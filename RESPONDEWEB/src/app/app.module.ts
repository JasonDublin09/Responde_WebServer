import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
/* Pages */
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportHistoryComponent } from './report-history/report-history.component';
import { IncomingReportComponent } from './incoming-report/incoming-report.component';
import { TopbarComponent } from './topbar/topbar.component';
/* import { MatTableModule } from '@angular/material/table'; */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeEmailVerificationComponent } from './change-email-verification/change-email-verification.component';
import { ChangePasswordVerificationComponent } from './change-password-verification/change-password-verification.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

/* Table */
import {CdkTableModule} from '@angular/cdk/table';
import { MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FooterComponent } from './footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidenavComponent,
    AdminLoginComponent,
    ReportHistoryComponent,
    IncomingReportComponent,
    TopbarComponent,
    ProfilePageComponent,
    ChangeEmailComponent,
    ChangePasswordComponent,
    ChangeEmailVerificationComponent,
    ChangePasswordVerificationComponent,
    ResetPasswordComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,

    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path:'',component:AdminLoginComponent},
      {path:'dashboard', component:DashboardComponent},
      {path:'report-history', component:ReportHistoryComponent},
      {path:'incoming-report', component:IncomingReportComponent},
      {path:'profile', component:ProfilePageComponent},
      {path:'change-email', component:ChangeEmailComponent},
      {path:'change-password', component:ChangePasswordComponent},
      {path:'change-email-verification', component:ChangeEmailVerificationComponent},
      {path:'change-password-verification', component:ChangePasswordVerificationComponent},
      {path:'reset-password', component:ResetPasswordComponent},
      
    ])
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
