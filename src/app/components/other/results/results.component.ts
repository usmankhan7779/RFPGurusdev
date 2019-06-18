import { HomeService } from './../../common/home/home.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { SharedData } from '../../../services/shared-service';
import { ResultsService } from './results.service';
import { PagerService } from '../../../services/paginator.service';
import * as moment from 'moment';
import { SeoService } from '../../../services/seoService';
import { MatDialog } from '@angular/material';
declare const $: any;
import { Location } from '@angular/common';
import { AdvanceService } from '../advance-search/advance.service';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss',
  '../../local-style/pagination.css',
  '../../local-style/table-normal.css',
  '../../local-style/products-area.css'],
  providers: [PagerService, HomeService, AdvanceService]
})

export class ResultsComponent implements OnInit, OnDestroy {
  date;
  back() {
    this._location.back();
  }
  check(date) {

    this.date = moment(date, this.formats, true).isValid()
    //    
    return this.date;


  }
  formats = [
    moment.ISO_8601,
    "YYYY/MM/DD"
  ];
  item;
  cat;
  record: any = [];
  status;
  local;
  uname;
  subscribe;
  sorted;
  constructor(private advanceServ: AdvanceService, private homeServ: HomeService, public dialog: MatDialog, private pagerService: PagerService, public _shareData: SharedData, private _nav: Router, private _serv: ResultsService, private route: ActivatedRoute, private _location: Location, private seoService: SeoService) {
    localStorage.removeItem('member');
  }
  // MatPaginator Inputs
  endRequest;
  length = 0;
  pager: any = {};

  pageSize = '10';
  pageSizeOptions = [10, 20, 35, 50];

  // MatPaginator Output
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  download(info) {
    this.endRequest = this._serv.downloadFile(info).subscribe(
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
  sort(sorted, page) {
   
    this.route.queryParams
      .subscribe(params => {
        this.cat = params.keyword
        alert(params.keyword)
        this._serv.sortby(sorted, params.keyword, page, this.pageSize).subscribe(
          data => {
            this.record = data['results'];
            this.item = data['totalItems']
            this.pager = this.pagerService.getPager(data['totalItems'], page, this.pageSize);
          })
      })
     
  }
 adminlogin;
  ngOnInit() {
    window.scroll(0, 0);
    window.onscroll = function () { myFunction() };
    var header = document.getElementById("MYHeader");
    var sticky = header.offsetTop;

    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }


    // --------------- SEO Service ---------------
    // setting the page title 
    this.seoService.setTitle('Search');

    // Updating Open Graph
    this.seoService.updateOGTitle('Search');
    this.seoService.updateOGURL(window.location.href);

    // setting CanonicalURL
    this.seoService.createLinkForCanonicalURL();

    // setting twitter
    this.seoService.updateTwitterTitle('Search');

    // --------------- SEO Service End ---------------

    if (localStorage.getItem('resultspage')) {
      var page_num: number = Number(localStorage.getItem('resultspage'));
      this.onPaginateChange(page_num);
    } else {
      this.onPaginateChange(1);
    }
    if (localStorage.getItem('currentadmin')) {
      this.adminlogin = localStorage.getItem('currentadmin')
    }
    this.check_login();

  }
  page(pageSize) {
    if (pageSize) {
      this.pageSize = pageSize;
      if (localStorage.getItem('resultspage')) {
        var page_num: number = Number(localStorage.getItem('resultspage'));
        this.onPaginateChange(page_num);
      } else {
        this.onPaginateChange(1);
      }
    }
    else {
      delete this.pageSize;
    }
  }
  move() {
    this.route.queryParams
      .subscribe(params => {
        this.cat = params.keyword
        localStorage.setItem('location', 'searched-data' + this.cat)
      })
  }
  memberonly() {
    this.route.queryParams
      .subscribe(params => {
        this.cat = params.keyword
        if (!this.local) {
          this._nav.navigate(['login']);
          localStorage.setItem('member', 'searched-data' + this.cat);
        }
        else if (!this.subscribe) {
          this._nav.navigate(['pricing']);
          localStorage.setItem('member', 'searched-data' + this.cat);
        }
      })
  }
  onPaginateChange(page) {
    localStorage.setItem('resultspage', page);
    this.route.queryParams
      .subscribe(params => {
        this.cat = params.keyword

        this._serv.searchrfprecord(this.cat, this.pageSize, page).subscribe(
          data => {
            this.record = data['results'];
            this.item = data['totalItems']
            this.pager = this.pagerService.getPager(data['totalItems'], page, this.pageSize);
          })
      })

  }
  single(query) {
    let sth = 'rfp/' + query;
    this._nav.navigate([sth]);
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
    } else if (this.subscribe == "Subscribe user") {

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
      this.endRequest = this.homeServ.usersubscribe(this.uname).subscribe(
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
  ngOnDestroy() {
    // this.endRequest.unsubscribe();
  }
}
