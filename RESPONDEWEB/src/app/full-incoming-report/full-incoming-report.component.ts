import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable, Subject } from 'rxjs';
import * as firebase from 'firebase';
import { AuthService } from '../auth.service';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-full-incoming-report',
  templateUrl: './full-incoming-report.component.html',
  styleUrls: ['./full-incoming-report.component.css']
})
export class FullIncomingReportComponent implements OnInit {

  map:any;
  lat:any;
  lng:any;

  public report_uid: any;
  public report_name: any;
  public report_address: any;
  public report_contact: any;
  public report_option: any;
  public report_date: any;

  report: any;

  reports?: Observable<any[]>;
  constructor(private db: AngularFireDatabase, private route: ActivatedRoute, private authService: AuthService) { 
   

  }

  ngOnInit() {

    this.reports = this.db.list('IncomingReport').valueChanges();

    // get uid
    let id = (this.route.snapshot.paramMap.get('uid'));
    this.report_uid = id;
    // get incoming report info
    if (id) this.authService.get(id).valueChanges().subscribe(r => {
      this.report = r;
      this.report_name = this.report.name;
      this.report_address = this.report.address;
      this.report_contact = this.report.contact;
      this.report_option = this.report.option;
      this.report_date = this.report.date;
      this.lng=this.report.long
      this.lat= this.report.lat
      console.log(this.lat);

      const mapproperties={
        center: {lat:this.report.lat, lng:this.report.long},
        zoom:18,
      };
      let loader = new Loader({apiKey:'AIzaSyCJkK42-ShnYgB3jlwtxWwZeP0B5b3suGY'})
      loader.load().then(()=>{
        this.map = new google.maps.Map(document.getElementById('map')!,mapproperties);
        var marker = new google.maps.Marker({
          position:{lat:this.report.lat,lng:this.report.long},
          map:this.map,
          label:"A"
        })
      })
      
    });
      

    

  
  }

}
