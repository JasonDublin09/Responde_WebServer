import { Component, OnInit, ViewChild } from '@angular/core';

/* For Table with sorting, pagination, and filtering */
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { DataSource } from '@angular/cdk/table';




@Component({
  selector: 'app-report-history',
  templateUrl: './report-history.component.html',
  styleUrls: ['./report-history.component.css']
})

export class ReportHistoryComponent{
  displayedColumns: string[] = ['id', 'report_id', 'reporter_name', 'date', 'status', 'actions'];
  dataSource = ELEMENT_DATA;

  constructor() { 
  }

  ngOnInit(): void {
    console.log(this.dataSource)
  }

   /* from https://material.angular.io/components/table/overview#pagination
 */
  @ViewChild(MatPaginatorModule) paginator: MatPaginatorModule;
  @ViewChild(MatSortModule) sort: MatSortModule;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }
  
   

  /* from https://github.com/angular/components/issues/10205 */
  /* private paginator: MatPaginatorModule;
  private sort: MatSortModule;

  @ViewChild(MatSortModule) set matSort(ms: MatSortModule) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginatorModule) set matPaginator(mp: MatPaginatorModule) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.paginator && this.sort) {
      this.applyFilter('');
    }
  }
} */

export interface ReportHistory {
  id: any;
  report_id: string;
  reporter_name: string;
  date: string;
  status: string;
}

const ELEMENT_DATA: ReportHistory[] = [
  {id: "1", report_id: '44d4cde53e47', reporter_name: 'Levi', date: 'Mar 12 2012 15:00:00', status: 'Responded'},
  {id: "2", report_id: 'de6d34eb3573', reporter_name: 'Jason', date: 'Mar 13 2012 12:00:00', status: 'Responded'},
  {id: '3', report_id: '074731d8f757', reporter_name: 'Nino', date: 'Mar 14 2012 11:00:00', status: 'Responded'},
  {id: '4', report_id: '41eb63b3a0ab', reporter_name: 'Deric', date: 'Mar 15 2012 09:00:00', status: 'Responded'},
  {id: '5', report_id: '1d899c04de28', reporter_name: 'reporter 5', date: 'Mar 15 2012 19:00:00', status: 'Responded'}
];





