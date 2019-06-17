import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../../common/header/header.service';
import { SharedData } from '../../../services/shared-service';
import swal from 'sweetalert2';
import { SeoService } from 'src/app/services/seoService';

@Component({
  selector: 'app-allnotification',
  templateUrl: './allnotification.component.html',
  styleUrls: ['./allnotification.component.scss',
  '../../local-style/plan-detail.css'],
  providers: [HeaderService, SharedData]
})
export class AllnotificationComponent implements OnInit {
  id;
  title;
  constructor(private _nav: Router, public _shareData: SharedData, private _serv: HeaderService, private seoService: SeoService) { }

  ngOnInit() {
    window.scroll(0, 0);

    // --------------- SEO Service ---------------
    // setting the page title 
    this.seoService.setTitle('All Notification');

    // Updating Open Graph
    this.seoService.updateOGTitle('All Notification');
    this.seoService.updateOGURL(window.location.href);

    // setting CanonicalURL
    this.seoService.createLinkForCanonicalURL();

    // setting twitter
    this.seoService.updateTwitterTitle('All Notification');

    // --------------- SEO Service End ---------------

    this.notification();
    this._shareData.notification.subscribe(message => this.notificate = message)
    this._shareData.unreadnotification.subscribe(message => this.unread = message)
  }
  get(id, title) {
    this.id = id;
    this.title = title
  }
  notificate;
  unread;
  total_notification;
  deletenofication(id) {
    this._serv.deletenotify(id).subscribe(
      data => {

        // alert(data)
        this.notification();
      },
      error => {

      });
  }
  updatenofication(id) {
    this._serv.Updatenotify(id).subscribe(
      data => {
        this.notification();
      },
      error => {

      });
  }
  move() {
    localStorage.setItem('location', 'notifications')
  }
  single(query) {

    let requiredUrl = 'rfp'
    this._nav.navigate([requiredUrl], { queryParams: { query: query } });
  }
  notification() {
    this._serv.notify().subscribe(
      data => {
        // alert(data)
        this.notificate = data['notifications'];
        this.unread = data['unread'];
        this._shareData.notifyInfo(this.notificate);
        this._shareData.unreadnotifyInfo(this.unread);

      },
      error => {
      });
  }
  deleteallnotification() {
    this._serv.deleteallnotify().subscribe(
      data => {
        swal({
          type: 'success',
          title: 'All Notifications Successfully Deleted.',
          showConfirmButton: false,
          timer: 2500, width: '512px',
        });
        this.notification()
      },
      error => {
      });
  }
}
