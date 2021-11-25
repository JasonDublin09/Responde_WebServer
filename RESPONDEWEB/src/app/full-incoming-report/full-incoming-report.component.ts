import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable, Subject } from 'rxjs';
import * as firebase from 'firebase';
import { AuthService } from '../auth.service';
import { Loader } from '@googlemaps/js-api-loader';
import {AngularFireFunctions} from '@angular/fire/functions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-full-incoming-report',
  templateUrl: './full-incoming-report.component.html',
  styleUrls: ['./full-incoming-report.component.css']
})
export class FullIncomingReportComponent implements OnInit {
  @ViewChild('closebutton') closebutton;

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
  constructor(private db: AngularFireDatabase, private route: ActivatedRoute, private authService: AuthService, private router: Router, private afFun:AngularFireFunctions,private modalService:NgbModal) { 
  
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
      
      console.log(this.report.emcon)
      
      
      const call = this.afFun.httpsCallable("sendText");
      // this.report.emcon.forEach(element => {
      //   call(this.report)
        
      // });
      call(this.report).subscribe(response=>{
        console.log(response)
        this.authService.get(this.report_uid).update({status: "Responded", status2:"Responded"});
        this.router.navigateByUrl('/incomingreport');
      });
      
      
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
  onSelect(content){
   
    this.modalService.open(content, { centered: true });
  }

  requestassist(){
    if (this.report_uid) this.authService.get(this.report_uid).snapshotChanges().subscribe(data => {

      console.log(this.report.emcon)
      const call = this.afFun.httpsCallable("sendText");
      const request = this.afFun.httpsCallable("fireText");
      const confirm = this.afFun.httpsCallable('confirmText')

      
      request(this.report).subscribe(()=> console.log("send request assist"));
      //call(this.report).subscribe(()=> console.log("sent report"));
      //confirm(this.report).subscribe(()=> console.log("sent confirm"));
      this.authService.get(this.report_uid).update({status: "Responded", status2:"Responded"});
      this.router.navigateByUrl('/incomingreport');
      this.close();

      
  }
    )

     
  }
  close(){
    this.modalService.dismissAll()
  }
  sendreport(){
    if (this.report_uid) this.authService.get(this.report_uid).snapshotChanges().subscribe(data => {
      
      console.log(this.report.emcon)
      const call = this.afFun.httpsCallable("sendText");
      const confirm = this.afFun.httpsCallable('confirmText');

      call(this.report).subscribe(()=> console.log("sent report"));
      //confirm(this.report).subscribe(()=> console.log("sent confirm"));
      this.authService.get(this.report_uid).update({status: "Responded", status2:"Responded"});
      this.router.navigateByUrl('/incomingreport');
      this.close();
      

    })
  }
}
