import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable, Subject } from 'rxjs';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-full-archived-report',
  templateUrl: './full-archived-report.component.html',
  styleUrls: ['./full-archived-report.component.css']
})
export class FullArchivedReportComponent implements OnInit {

  map:any;
  lat:any;
  lng:any;
  value = '';
  public report_uid: any;
  public report_name: any;
  public report_address: any;
  public report_contact: any;
  public report_option: any;
  public report_date: any;
  public report_notes: any;
  public report_email: any;
  public report_status: any;
  public report_reason: any;

  report: any;

  detailItems :any[] = [{notes: ""}];
  //detailItems :any = "";

  reports?: Observable<any[]>;
  constructor(private db: AngularFireDatabase, private route: ActivatedRoute, private authService: AuthService) {
    
  }

  ngOnInit(): void {

    //this.reports = this.db.list('ReportHistory').valueChanges();

    // get uid
    let id = (this.route.snapshot.paramMap.get('uid'));
    this.report_uid = id;
    // get info
    if (id) this.authService.get(id).valueChanges().subscribe(r => {
      this.report = r;
      this.report_name = this.report.name;
      this.report_address = this.report.home;
      this.report_contact = this.report.contact;
      this.report_option = this.report.option;
      this.report_date = this.report.date;
      this.report_email = this.report.email;
      this.lng=this.report.lng
      this.lat= this.report.lat
      if(this.report.notes != null){
        this.report_notes = this.report.notes[0].notes;
      }
      //this.report_notes = this.report.notes[0].notes;
      if(this.report.status == 'Responded' && this.report.status2 == 'Declined'){
        this.report_status = this.report.status2;
        this.report_reason = this.report.reason;
      } else{
        this.report_status = this.report.status;
      }
      console.log(r);

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

  editNote(){
    
    
    if(window.confirm('Do you want to save changes to the report notes?')){
      if (this.report_uid) this.authService.updateNote(this.report_uid, {notes: this.detailItems});
      this.report_notes = this.detailItems[0].notes;
      console.log(this.report_notes);
    }
  }

  setTitleEdit(item) {
    item.canEditCode = true;
  }

}
