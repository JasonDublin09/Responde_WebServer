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
  selector: 'app-incoming-report',
  templateUrl: './incoming-report.component.html',
  styleUrls: ['./incoming-report.component.css']
})

export class IncomingReportComponent implements OnInit {
  displayedColumns: string[] = ['key','name','home','contact','date','actions'];
  dataSource : any;
  IncomingReport?:  IncomingReport[];

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private db: AngularFireDatabase, private router: Router, private authService: AuthService) { 
    
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    
    /* let s = this.authService.getIncomingReportList();
    s.snapshotChanges().subscribe(data => {
      this.dataSource.data = data
      this.IncomingReport = [];
      data.forEach(item => {
        let a = item.payload.key;
        this.IncomingReport!.push(a as IncomingReport);
        console.log(item.payload.val());
      })
    }) */

    this.db.list('IncomingReport/', ref => ref.orderByChild('status').equalTo(''))
    .snapshotChanges().subscribe(data => {
      this.dataSource.data = data
      this.IncomingReport = [];
      data.forEach(item => {
        let a = item.payload.key;
        this.IncomingReport!.push(a as IncomingReport);
        console.log(item.payload.val());
      })
    })

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
