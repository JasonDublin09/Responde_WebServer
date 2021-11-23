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

@Component({
  selector: 'app-incident-report',
  templateUrl: './incident-report.component.html',
  styleUrls: ['./incident-report.component.css']
})
export class IncidentReportComponent implements OnInit {

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
  public time_extinguised: any;

  constructor(private db: AngularFireDatabase, private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
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
    let time_extinguised = (<HTMLInputElement>document.getElementById("ext")).value;

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
    this.time_extinguised = time_extinguised
    if (date_prepared != "" && name != "" && address != "" && date_incident != "" && house != "" && injuredCivilian != "" &&
        casualtyCivilian != "" && injuredFirefighter != "" && casualtyFirefighter != "" && time_start != "" && time_extinguised != "") {
          // success

          this.authService.getIncidentReportList()
            .push({date_prepared:this.date_prepared, name:this.name, address:this.address, date_incident:this.date_incident,
            house:this.house, injuredCivilian:this.injuredCivilian, casualtyCivilian:this.casualtyCivilian, injuredFirefighter:this.injuredFirefighter,
            casualtyFirefighter:this.casualtyFirefighter, time_start:this.time_start, time_extinguised:this.time_extinguised});

          alert('Incident Report created successfully!');
          window.location.reload();
    } else{
      alert("Please fill out the whole form.");
    }
    
  }

}
