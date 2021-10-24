import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable, Subject } from 'rxjs';
import * as firebase from 'firebase';
import { AuthService } from '../auth.service';
import { Loader } from '@googlemaps/js-api-loader';
import {AngularFireFunctions} from '@angular/fire/functions';

@Component({
  selector: 'app-full-incoming-report',
  templateUrl: './full-incoming-report.component.html',
  styleUrls: ['./full-incoming-report.component.css']
})
export class FullIncomingReportComponent implements OnInit {

  map:any;
  lat:any;
  lng:any;
  report: any;
  incomingRef: any;
  historyRef: any;

  public report_uid: any;
  public report_name: any;
  public report_address: any;
  public report_contact: any;
  public report_option: any;
  public report_date: any;

  selectedReason: string = '';
  reasons: any = ['Duplicate Report', 'False Alarm', 'Forwarded to other Station', 'Fake Report'];

  reports?: Observable<any[]>;
  constructor(private db: AngularFireDatabase, private route: ActivatedRoute, private authService: AuthService, private router: Router, private afFun:AngularFireFunctions) { 
  
  }

  ngOnInit() {
    

    this.reports = this.db.list('IncomingReport').valueChanges();

    // get uid
    let id = (this.route.snapshot.paramMap.get('uid'));
    this.report_uid = id;
    this.incomingRef = this.db.list('IncomingReport' + this.report_uid);
    this.historyRef = this.db.list('ReportHistory' + this.report_uid);
    // get incoming report info
    if (id) this.authService.get(id).valueChanges().subscribe(r => {
      this.report = r;
      this.report_name = this.report.name;
      this.report_address = this.report.home;
      this.report_contact = this.report.contact;
      this.report_option = this.report.option;
      this.report_date = this.report.date;
      this.lng=this.report.lng
      this.lat= this.report.lat
      console.log(this.lat);
      console.log(this.report.lat);

      const mapproperties={
        center: {lat:this.report.lat, lng:this.report.lng},
        zoom:18,
      };
      let loader = new Loader({apiKey:'AIzaSyCJkK42-ShnYgB3jlwtxWwZeP0B5b3suGY'})
      loader.load().then(()=>{
        this.map = new google.maps.Map(document.getElementById('map')!,mapproperties);
        var marker = new google.maps.Marker({
          position:{lat:this.report.lat,lng:this.report.lng},
          map:this.map,
          label:"A"
        })
      })

      
      
    });

  }

  respondReport(){
    if (this.report_uid) this.authService.get(this.report_uid).snapshotChanges().subscribe(data => {
      
      
      this.authService.get(this.report_uid).update({status: "Responded", status2:"Responded"});
      const call = this.afFun.httpsCallable("sendText");
      call("+639983740321").subscribe(response=>{
        console.log(response)
        this.router.navigateByUrl('/incomingreport');
      });

      // I think it really wouldn't work kasi you're already routing away before it finishes the call
      // I am not sure if the code on the index.js works ah, it's not tested, so you have to test it muna
      // Sige sigeeeeee hmu when errors persist
      // Also, pakibago line 88 to an array ah and don't forget to comment out your previous code sa index.js
      // 🙇‍♂️🙇‍♂️🙇‍♂️ imma be leavin gambateeee!!!
      
      //the response doesnt work.. its just there for the confirm that i pressed it 
      //yeah i have to test it pa... and check din if the google console can take multiple reports 
      //apparently kasi sending way to many causes the console to slow down even the logs doesnt respond verry well
      // yeah i'll try that out later thanks 

      //okay i'll do that 
      //okay thanks
    });
    
    
  }

  declineReport(){
    if (this.report_uid) this.authService.get(this.report_uid).snapshotChanges().subscribe(data => {

      if (this.selectedReason != ''){
        this.authService.get(this.report_uid).update({status: "Responded", status2:"Declined", reason: this.selectedReason});
        this.router.navigateByUrl('/incomingreport');
      } else{
        alert('A reason must be selected to confirm the declination of report.')
      }
    });
  }

  radioChangeHandler (event: any){
    this.selectedReason = event.target.value;
  }

}
