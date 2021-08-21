import { Component, OnInit } from '@angular/core';


export interface ReportHistory {
  id: any;
  report_id: string;
  reporter_name: string;
  date: string;
  location: string;
  contact_number: string;
}

const ELEMENT_DATA: ReportHistory[] = [
  {id: "1", report_id: '44d4cde53e47', reporter_name: 'Levi', contact_number: '09123456789', location: 'Manila', date: 'Mar 12 2012 15:00:00'},
  {id: "2", report_id: 'de6d34eb3573', reporter_name: 'Jason', contact_number: '09123456789',  location: 'Manila',date: 'Mar 13 2012 12:00:00'},
  {id: '3', report_id: '074731d8f757', reporter_name: 'Nino', contact_number: '09123456789',  location: 'Manila',date: 'Mar 14 2012 11:00:00'},
  {id: '4', report_id: '41eb63b3a0ab', reporter_name: 'Deric', contact_number: '09123456789',  location: 'Manila',date: 'Mar 15 2012 09:00:00'},
  {id: '5', report_id: '1d899c04de28', reporter_name: 'reporter 5', contact_number: '09123456789',  location: 'Manila',date: 'Mar 15 2012 19:00:00'}
];

@Component({
  selector: 'app-incoming-report',
  templateUrl: './incoming-report.component.html',
  styleUrls: ['./incoming-report.component.css']
})
export class IncomingReportComponent implements OnInit {
  displayedColumns: string[] = ['id', 'report_id', 'reporter_name', 'contact_number', 'location', 'date', 'actions'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
    console.log(this.dataSource)
  }

}
