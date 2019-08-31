 
import { Component, OnInit, Inject,  ElementRef, ViewChild, EventEmitter , Output } from '@angular/core';
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
import { FormGroup, Validators, FormControl,FormBuilder, NgForm } from '@angular/forms';

import { AgancyPricingService} from '../agancypricing/agancypricing.service';
import { Location, NgForOf, DatePipe } from '@angular/common';
declare var $:any;
import { HomeService } from '../../common/home/home.service';
import { SignupService } from '../../Auth/signup/signup.service';
@Component({
  selector: 'app-addrfps',
  templateUrl: './addrfps.component.html',
  styleUrls: [
    '../../local-style/payment.css',
    '../../local-style/single-pricing.css',
    '../../local-style/cradet-card-box.css',
    '../../local-style/pagination.css',
    '../../local-style/table-normal.css',
    '../../local-style/products-area.css',
    './pricingsteps.component.scss',
    './addrfps.component.css'

],
  providers: [PagerService,AdvanceService,AllRfpsService]
})
export class AddrfpsComponent implements OnInit  {
  @Output() open: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();

  data:any=[];url;
  @ViewChild('openModal') openModal: ElementRef;
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
  isfreetrial;
  show_pirce;
  record;
  pkgList;
  userdetail;
  visible;
  toggle() {
  
    this.visible = !this.visible;
    // alert(this.visible);
    if (this.visible) {
      this.open.emit(null);
    } else {
      this.close.emit(null);
    }
  }
  free() {
    if (localStorage.getItem('currentUser')) {
      this.valuee = "BM";
      this.isfreetrial = true;
      this.Yplan = false;
      this.Mplan = false;
      this.Fplan = true;
      this.planSelected = true;
      this.prv_stepdetail("B", "M");
    }
    else {
      this._nav.navigate(['signin']);
    }
  }
  publish() {
    if (localStorage.getItem('currentUser')) {
      this.valuee = "";
      this.isfreetrial = true;
      this.Yplan = false;
      this.Mplan = false;
      this.Fplan = true;
      this.planSelected = true;
      this.prv_stepdetail("B", "M");
    }
    else {
      this._nav.navigate(['signin']);
    }
  }
  modal : any = {};
  selectPlan({ value }) {
    if (value == "BM") {
      this.Mplan = true;
      this.Yplan = false;
      this.Fplan = false;
      this.prv_stepdetail("B", "M");
    }
    else if (value == "PY") {
      this.Yplan = true;
      this.Mplan = false;
      this.Fplan = false;
      this.prv_stepdetail("P", "Y");
    }
  }
  
