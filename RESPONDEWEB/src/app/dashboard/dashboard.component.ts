import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import { Observable, Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Routes, RouterModule, Router} from '@angular/router';
import { FullIncomingReportComponent } from '../full-incoming-report/full-incoming-report.component';
import { AuthService } from '../auth.service'


export interface IncomingReport {
  key?: string;
  home?: string;
  contact?: string;
  date?: string;
  lat?: string;
  lng?: string;
  name?: string;
  option?: string;
  email?: string;
  status?: string;
}; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  dataSource : any;
  incomingReportLength: any;
  reportHistoryLength: any;
  incidentReportLength: any;

  displayedColumns: string[] = ['key','date','name','home','contact','actions'];
  IncomingReport?:  IncomingReport[];

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(private authService: AuthService, private db: AngularFireDatabase, private router: Router) {

  }

  ngOnInit() {
    this.db.list('/IncomingReport/', ref => ref.orderByChild("status").equalTo('')).snapshotChanges().subscribe(data => {
      this.incomingReportLength=(data.length); 
      console.log(data); 
    });

    this.db.list('/IncomingReport/', ref => ref.orderByChild("status").equalTo('Responded')).snapshotChanges().subscribe(data => {
      this.reportHistoryLength=(data.length);
      console.log(this.reportHistoryLength);
    });

    this.db.list('/IncidentReport/').snapshotChanges().subscribe(data => {
      this.incidentReportLength=(data.length);
      console.log(this.incidentReportLength);
    });

    this.dataSource = new MatTableDataSource<IncomingReport>([]);

    this.db.list('IncomingReport/', ref => ref.orderByChild('status').equalTo(''))
    .snapshotChanges().subscribe(data => {
      this.dataSource.data = data

      this.IncomingReport = [];
      console.log(data);
      data.forEach(item => {
        let a = item.payload.key;
        let val:any = item.payload;
        this.IncomingReport!.push(val as IncomingReport);
        
      })
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  logData(row: any){
    console.log(row);
  }
  
  // table filtering
  applyFilter(event: Event): string {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    return (event.target as HTMLInputElement).value;
  }

  /* view route */
  onSelect(report){
    this.router.navigate(['incoming-report', report.key]);
  }
}
