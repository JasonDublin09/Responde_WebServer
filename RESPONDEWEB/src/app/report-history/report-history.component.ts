import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

/* For Table with sorting, pagination, and filtering */
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface ReportHistory {
  id: any;
  report_id: string;
  reporter_name: string;
  date: string;
  status: string;
};

const REPORT_DATA: ReportHistory[] = [
  {id: "1", report_id: '44d4cde53e47', reporter_name: 'Levi', date: 'Mar 12 2012 15:00:00', status: 'Responded',},
  {id: "2", report_id: 'de6d34eb3573', reporter_name: 'Jason', date: 'Mar 13 2012 12:00:00', status: 'Responded'},
  {id: '3', report_id: '074731d8f757', reporter_name: 'Nino', date: 'Mar 14 2012 11:00:00', status: 'Responded'},
  {id: '4', report_id: '41eb63b3a0ab', reporter_name: 'Deric', date: 'Mar 15 2012 09:00:00', status: 'Responded'},
  {id: '5', report_id: '1d899c04de28', reporter_name: 'reporter 5', date: 'Mar 15 2012 19:00:00', status: 'Responded'},
  {id: '6', report_id: '1d899c04de28', reporter_name: 'reporter 5', date: 'Mar 15 2012 19:00:00', status: 'Responded'},
  {id: '7', report_id: '1d899c04de28', reporter_name: 'reporter 5', date: 'Mar 15 2012 19:00:00', status: 'Responded'},
  {id: '8', report_id: '1d899c04de28', reporter_name: 'reporter 5', date: 'Mar 15 2012 19:00:00', status: 'Responded'},
  {id: '9', report_id: '1d899c04de28', reporter_name: 'reporter 5', date: 'Mar 15 2012 19:00:00', status: 'Responded'},
  {id: '10', report_id: '1d899c04de28', reporter_name: 'reporter 5', date: 'Mar 15 2012 19:00:00', status: 'Responded'},
];


@Component({
  selector: 'app-report-history',
  templateUrl: './report-history.component.html',
  styleUrls: ['./report-history.component.css']
})

/* export class ReportHistoryComponent implements OnInit */
export class ReportHistoryComponent implements AfterViewInit{
  displayedColumns: string[] = ['id', 'report_id', 'reporter_name', 'date', 'status', 'actions'];
  dataSource = new MatTableDataSource(REPORT_DATA);

  /* from https://material.angular.io/components/table/overview#pagination*/
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { 
  }

  logData(row: any){
    console.log(row);
  }

  applyFilter(event: Event): string {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    return (event.target as HTMLInputElement).value;
  }

  /* ngOnInit(): void {
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  } */


  ngAfterViewInit(): void {
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}



