import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

/* For Table with sorting, pagination, and filtering */
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import { Observable, Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Routes, RouterModule, Router} from '@angular/router';
import { AuthService } from '../auth.service'


export interface ReportHistory {
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
  selector: 'app-report-history',
  templateUrl: './report-history.component.html',
  styleUrls: ['./report-history.component.css']
})

export class ReportHistoryComponent implements OnInit {
  displayedColumns: string[] = ['key','name','home','contact','date','actions'];
  dataSource : any;
  ReportHistory?:  ReportHistory[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private db: AngularFireDatabase, private router: Router, private authService: AuthService) { 
    
  }

  
  ngOnInit() {

    this.dataSource = new MatTableDataSource([]);
    
    /* let s = this.authService.getReportList();
    s.snapshotChanges().subscribe(data => {
      this.dataSource.data = data
      this.ReportHistory = [];
      data.forEach(item => {
        let a = item.payload.key;
        this.ReportHistory!.push(a as ReportHistory);
        console.log(item.payload.val());
      })
    }) */

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.db.list('IncomingReport/', ref => ref.orderByChild('status').equalTo('Responded'))
    .snapshotChanges().subscribe(data => {
      this.dataSource.data = data
      this.ReportHistory = [];
      data.forEach(item => {
        let a = item.payload.key;
        this.ReportHistory!.push(a as ReportHistory);
        console.log(item.payload.val());
      })
    })
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
    this.router.navigate(['report', report.key]);
  }

}
