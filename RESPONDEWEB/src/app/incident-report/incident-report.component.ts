import { Component, OnInit, ViewChild, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/* For Table with sorting, pagination, and filtering */
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import { Routes, RouterModule, Router} from '@angular/router';
import { AuthService } from '../auth.service';
import { AliasStrategy } from '@angular/compiler-cli/src/ngtsc/imports';
/* form */



export interface IncidentReport {
  key?: string;
  address?: string;
  casualtyCivilian?: string;
  casualtyFirefighter?: string;
  date_incident?: string;
  date_prepared?: string;
  house?: string;
  injuredCivilian?: string;
  injuredFirefighter?: string;
  name?: string;
  other?: string;
  time_extinguised?: string;
  time_start?: string;
};
@Component({
  selector: 'app-incident-report',
  templateUrl: './incident-report.component.html',
  styleUrls: ['./incident-report.component.css']
})

export class IncidentReportComponent implements AfterViewInit {

  displayedColumns: string[] = ['key','date_prepared','name','address','date_incident','house','injuredCivilian','casualtyCivilian',
  'injuredFirefighter','casualtyFirefighter','time_start','time_extinguished','other'];

  IncidentReport?:  IncidentReport[];
  dataSource : any;

  public date_prepared: any;
  public name: any;
  public address: any;
  public date_incident: any;
  public house: any;
  public injuredCivilian: any;
  public casualtyCivilian: any;
  public injuredFirefighter: any;
  public casualtyFirefighter: any;
  public time_start: any;
  public time_extinguished: any;
  public other: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('myModalClose') modalClose;

  constructor(private db: AngularFireDatabase, private authService: AuthService, private router:Router) { }
  
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<IncidentReport>([]);
    console.log(this.dataSource);
    console.log(this.dataSource.filteredData);

    this.db.list('IncidentReport/')
    .snapshotChanges().subscribe(data => {
      this.dataSource.data = data;
      
      this.IncidentReport = [];
      data.forEach(item => {
        let a = item.payload.key;
        let val:any = item.payload;
        
        this.IncidentReport!.push(val as IncidentReport);
        
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
  onSubmit(){
    let date_prepared = (<HTMLInputElement>document.getElementById("dateprepared")).value;
    let name = (<HTMLInputElement>document.getElementById("name")).value;
    let address = (<HTMLInputElement>document.getElementById("address")).value;
    let date_incident = (<HTMLInputElement>document.getElementById("incidentdate")).value;
    let house = (<HTMLInputElement>document.getElementById("houses")).value;
    let injuredCivilian = (<HTMLInputElement>document.getElementById("injuredcivil")).value;
    let casualtyCivilian = (<HTMLInputElement>document.getElementById("casualtycivil")).value;
    let injuredFirefighter = (<HTMLInputElement>document.getElementById("injuredresponder")).value;
    let casualtyFirefighter = (<HTMLInputElement>document.getElementById("casualtyresponder")).value;
    let time_start = (<HTMLInputElement>document.getElementById("start")).value;
    let time_extinguished = (<HTMLInputElement>document.getElementById("ext")).value;
    let other = (<HTMLInputElement>document.getElementById("other")).value;

    this.date_prepared = date_prepared
    this.name = name
    this.address = address
    this.date_incident = date_incident
    this.house = house
    this.injuredCivilian = injuredCivilian
    this.casualtyCivilian = casualtyCivilian
    this.injuredFirefighter = injuredFirefighter
    this.casualtyFirefighter = casualtyFirefighter
    this.time_start = time_start
    this.time_extinguished = time_extinguished
    this.other = other;

    if (date_prepared != "" && name != "" && address != "" && date_incident != "" && house != "" && injuredCivilian != "" &&
        casualtyCivilian != "" && injuredFirefighter != "" && casualtyFirefighter != "" && time_start != "" && time_extinguished != "") {
          // success

          this.authService.getIncidentReportList()
            .push({date_prepared:this.date_prepared, name:this.name, address:this.address, date_incident:this.date_incident,
            house:this.house, injuredCivilian:this.injuredCivilian, casualtyCivilian:this.casualtyCivilian, injuredFirefighter:this.injuredFirefighter,
            casualtyFirefighter:this.casualtyFirefighter, time_start:this.time_start, time_extinguished:this.time_extinguished, other:this.other});

          alert('Incident Report created successfully!');
          this.modalClose.nativeElement.click();
    } else{
      alert("Please fill out the whole form.");
    }
    
  }

  

}
