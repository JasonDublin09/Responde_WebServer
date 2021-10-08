import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-full-archived-report',
  templateUrl: './full-archived-report.component.html',
  styleUrls: ['./full-archived-report.component.css']
})
export class FullArchivedReportComponent implements OnInit {

  map:any;
  lat:any;
  lng:any;

  public report_uid: any;
  public report_name: any;
  public report_address: any;
  public report_contact: any;
  public report_option: any;
  public report_date: any;
  public report_notes: any;
  public report_email: any;
  public report_status: any;

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
      this.report_status = this.report.status;
      this.lng=this.report.lng
      this.lat= this.report.lat
      this.report_notes = this.report.notes[0].notes;
      console.log(r);
    });

    
  }

  editNote(){
    
    if (this.report_uid) this.authService.updateNote(this.report_uid, {notes: this.detailItems});
    this.report_notes = this.detailItems[0].notes;
    console.log(this.report_notes);
  }

  setTitleEdit(item) {
    item.canEditCode = true;
  }
}
