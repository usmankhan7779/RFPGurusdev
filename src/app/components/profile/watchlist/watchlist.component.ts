import { AdvanceService } from './../../other/advance-search/advance.service';
import { HomeService } from './../../common/home/home.service';
import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../common/header/header.service';
import { SharedData } from '../../../services/shared-service';
import { Router } from '@angular/router';
import { RfpService } from '../../single/single-rfp/rfp.service';
import swal from 'sweetalert2';
import * as moment from 'moment';
import { Location } from '@angular/common';
import { SeoService } from 'src/app/services/seoService';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss',
  '../../local-style/table-normal.css',
  '../../local-style/products-area.css'
]
})
export class WatchlistComponent implements OnInit {
  date;
  back() {
    this._location.back();
  }
  check(date) {

    this.date = moment(date, this.formats, true).isValid()

    return this.date;


  }
  formats = [
    moment.ISO_8601,
    "YYYY/MM/DD"
  ];
  wrfp;
  message;
  total;
  constructor(private advanceServ: AdvanceService, private homeServ: HomeService, private _nav: Router, private _serv: HeaderService, public _shareData: SharedData, private _serv1: RfpService, private _location: Location, private seoService: SeoService) { }

  ngOnInit() {
    window.scroll(0, 0);

    // --------------- SEO Service ---------------
    // setting the page title 
    this.seoService.setTitle('Watchlist');

    // Updating Open Graph
    this.seoService.updateOGTitle('Watchlist');
    this.seoService.updateOGURL(window.location.href);

    // setting CanonicalURL
    this.seoService.createLinkForCanonicalURL();

    // setting twitter
    this.seoService.updateTwitterTitle('Watchlist');

    // --------------- SEO Service End ---------------
    this._shareData.currentMessage.subscribe(message => this.wrfp = message)
    this.watchlist();
    this.check_login();
  }
  move() {
    localStorage.setItem('location', 'my-watchlist')
  }
  watchlist() {
    this._serv.Watchlist().subscribe(

      data => {
        this.wrfp = data['result'];
        this.message = data['message'];
        this.total = data['total']
        if (!data['message'] && data['result']) {

          this._shareData.watchtotal(this.total);
          this._shareData.watchInfo(this.wrfp);
        }
        if (data['message'] == 'No Rfp in your Watch List') {
          this._shareData.watchtotal(this.total);
          this._shareData.watchInfo(this.wrfp);
        }
      },
      error => {
      });
  }

  id;
  title;
  get(id, title) {
    this.id = id;
    this.title = title
  }
  deletewatchlist() {
    swal({
      title: 'Are you sure you want to delete from watchlist? <br> You will not be able to revert this!',
      type: 'question',
      showCancelButton: true,
      width: '512px',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result == true) {
        this._serv.deleteWatchlist(this.id).subscribe(

          data => {
            this.watchlist();

          },
          error => {
          });
      }
    })
  }
  All_deletewatchlist() {
    swal({
      title: 'Are you sure you want to delete watchlist? <br> You will not be able to revert this!',
      type: 'question',
      showCancelButton: true,
      width: '512px',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      // alert(result)
      if (result == true) {
        this._serv.AlldeleteWatchlist().subscribe(
          data => {
            swal({
              type: 'success',
              title: 'Your Watch List Successfully Clear',
              showConfirmButton: false,
              timer: 2500, width: '512px',

            });
            this.watchlist();
          },
          error => {
          });
      }
    })
  }
  singlerfp(query) {
    let sth = 'rfp/' + query;
    this._nav.navigate([sth]);
  }
  local;
  uname;
  subscribe;
  doc;
  check_trial(url) {
    if (this.subscribe == "Trial Subscription user") {
      this.advanceServ.trial_document().subscribe(
        data => {

          if (data['status'] == 'True') {
            this.doc = data['status'];
            window.open(url, '_blank');
            return true

          } else {

            return false;
          }

        })
    } else if (this.subscribe == "Subscribe user") {

      window.open(url, '_blank');
      return true
    }

  }
  check_login() {
    if (localStorage.getItem('currentUser')) {
      this.local = localStorage.getItem('currentUser');
      let pars = JSON.parse(this.local);
      this.uname = pars.username
      this.homeServ.usersubscribe(this.uname).subscribe(
        data => {
          if (data['Response'] == "Subscribe user" || data['Response'] == "Trial Subscription user") {
            this.subscribe = data['Response']
            return false
          }
        });
    }
    else {
      return true
    }
  }

}