  cardtype;
  ShowButton(var_type_atm) {
    this.cardtype = var_type_atm;
    if (var_type_atm == "American Express") {
      this.cardmask = [/[3]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
      this.CardNumberForm = false;
      this.form.controls.CardNumberForm.reset();
      this.CardNumberForm2 = true;
      this.CardCodeForm = false;
      this.form.controls.CardCodeForm.reset();
      this.CardCodeForm2 = true;
    
    }
    else if (var_type_atm == "Visa") {
      this.cardmask = [/[4]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      this.CardNumberForm2 = false;
      this.form.controls.CardNumberForm2.reset();
      this.CardNumberForm = true;
      this.CardCodeForm2 = false;
      this.form.controls.CardCodeForm2.reset();
      this.CardCodeForm = true;
    }
    else if (var_type_atm == "Mastercard") {
      this.cardmask = [/[5]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      this.CardNumberForm2 = false;
      this.form.controls.CardNumberForm2.reset();
      this.CardNumberForm = true;
      this.CardCodeForm2 = false;
      this.form.controls.CardCodeForm2.reset();
      this.CardCodeForm = true;
    } else {
      this.cardmask = [/[6]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      this.CardNumberForm2 = false;
      this.form.controls.CardNumberForm2.reset();
      this.CardNumberForm = true;
      this.CardCodeForm2 = false;
      this.form.controls.CardCodeForm2.reset();
      this.CardCodeForm = true;
    }
  }
  payed() {
    if (localStorage.getItem('currentUser')) {
      this.isfreetrial = false;
      $('#exampleModalCenter').modal('hide');
    }
    else {
      this._nav.navigate(['signin']);
    }
  }
  agencySearch=new FormGroup({
    agencysearch: new FormControl('',[])
  })
  pkgsub = false;
  pkg_detail = {};
  valuee = 'BM';
  CCV: FormGroup;
  CardNumber = '^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$';
  ExpiryDate = '([0-9]{2}[/]?){2}';
  vin_Data = { city: "", state: "", country: "" };
  Mplan = true;
  Yplan = true;
  Fplan = true;
  planSelected = false;
  form: FormGroup;
  CardNumberForm;
  CardNumberForm2;
  var_get_id;
  CardCodeForm;
  CardCodeForm2;
  ExpiryDateForm;
  firststep(value) {
    window.scroll(0, 0);
    this.valuee = value;
    if (value == "BM") {
      this.Mplan = true;
      this.Yplan = false;
      this.Fplan = false;
      this.planSelected = true;
      this.prv_stepdetail("B", "M");
    }
    else if (value == "PY") {
      this.Yplan = true;
      this.Mplan = false;
      this.Fplan = false;
      this.planSelected = true;
      this.prv_stepdetail("P", "Y");
    }
  }
  text:any = {
    Year: 'Year',
    Month: 'Month',
    Weeks: "Weeks",
    Days: "Days",
    Hours: "Hrs",
    Minutes: "Mins",
    Seconds: "Secs",
    MilliSeconds: "MilliSeconds"
  };
  prv_stepdetail(type, dur) {
    this.pkg_detail['type'] = type
    this.pkg_detail['dur'] = dur
    this.pkgsub = true;
  }
  isright: boolean = false;
  set_default: boolean = false;
  Add_new() {
    if (this.set_default == true) {
      // alert(this.isright)
      this.isright = false;
    } else if (this.set_default == false) {
    
      this.isright = true;
    

    }
  }
  name;
  address;
 res;
  constructor(private _http: Http,
    private _serv1: AdvanceService, private _serv: AgancyPricingService,
    private router: Router, private formBuilder: FormBuilder, private _nav: Router, private datePipe: DatePipe,private _home :HomeService,  private _serv2: SignupService, ) {
      this.CardNumberForm=true;
    this.CardNumberForm2=false;
    this.CardCodeForm=true;
    this.CardCodeForm2=false
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
      eachcardid;
  ngOnInit() {
 this.updaterec();
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

this.form = this.formBuilder.group({
  CardNumberForm: [{ value: "", disabled: true }, Validators.compose([Validators.required])],
  CardNumberForm2: [{ value: "", disabled: true }, Validators.compose([Validators.required])],
  CardCodeForm: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(3)])],
  CardCodeForm2: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$'),Validators.minLength(4)])],
  ExpiryDateForm: ['', Validators.compose([Validators.required, Validators.pattern('(0[1-9]|10|11|12)/[0-9]{2}$')])],
  city: ['', Validators.compose([Validators.required])],
  country: ['', Validators.compose([Validators.required])],
  zipcode: ['', Validators.compose([Validators.required, Validators.maxLength(5),
  Validators.pattern('^[0-9]*$')])],
  setautopay: [''],
  CardtypeForm: ['', Validators.compose([Validators.required])],
  Holdername: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-Z _.]+$')])],
  nickname: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z _.]+$')])],
  Address: ['', Validators.compose([Validators.required])],
  Carddefault:['', Validators.compose([Validators.required])],
  state: ['', Validators.compose([Validators.required])],
  })
  // this.mainFunction();
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
  ngAfterContentInit() : void {
    this.mainFunction();
  }
  cityname;
  getcityname(name){
    // alert(name);
this.cityname = name;
// alert(this.cityname);
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
    this.form = this.formBuilder.group({
      CardNumberForm: [{ value: "", disabled: true }, Validators.compose([Validators.required])],
      CardNumberForm2: [{ value: "", disabled: true }, Validators.compose([Validators.required])],
      CardCodeForm: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(3)])],
      CardCodeForm2: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$'),Validators.minLength(4)])],
      ExpiryDateForm: ['', Validators.compose([Validators.required, Validators.pattern('(0[1-9]|10|11|12)/[0-9]{2}$')])],
      city: ['', Validators.compose([Validators.required])],
      country: ['', Validators.compose([Validators.required])],
      zipcode: ['', Validators.compose([Validators.required, Validators.maxLength(5),
      Validators.pattern('^[0-9]*$')])],
      CardtypeForm: ['', Validators.compose([Validators.required])],
      Holdername: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-Z _.]+$')])],
      nickname: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z _.]+$')])],
      Address: ['', Validators.compose([Validators.required])],
      Carddefault:['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      })
      if (localStorage.getItem('currentUser')) {
        this._home.get_card_infos().subscribe(Data => {
          this.res = Data;
       
          if (!this.res.length) {
            this.isright = true;
          }
        })
      }
    if(localStorage.getItem('agancypricing')=='BM'){
      window.scroll(0, 0);
      this.Mplan = true;
      this.Yplan = false;
      this.Fplan = false;
      this.planSelected = true;
      this.prv_stepdetail("B", "M");
    }
    else if (localStorage.getItem('agancypricing')=='PY'){
      window.scroll(0, 0);
      this.Yplan = true;
      this.Mplan = false;
      this.Fplan = false;
      this.planSelected = true;
      this.prv_stepdetail("P", "Y");
    }
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
  msgfun(){
    swal(
      'Agency is not Subscribed.',
      '',
      'error'
    )
  }
checksub(){
  this.mainFunction();
  this.msgfun();
}
  model : any = {};
  public change(event: any): void {
    var card = this.model.cardNumber.split('-').join('').split('_').join('').length;
    if (card < 16) {
      this.isInvalid = true;
    }
    else {
      this.isInvalid = false;
    }
  }
  minDate = new Date();
  public change2(event: any): void {
    var card = this.model.cardNumber.split('-').join('').split('_').join('').length;
    if ( card < 15) {
      this.isInvalid2 = true;
    }
    else {
      this.isInvalid2 = false;
    }
  }
  empty(){
    // this.model.title = '';
    // this.descriptionTag = '';
    // this.states = '';
    // this.date_entered = '', this.due_date = '',this.model.web_info ='',this.category = '',this.subcat = '',this.bid_type = '',this.county = [''],this.cityname = [''];

    this.model.title = '',
    this.descriptionTag= '',
    this.states = '',
    this.date_entered = '',
    this.due_date = '' ,
    this.model.web_info= '',
    this.category ='',
    this.subcat = '',
    this.bid_type = '',
    this.model.county = '',
    this.cityname = ''

  }
  
  editClick() {
  
    if(this.input){
    this._http.post('https://storage.rfpgurus.com/upload.php/',this.input).subscribe(data => { 

          this.model.web_info = data['_body'];
          // alert(this.model.web_info)

if(data['_body'].substring(0,26)=="Sorry, file already exists"){
  swal({
    type: 'error',
    title: 'Opps! The file is already exist.',
    showConfirmButton: false,
    timer: 1500,width: '512px',
  });
}else{
  // alert()
  this._serv.add_rfp(this.model.title,this.descriptionTag,this.states,this.date_entered,this.due_date,this.model.web_info,this.category,this.subcat,this.bid_type,this.county,this.cityname).subscribe(
    data => {
      swal({
        type: 'success',
        title: 'Your RFP has been successfully Posted. It will be listed after approval.',
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
    this.empty();
}

      });

    
  }
this.updaterec();
}

editClickupdate() {
  
  if(this.input){
  this._http.post('https://storage.rfpgurus.com/upload.php/',this.input).subscribe(data => { 

        this.model.web_info = data['_body'];
        // alert(this.model.web_info)

if(data['_body'].substring(0,26)=="Sorry, file already exists"){
swal({
  type: 'error',
  title: 'Opps! The file is already exist.',
  showConfirmButton: false,
  timer: 1500,width: '512px',
});
}else{
// alert()
// alert(this.modal.title)
this._serv.add_rfp(this.model.title,this.descriptionTag,this.states,this.date_entered,this.due_date,this.model.web_info,this.category,this.subcat,this.bid_type,this.county,this.cityname).subscribe(
  data => {
    swal({
      type: 'success',
      title: 'Your RFP has been successfully Posted. It will be listed after approval.',
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
  this.empty();
}

    });

  
}

}
gettingid(id){
  // alert(id);
  this.id = id;
  this.showeachrecord(this.id);
}
categorynew: any =[];
getforupdate : any ={};
showeachrecord(id){
  this._serv.eachrfpget(this.id).subscribe( data =>{
    this.getforupdate = data;
    this.categorynew = data.new_category;
    // alert(this.getforupdate);
    console.log(this.categorynew);
  })
}
TotalItems;
showlist;
updaterec(){
  this._serv.getrecordforypdaterfp().subscribe(data => {
this.showlist = data['results'];
this.TotalItems = data.TotalItems;
console.log(this.TotalItems);
// alert(this.TotalItems);
// alert(this.showlist);
  })
}
result; trial;
local;
uname;
ngOnDestroy() {
  $('#exampleModalCenter').modal('hide');
}
check_login() {
  if (localStorage.getItem('currentUser')) {
    this.local = localStorage.getItem('currentUser');
    let pars = JSON.parse(this.local);
    this.uname = pars.username
    return false
  }
  else {
    return true
  }
}
isInvalid2;
isInvalidl;
date;
countys;
setautopay: boolean = true;
records;
dropdwon(states, county){
  // alert(states);
  this._serv.statedropdwon(states, this.countys).subscribe( data =>{
    // alert(data);
    this.countys = data['Counties'];
    // this.county = data['counties'].county;
 
    // this.counties(states,this.countys)
    console.log(this.countys);
  },
  error => {
    error.status == 500
    delete  this.countys;
    
    
      })
}
county;
counties(countys){
  // alert(countys)
    //  alert(countys);
     this.county = countys;
    //  console.log( this.county)
  this._serv.statedropdwon(this.states, countys).subscribe( data =>{
    this.city = data['Cities'];
    
    // alert(this.city)
 
  })
}
citys
mainFunction() {
  if (localStorage.getItem('currentUser')) {
      this.local = localStorage.getItem('currentUser');
      let pars = JSON.parse(this.local);
      this.uname = pars.username
      this._home.agenyprotel().subscribe(
          data => {
            // message: "Agency is not Subscribed"
              if (data['message'] == "Agency Subscribed") {
                this.Fplan = false
                this.Mplan=false;
                this.Yplan=false;
                // this.planSelected = true
                this.show_pirce= false;
              
                  // this._serv4.purchaseHistory().subscribe(
                  //     data => {
                          this.records = data['subscription_detail'];
                          this.pkgList = data['subscription_detail']['pkg_fk'];
                          this.result = true;

                          var date = new Date();
                          this.userdetail = data['reg_fk'];
                        
                        
                          var currentDate = this.datePipe.transform(date, "yyyy-MM-dd").toString()
                      // },
                      // error => {
                      //     this.nofound = true;
                      // })

              } 
              else if (data['message'] == "Trail Agency Subscribed") {
                this.records = data['subscription_detail'];
                this.pkgList = data['subscription_detail']['pkg_fk'];
                this.trial = true;

                var date = new Date();
                this.userdetail = data['reg_fk'];
              
             
                var currentDate = this.datePipe.transform(date, "yyyy-MM-dd").toString()
                  // this._serv4.trialHistory().subscribe(
                  //     data => {
                  //         // this.nofound=false;
                  //         this.trial = data;
                  //     }, error => {


                  //         this.nofound = true;

                  //     })
              }
              else if (data['message'] == "Agency is not Subscribed") {
             
             this.nodata = data;
          
                  // this._serv4.trialHistory().subscribe(
                  //     data => {
                  //         // this.nofound=false;
                  //         this.trial = data;
                  //     }, error => {


                  //         this.nofound = true;

                  //     })
              }
              else {
                  this.nofound = true;
                  // alert(this.nofound)
              }
          },
          error => {
              this.nofound = true;
              // alert(this.nofound)
          });
  }

}
nodata;
nofound;
proceed() {
  this.local = localStorage.getItem('currentUser');
  let pars = JSON.parse(this.local);
  this.uname = pars.username
  this.date = this.model.expirationdate;
  // if(this.model.holdername != null && this.model.address != null && this.model.zipcode != null && this.model.city != null && this.model.state != null && this.model.country != null && this.model.cardNumber != null && this.model.cardcod && this.date != null && this.model.cardtype != null &&  this.model.nickname != null ){
    // if(this.form.controls.Holdername.valid && this.form.controls.Address.valid && this.form.controls.zipcode.valid && this.form.controls.city.valid && this.form.controls.state.valid && this.form.controls.country.valid && this.form.controls.CardNumberForm.valid && this.form.controls.CardCodeForm.valid && this.form.controls.CardtypeForm.valid && this.form.controls.nickname.valid){
      if (this.isfreetrial == true) {
        if (this.isright == true) {
              if(this.model.holdername != null && this.model.address != null && this.model.zipcode != null  && this.model.cardNumber != null && this.model.cardcod && this.date != null && this.model.cardtype != null &&  this.model.nickname != null ){
    if(this.form.controls.Holdername.valid && this.form.controls.Address.valid && this.form.controls.zipcode.valid && this.form.controls.city.valid && this.form.controls.state.valid && this.form.controls.country.valid && this.form.controls.CardNumberForm.valid || this.form.controls.CardNumberForm2.valid && this.form.controls.CardCodeForm.valid || this.form.controls.CardCodeForm2.valid && this.form.controls.CardtypeForm.valid && this.form.controls.nickname.valid){
      if(this.isInvalid==false && this.isInvalid2==false){
        this._serv.addCard(this.model.holdername, this.model.address, this.model.zipcode, this.model.city, this.model.state, this.model.country, this.model.cardNumber.split('-').join(''), this.model.cardcod, this.date.split('/').join(''), this.model.cardtype, this.setautopay, this.model.nickname).subscribe(Data => {
  
          this.model.defaultcard = Data.id
          if (Data.id) {
            this._serv.package_free_trial(this.isright, this.model.defaultcard, this.model.expirationdate, this.model.cardcod, this.var_get_id, this.model.cardtype, this.model.holdername, this.pkg_detail['type'], this.pkg_detail['dur'])
              .subscribe(data => {
                swal(
                  'Your payment is posted successfully.',
                  '',
                  'success'
                )
                this._nav.navigate([''])
                if (localStorage.getItem('member')) {
                  let url = localStorage.getItem('member')
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
                  }
                  else {
                    this._nav.navigate([url]);
                  }
                } else {
                  this._nav.navigate(['/']);
                }
              
             
                this._nav.navigate(['purchase-history'])
              },
            
                error => {
                  if (error.status == 500) {
                    swal(
                      'Oops',
                      'Internal server error',
                      'error'
                    )
                  }
                  else if (error.status == 404) {
                    swal(
                      'You have already subscribed for free trial',
                      '',
                      'error'
                    )
                  }
                  else if (error.status == 403) {
                    swal(
                      'You have already subscribed',
                      '',
                      'error'
                    )
                  }
                  else if (error.status == 400) {
                    swal(
                      'Sorry',
                      'Select payment card and subscription plan first',
                      'error'
                    )
                  }
                });
          }
          else {
            swal(
              'Oops',
              'Something went wrong Please Try Again',
              'error'
            )
          }
        },
        error => {
          if (error.status === 406) {
            swal({
              type: 'error',
              title: 'Card Number already exist',
              showConfirmButton: false,
              timer: 1500, width: '512px',
            })
          }
          else if(error.status === 405){
            swal({
              type: 'error',
              title: 'Card details are not valid',
              showConfirmButton: false,
              timer: 1500, width: '512px',
            })
          }
        })
      }
      else {
        swal({
          type: 'error',
          title: 'Invalid details',
          showConfirmButton: false,
          timer: 1500, width: '512px',
        })
      }     
    }
    else {
      swal({
        type: 'error',
        title: 'Invalid details',
        showConfirmButton: false,
        timer: 1500, width: '512px',
      })
    }
    }
   
  else {
    swal({
      type: 'error',
      title: ' Please fill in all the fields ',
      showConfirmButton: false,
      timer: 1500, width: '512px',
    })
  }
          // f.resetForm()
        } else if (this.isright == false) {
          this._serv.package_free_trial(this.isright, this.eachcardid, this.model.expirationdate, this.model.cardcod, this.var_get_id, this.model.cardtype, this.model.holdername, this.pkg_detail['type'], this.pkg_detail['dur'])
            .subscribe(data => {
              swal(
                'Your payment has been transferred',
                '',
                'success'
              )
              if (localStorage.getItem('member')) {
                let url = localStorage.getItem('member')
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
                }
                else {
                  this._nav.navigate([url]);
                }
              } else {
                this._nav.navigate(['/']);
              }
              
              this._nav.navigate(['purchase-history'])
            },
              error => {
                if (error.status == 500) {
                  swal(
                    'Oops',
                    'Internal server error',
                    'error'
                  )
                }
                else if (error.status == 404) {
                  swal(
                    'You have already subscribed for free trial',
                    '',
                    'error'
                  )
                }
                else if (error.status == 403) {
                  swal(
                    'You have already subscribed',
                    '',
                    'error'
                  )
                }
                else if (error.status == 200) {
                  swal(
                    'Your payment has been transferred',
                    '',
                    'success'
                  )
                }
                else if (error.status == 400) {
                  swal(
                    'Sorry',
                    'Select payment card and subscription plan first',
                    'error'
                  )
                }
              });
        }
      } else {
        if (this.isright == true) {
          if(this.model.holdername != null && this.model.address != null && this.model.zipcode != null && this.model.cardNumber != null && this.model.cardcod && this.date != null && this.model.cardtype != null &&  this.model.nickname != null ){
            if(this.form.controls.Holdername.valid && this.form.controls.Address.valid && this.form.controls.zipcode.valid && this.form.controls.city.valid && this.form.controls.state.valid && this.form.controls.country.valid && this.form.controls.CardNumberForm.valid || this.form.controls.CardNumberForm2.valid && this.form.controls.CardCodeForm.valid || this.form.controls.CardCodeForm2.valid && this.form.controls.CardtypeForm.valid && this.form.controls.nickname.valid){
              if(this.isInvalid == false && this.isInvalid2==false){
                this._serv.addCard( this.model.holdername, this.model.address, this.model.zipcode, this.model.city, this.model.state, this.model.country, this.model.cardNumber.split('-').join(''), this.model.cardcod, this.date.split('/').join(''), this.model.cardtype, this.setautopay, this.model.nickname).subscribe(Data => {
  
                  this.model.defaultcard = Data.id
                  if (Data.id) {
                    this._serv.package_free(this.isright, this.model.defaultcard, this.model.expirationdate, this.model.cardcod, this.var_get_id, this.model.cardtype, this.model.holdername, this.pkg_detail['type'], this.pkg_detail['dur']).subscribe(
                      data => {
                        swal(
                          'Your payment has been transferred',
                          '',
                          'success'
                        )
                        if (localStorage.getItem('member')) {
                          let url = localStorage.getItem('member')
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
                          }
                          else {
                            this._nav.navigate([url]);
                          }
                        } else {
                          this._nav.navigate(['/']);
                        }
                    
                        this._nav.navigate(['purchase-history'])
                      },
                      error => {
                        if (error.status == 403) {
                          swal(
                            'You have already subscribed',
                            '',
                            'error'
                          )
                        }
                        // swal(
                        //   'Oops',
                        //   'Something went wrong',
                        //   'error'
                        // )
                      });
                  }
                  //  else {
                  //   swal(
                  //     'Oops',
                  //     'Something went wrong Please Try Again.',
                  //     'error'
                  //   )
                  // }
                },
                error => {
                  if (error.status === 406) {
                    swal({
                      type: 'error',
                      title: 'Card Number already exist',
                      showConfirmButton: false,
                      timer: 1500, width: '512px',
                    })
                  }
                  else if(error.status === 405){
                    swal({
                      type: 'error',
                      title: 'Card details are not valid',
                      showConfirmButton: false,
                      timer: 1500, width: '512px',
                    })
                  }
                })
              }
              else {
                swal({
                  type: 'error',
                  title: 'Invalid detail',
                  showConfirmButton: false,
                  timer: 1500, width: '512px',
                })
              }
        }
        }
         
        else {
          swal({
            type: 'error',
            title: ' Please fill in all the fields ',
            showConfirmButton: false,
            timer: 1500, width: '512px',
          })
        }
        } else if (this.isright == false) {
          this._serv.package_free(this.isright, this.eachcardid, this.model.expirationdate, this.model.cardcod, this.var_get_id, this.model.cardtype, this.model.holdername, this.pkg_detail['type'], this.pkg_detail['dur']).subscribe(
            data => {
              swal(
                'Your payment has been transferred',
                '',
                'success'
              )
              if (localStorage.getItem('member')) {
                let url = localStorage.getItem('member')
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
                }
                else {
                  this._nav.navigate([url]);
                }
              } else {
                this._nav.navigate(['/']);
              }
            
              this._nav.navigate(['purchase-history'])
            },
  
            error => {
              if (error.status == 500) {
                swal(
                  'Oops',
                  'Internal server error',
                  'error'
                )
              }
              else if (error.status == 404) {
                swal(
                  'You have already subscribed for free trial',
                  '',
                  'error'
                )
              }
              else if (error.status == 400) {
                swal(
                  'Sorry',
                  'Select payment card and subscription plan first',
                  'error'
                )
              }
              else if(error.status==403){
                swal(
                  'Sorry',
                  'You have already subscribed',
                  'info'
                )
              }
            });
        }
    }
    
    // }
    // else {
    //   swal({
    //     type: 'error',
    //     title: 'Invalid detail',
    //     showConfirmButton: false,
    //     timer: 1500, width: '512px',
    //   })
    // }
    // }
   
  // else {
  //   swal({
  //     type: 'error',
  //     title: ' Please fill in all the fields ',
  //     showConfirmButton: false,
  //     timer: 1500, width: '512px',
  //   })
  // }

}
isInvalid;
var_get_status;
card_opeation = [
  { value: 'Visa', viewValue: 'Visa' },
  { value: 'Mastercard', viewValue: 'Master' },
  { value: 'American Express', viewValue: 'American Express' },
  { value: 'Discover', viewValue: 'Discover' }

];
onSelectionChanged({ value }) {
  if (value === 'American Express') {
    this.form.get('CardNumberForm2').enable();
  } else {
    this.form.get('CardNumberForm').enable();
    
  }
}
getcardid(id) {
  this.eachcardid = id;
}
changed(val) {
  this.setautopay = val.checked
}
invalid;
zipcodeCheck(zipcode1) {
 
  if (zipcode1.length > 4) {
  
    this.endRequest = this._serv2.zipcode(zipcode1).subscribe(
      data => {
        this.model.city = data['city'];
        this.model.state = data['state'];
        this.model.country = data['country'];
        this.readonly=true;
      },
    
      error => {
        error.status== 400
        this.invalid=error.status;
        delete  this.model.city;
        delete  this.model.state;
        delete this.model.country;

      });
  }
}
readonly;
endRequest;
expirydate;
chek(val) {
  // this.expirydate=val.toString().slice(3,7);
  this.expirydate = val.toString().slice(3, 5);
}
public mask = function (rawValue) {

  // add logic to generate your mask array  
  if (rawValue && rawValue.length > 0) {
    if (rawValue[0] == '0' || rawValue[5] == '1') {
      return [/[01]/, /[1-9]/, '/', /[0-9]/, /[0123456789]/];
    } else {
      return [/[01]/, /[0-2]/, '/', /[0-9]/, /[0123456789]/];
    }
  }
  return [/[01]/, /[0-9]/, '/', /[0-9]/, /[0123456789]/];

}
// endRequest;
// public ccvmask = [/[0-9]/, /\d/, /\d/];
public cardmask = [/[0-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

keyPress(event: any) {
  const pattern = /[0-9\ ]/;
  let inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}

}
