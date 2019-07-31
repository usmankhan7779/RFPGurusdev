 
import { Component, OnInit, Inject } from '@angular/core';
// import { AdminPanelComponent } from '../admin-penal/admin-penal.component';
// import { PagerService } from './../rfps/rfp/paginator.service';
// import { AllRfpsService } from '../all/all-rfps/all-rfps.service';
//  import { AdvanceService } from '../advance-search/advance.service';
 import swal from 'sweetalert2';
 import { Router, NavigationEnd } from '@angular/router';
import { PagerService } from 'src/app/services/paginator.service';
import { AdvanceService } from './advance.service';
import { AllRfpsService } from './all-rfps.service';
import { Http } from '@angular/http';

 
import { AgancyPricingService} from '../agancypricing/agancypricing.service';
@Component({
  selector: 'app-addrfps',
  templateUrl: './addrfps.component.html',
  styleUrls: ['./addrfps.component.css'],
  providers: [PagerService,AdvanceService,AllRfpsService]
})
export class AddrfpsComponent implements OnInit {
  data:any=[];url;
  agency_show:boolean=false;
  category_show:boolean=false;
  subcate_show:boolean=false;
  oldcategory;
  rfpkey = ''; statsearch; agensearch; catsearch; subcatsearch;
  Statess: any = []; cat: any = []; agen: any = [];
  rfp_number;
  title;
  governmentbidsusers;
  descriptionTag;
  states; sub_categories;
  id; web_infoo;
   subcat; seoTitleUrl; bid_type; agency_type; city_or_county; city;
  date_entered; due_date; web_info; rfp_reference;
  constructor(private _http: Http,
    private _serv1: AdvanceService, private _serv: AgancyPricingService,
    private router: Router ) {
    
   }
  acgeny_check(){
    this.agency_show=true;
      }
      cat_check(){
        this.category_show=true;
      }
      subchk(){
        this.subcate_show=true;
      }
  ngOnInit() {
    
    this._serv1.rfpstate().subscribe(
      data => {
        this.Statess = data.Result;
      },
      error => {
      }); this._serv1.rfpcategory().subscribe(
        data => {
          this.cat = data;
        },
        error => {
        }
      )
    this._serv1.rfpagen().subscribe(
      data => {
        this.agen = data.Result;
      }
    )

    
  }
  remove1(val, index){
    this.subcat.splice(index, 1);
  }
  remove(val, index) {
    this.category.splice(index, 1);
    
}
  subcategory(value) {
    this._serv.rfpsubcat(value).subscribe(
      data => {
        this.sub_categories = data.sub_categories;
      }
    )
  }
  select_state() {
    
      this._serv1.admindropdown(this.states).subscribe(
        data => {
         
          if (data.Agencies) {
          this.agen = data.Agencies;

          }
        

        })
    
    // if (this.states) {
    //   delete this.agencies
    //   delete this.cates;
    //   delete this.subcate;
    // }

  }
  hide:boolean=false;
 
  open_rfp:boolean=false;record_added:boolean=true;
  agency;
  category;
  input
  onChange(event: EventTarget) {

    this.input = new FormData();
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    this.input.append('fileToUpload', target.files[0]);
  }

  model : any = {};
  editClick() {
   
    if(this.input){
    this._http.post('https://storage.rfpgurus.com/upload.php/',this.input).subscribe(data => { 

          this.web_info = data['_body'];

if(data['_body'].substring(0,26)=="Sorry, file already exists"){
  swal({
    type: 'error',
    title: 'Opps! The file is already exist!',
    showConfirmButton: false,
    timer: 1500,width: '512px',
  });
}else{
  this._serv.add_rfp(this.model.title,this.descriptionTag,this.states,this.date_entered,this.due_date,this.web_info,this.category,this.subcat,this.bid_type,this.city_or_county,this.city).subscribe(
    data => {
      swal({
        type: 'success',
        title: 'RFP Added successfully',
        showConfirmButton: false,
        timer: 1500,width: '512px',
      });
    },error =>{
    if (error.status=== 400){
      swal({
        type: 'error',
        title: 'Opps Something went wrong',
        showConfirmButton: false,
        timer: 1500,width: '512px',
      });
      
    }
    if (error.status === 403) {
      swal({
        type: 'error',
        title: 'You are not allowed to Publish RFP',
        showConfirmButton: false,
        timer: 2000
      })
    }
    if (error.status === 406) {
      swal({
        type: 'error',
        title: "You have alredy Published 3 RFP's ",
        showConfirmButton: false,
        timer: 2000
      })
    }
  }
  
    );
}

      });

    
  }
}
}
