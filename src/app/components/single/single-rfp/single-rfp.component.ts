import { AdvanceService } from './../../other/advance-search/advance.service';
import { HomeService } from './../../common/home/home.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/filter';
import { RfpService } from './rfp.service';
import swal from 'sweetalert2';
import 'rxjs/Rx';
import { SharedData } from '../../../services/shared-service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';
import { SeoService } from '../../../services/seoService';

@Component({
  selector: 'app-data-table-cmp',
  templateUrl: 'single-rfp.component.html',
  styleUrls: ['./single-rfp.component.css',
  '../../local-style/table-normal.css',
  '../../local-style/products-area.css'
]
})

export class SingleRfpComponent implements OnInit {
  date;
  check(date) {

    this.date = moment(date, this.formats, true).isValid()
    //    
    return this.date;
  }
  formats = [
    moment.ISO_8601,
    "YYYY/MM/DD"
  ];
  rfpid: string;
  id;
  record;
  statuss;
  local;
  uname;
  subscribe;
  currentUser;
  wrfp;
  constructor(private advanceServ: AdvanceService, private homeServ: HomeService, public dialog: MatDialog, private _nav: Router, public _shareData: SharedData, private route: ActivatedRoute, private _serv: RfpService, private seoService: SeoService, ) {
    localStorage.removeItem('member');
  }
  back() {
    if (localStorage.getItem('location')) {
      let url = localStorage.getItem('location')
      let last = url.length
      let ur = url.slice(0, 13)
      let state = url.slice(0, 5)
      let category = url.slice(0, 8)
      let agency = url.slice(0, 6)

      if (ur == 'searched-data') { this._nav.navigate([ur], { queryParams: { keyword: url.slice(13, last) } }); }
      else if (state == 'state') {
        this._nav.navigate([state], { queryParams: { state: url.slice(5, last) } });
      }
      else if (category == 'category') {
        this._nav.navigate([category], { queryParams: { cat: url.slice(8, last) } });
      }
      else if (agency == 'agency') {

        this._nav.navigate([agency], { queryParams: { agency: url.slice(6, last) } });
      } else if (url == 'admin-panel') {
        this._nav.navigate([url]);
      }
      else {
        this._nav.navigate([url]);
      }
    }
    else {
      this._nav.navigate(['/']);
    }

  }

  status: boolean = false;
  navbarClass() {
    this.status = !this.status;
  }

  download(info) {
    this._serv.downloadFile(info).subscribe(
      data => {
        if (data['status'] = "200") {
          swal(
            'File Downloaded Successfully!',
            '',
            'success'
          )
        }
      });
  }
  memberonly() {
    this.route.queryParams
      .subscribe(params => {
        if (!this.local) {
          this._nav.navigate(['login']);
          this.rfpid = params['query'];
          localStorage.setItem('member', this.rfpid);
        }
        else if (!this.subscribe) {
          this._nav.navigate(['pricing']);
          this.rfpid = params['query'];
          localStorage.setItem('member', this.rfpid);
        }

      })
  }
  adminlogin;
  ngOnInit() {
    window.scroll(0, 0);
    if (localStorage.getItem('currentadmin')) {
      this.adminlogin = localStorage.getItem('currentadmin')
    }
    this._shareData.currentMessage.subscribe(message => this.wrfp = message)
    this._shareData.currentMessagetotal.subscribe(message => this.total = message)
    this.route.queryParams
      .subscribe(params => {


        // --------------- SEO Service ---------------
        // setting the page title 
        this.seoService.setTitle(params['query']);

        // Updating Open Graph
        this.seoService.updateOGTitle(params['query']);
        this.seoService.updateOGURL(window.location.href);

        // setting CanonicalURL
        this.seoService.createLinkForCanonicalURL();

        // setting twitter
        this.seoService.updateTwitterTitle(params['query']);

        this.seoService.updateTwitterTitle('rfp bid sites,rfp bidding sites, bid sites, rfp usa, government rfp website, rfp consulting firm, rfp consulting firm in dallas, rfp project management, rfp project management services, rfp search engine, rfp project management services, rfp proposal, rfp consulting, government rfp, digital marketing rfp, rfp management, website rfp example, rfp services, rfp for audit services, agency rfp, best rfp software, data management rfp, energy efficiency rfp, rfp for property management services, energy storage rfp, rfp business, rfp contract terms, rfp government bids, government rfp search, rfp aggregator, best rfp database, rfp database, government rfp database, rfp sites, rfp online, find rfp, find rfp bid sites, find rfp bid, find rfp bids, Government Request for Proposal, rfp search, rfp process, marketing rfp database, architectural rfp database, architectural design bids, bid finder, government bids, government contracts, contract bidding websites, construction bidding websites, best construction bid sites, free rfp bid sites, public rfp database')

        // --------------- SEO Service End ---------------


        this.rfpid = params['query'];

        this._serv.rfprecord(this.rfpid, params.model).subscribe(
          data => {
            this.record = data;
            this.id = data[0].id
          });
      })

    this.check_login()

  }
  total;
  watchlist() {
    if (localStorage.getItem('currentUser')) {
      this._serv.postWatchlist(this.id).subscribe(

        data => {
          this.statuss = data['message'];
          this.wrfp = data['result'];
          this.total = data['total']
          //  this.global.getGolbalWishListCourses(this.GlobalWishListCourses);
          if (!data['message'] && data['result']) {
            this._shareData.watchtotal(this.total);
            this._shareData.watchInfo(this.wrfp);
          }
          if (this.statuss == "This Rfp is already in your Watch List") {
            swal({
              type: 'info',
              title: 'This RFP Is Already In Your Watchlist',
              showConfirmButton: true,
              confirmButtonColor: "#090200",
              width: '512px',

            });
          }
          else {
            swal({
              type: 'success',
              title: 'RFP successfully added to your watch list',
              showConfirmButton: true,
              confirmButtonColor: "#090200",
              width: '512px',
            });
          }
        });
    }
    else {
      swal({
        type: 'error',
        title: 'Please Login with RFPGurus',
        showConfirmButton: true,
        width: '512px',
        confirmButtonColor: "#090200",
      });

      this.route.queryParams
        .subscribe(params => {
          this._nav.navigate(['login']);
          this.rfpid = params['query'];
          localStorage.setItem('member', this.rfpid);
        });
    }


  }
  doc;
  check_trial(url) {
    if (this.subscribe == "Trial Subscription user") {
      this.advanceServ.trial_document().subscribe(
        data => {

          if (data['status'] == 'True') {
            this.doc = data['status'];
            window.open(url, '_blank');
          } else {
            swal({
              type: 'error',
              title: "You can't download more documents",
              showConfirmButton: true,
              width: '512px',
              confirmButtonColor: "#090200",
            });
          }
        })
    }
    else if (this.subscribe == "Subscribe user") {
      window.open(url, '_blank');
    }
  }
  check_login() {
    if (localStorage.getItem('currentadmin')) {
      this.subscribe = localStorage.getItem('currentadmin')
    }
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
