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


export interface IncomingReport {
  uid?: string;
  address?: string;
  contact?: string;
  date?: string;
  lat?: string;
  long?: string;
  name?: string;
  option?: string;
};


@Component({
  selector: 'app-incoming-report',
  templateUrl: './incoming-report.component.html',
  styleUrls: ['./incoming-report.component.css']
})

export class IncomingReportComponent implements OnInit {
  displayedColumns: string[] = ['uid', 'name', 'address', 'contact', 'date', 'actions'];
  dataSource : any;
  key : any;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  reports?: Observable<any[]>;
  constructor(private db: AngularFireDatabase, private router: Router) { 
    // db collection name
    this.reports = db.list('IncomingReport').valueChanges();
    
  }

  destroy$:Subject<void> = new Subject(); 
  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.db.list('IncomingReport').valueChanges().pipe(
      takeUntil(this.destroy$)
  ).subscribe(data => this.dataSource.data = data);
  }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  

  ngOnDestroy() {
    this.destroy$.next();
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
    this.router.navigate(['incoming-report', report.uid]);
  }

}
