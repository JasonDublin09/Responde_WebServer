import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AdminGuardGuard } from './route-guard/admin-guard.guard';
/* Pages */
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportHistoryComponent } from './report-history/report-history.component';
import { IncomingReportComponent } from './incoming-report/incoming-report.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { FullIncomingReportComponent } from './full-incoming-report/full-incoming-report.component';
import { FullArchivedReportComponent } from './full-archived-report/full-archived-report.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeEmailVerificationComponent } from './change-email-verification/change-email-verification.component';
import { ChangePasswordVerificationComponent } from './change-password-verification/change-password-verification.component';
import { AdminLoginGuard } from './route-guard/admin-login.guard';
import { LoginguardGuard } from './route/loginguard.guard';
import { RouteGuard } from './route/route.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

/* Table */
import {CdkTableModule} from '@angular/cdk/table';
import { MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AuthService } from './auth.service';
import { EmailverificationComponent } from './emailverification/emailverification.component';
import { ViewreportsComponent } from './viewreports/viewreports.component';



@NgModule({
  exports: [
    CdkTableModule,

    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  declarations: [
    
  ]
})
export class MaterialModule {}

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
    FullIncomingReportComponent,
    FullArchivedReportComponent,
  
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
    AngularFireDatabaseModule,

    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path:'',redirectTo: 'login', pathMatch:'full'},
      {path:'login',component:AdminLoginComponent},
      {path:'dashboard', component:DashboardComponent},
      {path:'reporthistory', component:ReportHistoryComponent, canActivate:[RouteGuard]},
      {path:'incomingreport', component:IncomingReportComponent},
      {path:'profile', component:ProfilePageComponent, canActivate:[RouteGuard]},
      {path:'changeemail', component:ChangeEmailComponent},
      {path:'changepassword', component:ChangePasswordComponent},
      {path:'emailchanges', component:ChangeEmailVerificationComponent},
      {path:'passwordchange', component:ChangePasswordVerificationComponent},
      {path:'reset-password', component:ResetPasswordComponent},
      {path:'emailverification', component:EmailverificationComponent},
      {path:'viewreport',component:ViewreportsComponent}
      /* full report path in auth service */
      
    ])
    
  ],
  providers: [AngularFireAuthGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
