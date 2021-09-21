import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dataSource : any;
  incomingReportLength: any;
  reportHistoryLength: any;
  constructor(private afauth: AuthService, private db: AngularFireDatabase) {

  }

  ngOnInit(): void {
    this.db.list('IncomingReport').valueChanges().pipe()
    .subscribe(data => {this.incomingReportLength=(data.length); console.log(this.incomingReportLength); this.dataSource.data = data;});

    this.db.list('ReportHistory').valueChanges().pipe()
    .subscribe(data => {this.reportHistoryLength=(data.length); console.log(this.reportHistoryLength); this.dataSource.data = data;});
  }

  logout(){
    console.log('ewan')
    this.afauth.logout()

  }
}
