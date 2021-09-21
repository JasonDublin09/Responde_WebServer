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


export interface ReportHistory {
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
  selector: 'app-report-history',
  templateUrl: './report-history.component.html',
  styleUrls: ['./report-history.component.css']
})

export class ReportHistoryComponent implements OnInit {
  displayedColumns: string[] = ['uid', 'name', 'address', 'contact', 'date', 'actions'];
  dataSource : any;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  reports?: Observable<any[]>;
  constructor(private db: AngularFireDatabase, private router: Router) { 
    // db collection name
    this.reports = db.list('ReportHistory').valueChanges();  
    
  }

  destroy$:Subject<void> = new Subject(); 
  ngOnInit() {

    this.dataSource = new MatTableDataSource([]);
    this.db.list('ReportHistory').valueChanges().pipe(
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
    this.router.navigate(['report', report.uid]);
  }

}
