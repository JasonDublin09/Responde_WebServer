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

  public report_uid: any;
  public report_name: any;
  public report_address: any;
  public report_contact: any;
  public report_option: any;
  public report_date: any;
  
  notes: any;
  report: any;

  reports?: Observable<any[]>;
  constructor(private db: AngularFireDatabase, private route: ActivatedRoute, private authService: AuthService) {

    
  }

  ngOnInit(): void {

    this.reports = this.db.list('ReportHistory').valueChanges();

    // get uid
    let id = (this.route.snapshot.paramMap.get('uid'));
    this.report_uid = id;
    // get incoming report info
    if (id) this.authService.getArchive(id).valueChanges().subscribe(r => {
      this.report = r;
      this.report_name = this.report.name;
      this.report_address = this.report.address;
      this.report_contact = this.report.contact;
      this.report_option = this.report.option;
      this.report_date = this.report.date;
      console.log(r);
    });
  }


  editNote(event: Event): string{
    const editedNote = (event.target as HTMLInputElement).value;

    /* if (this.report_uid) this.authService.getArchive(this.report_uid)
      .update(this.report,{notes: this.notes}); */
    console.log(editedNote);
    return (event.target as HTMLInputElement).value;
  }

}
