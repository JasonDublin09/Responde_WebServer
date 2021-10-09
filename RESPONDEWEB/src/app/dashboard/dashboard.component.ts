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
  constructor(private authService: AuthService, private db: AngularFireDatabase) {

  }

  ngOnInit(): void {
    this.db.list('/IncomingReport/', ref => ref.orderByChild("status").equalTo('')).snapshotChanges().subscribe(data => {
      this.incomingReportLength=(data.length); 
      console.log(data); 
    });

    this.db.list('/IncomingReport/', ref => ref.orderByChild("status").equalTo('Responded')).snapshotChanges().subscribe(data => {
      this.reportHistoryLength=(data.length);
      console.log(this.reportHistoryLength);
    });
  }

}
