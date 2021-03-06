import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Http, Headers , Response} from '@angular/http'
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { PasswordValidation } from '../../../Validators/password-validator.component';
import swal from 'sweetalert2';
import { PreloaderService} from '../../../services/preloader-service';
import { ErrorStateMatcher } from '@angular/material';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { RecapchaComponent } from '../recapcha/recapcha.component';
import { isPlatformBrowser } from '@angular/common';
import { RecapchaService } from '../recapcha/recapcha.service';
import { SeoService } from '../../../services/seoService';
import { DISABLED } from '@angular/forms/src/model';
import { AgancyPricingService} from '../../../components/profile/agancypricing/agancypricing.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export class errorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
declare interface ValidatorFn {
  (c: AbstractControl): {
    [key: string]: any;
  };
}
declare interface User {
  text?: string; // required, must be 5-8 characters
  email?: string; // required, must be valid email format
  password?: string; // required, value must be equal to confirm password.
  confirmPassword?: string; // required, value must be equal to password.
  number?: number; // required, value must be equal to password.
  url?: string;
  idSource?: string;
  idDestination?: string;
  optionsCheckboxes?: boolean;
  // firstname?: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [
    './signup.component.css',
    '../../local-style/multiple-style.css']
})
export class SignupComponent implements OnInit, OnDestroy , AfterViewInit {
  @ViewChild(RecapchaComponent) captcha: RecapchaComponent;
  endRequest;
  hide = true;
  hide1 = true;
  model : any = {};
  phone;
  public typeValidation: User;
  register: FormGroup;
  register2: FormGroup;
  emailVerify: FormGroup;
  login: FormGroup;
  type: FormGroup;
  agencysearch;
  digitsOnly = '^[0-9,-]+$';
  password_regex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[\/\\\!\"#$%&()*+,£^.:;=?\\\\[\\]\\-\'<>~|@_{}]).{8,}$';
  emailonly = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  usernameOnly = '[a-zA-Z0-9_.]+';
  textonly = '[a-zA-Z]+'
  public phoneMask = ['+', '1', '-', /[1-9]/, /\d/, /\d/, '-',  /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  emailexist: boolean = false;
  usernameexist: boolean = false;
  agencyname;
  isequal;
  meaasge;
  btnSubmit;
  terms:boolean;
  allcountry;
  country;
  countrys;
  private tokenGlobal = new BehaviorSubject<boolean>(false);
  tokenGlobal$ = this.tokenGlobal.asObservable();
  matcher = new errorMatcher();
  vin_Data = { city: "", state: "", country: "" };
  vin_Data2 = { city2: "", state2: "", country2: "" };
  // public phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public logedin: any = 0;
agen;
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private _serv: AgancyPricingService, private signupService: SignupService, private formBuilder: FormBuilder, private router: Router, public recapcha: RecapchaService, private seoService: SeoService, private _http:HttpClient, private load : PreloaderService) {

    this._serv.rfpagen().subscribe(data => {
      this.agen = data.Result;
    
    });
 
    window.scroll(0,0);
   }
  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }
  resolved(captchaResponse: string) {
  }
  public isInvalid: boolean = false;
  public change2(event: any): void {
    var phn = this.model.contact_no.split('_').join('').split('-').join('').split('+').join('').length
    if (phn < 11) {
      this.isInvalid = true;
    }
    else {
      this.isInvalid = false;
    }
  }
  public change3(event: any): void {
    var phn = this.model.contact_no.split('_').join('').split('-').join('').split('+').join('').length
    if (phn < 11) {
      this.isInvalid = true;
    }
    else {
      this.isInvalid = false;
    }
  }
  displayFieldCss(form: FormGroup, field: string) {
    return {
      'has-error': this.isFieldValid(form, field),
      'has-feedback': this.isFieldValid(form, field)
    };
  }
  disabledAgreement: boolean = true;
  disabledAgreement2: boolean = true;
  changeCheck(event){
    this.disabledAgreement = !event.checked;
  }
  changeCheck2(event){
    this.disabledAgreement2 = !event.checked;
  }
 
   
  invalid
  zipcode2;
  zipcodeCheck(zipcode1) {
    if (zipcode1.length > 4) {
      this.endRequest = this.signupService.zipcode(zipcode1).subscribe(
        data => {
          this.vin_Data.city = data['city'];
          this.vin_Data.state = data['state'];
          this.vin_Data.country = data['country'];
        },
          error => {
            error.status== 400
            this.invalid=error.status;
            delete this.vin_Data.city;
            delete this.vin_Data.state;
            delete this.vin_Data.country;
      });
    }
  }
  zipcodeCheck2(zipcode2) {
    if (zipcode2.length > 4) {
      this.endRequest = this.signupService.zipcode(zipcode2).subscribe(
        data => {
          this.vin_Data2.city2 = data['city'];
          this.vin_Data2.state2 = data['state'];
          this.vin_Data2.country2 = data['country'];
        },
          error => {
            error.status== 400
            this.invalid=error.status;
            delete this.vin_Data2.city2;
            delete this.vin_Data2.state2;
            delete this.vin_Data2.country2;
      });
    }
  }
  usernameCheck(username1) {
    this.endRequest = this.signupService.username_exist(username1).subscribe(
      (data: boolean) => {
        this.usernameexist = data;
      });
  }
  agency(agencyname) {
    this.endRequest = this.signupService.agency_exist(agencyname).subscribe(
      (data: boolean) => {
        this.agencyname = data;
        // alert(this.agencyname);
    
      }
      
      
      );
  }
  emailCheck(email1) {
    this.endRequest = this.signupService.email_exist(email1).subscribe(
      (data: boolean) => {
        this.emailexist = data;
      });
  }
  input;
  emailCheck2(email2) {
    this.endRequest = this.signupService.email_exist(email2).subscribe(
      (data: boolean) => {
        this.emailexist = data;
      });
  }
  files;
  file;
  ImgSrc;
  base64textString;
  _handleReaderLoaded(readerEvt) {
    console.log('base64');
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    // console.log(this.base64textString);
  }
  onChange(event: EventTarget) {
    this.input = new FormData();

    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    this.input.append('fileToUpload', target.files[0]);
    this.files = target.files;
    this.file = this.files[0];
    console.log(this.files);

    const reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);

    const reader1 = new FileReader();
    reader1.onload = (e: any) => {
      this.ImgSrc = (e.target.result);
    };
    reader1.readAsDataURL(this.file);
  }
    onSubmit() {

    this._http.post(
      
      'https://storage.rfpgurus.com/hamzatest.php',
      this.input, { responseType: 'text' }).subscribe(data => {
        // alert(this.input);
        if (data === 'Sorry, not a valid Image.Sorry, only JPG, JPEG, PNG & GIF files are allowed.Sorry, your file was not uploaded.') {
          // this.CourseFailure();
        }
        else {

          // this.CourseSuccess();
          this.model.profile_image = data;
          // alert(this.model.profile_image);
          // this.ifImageUpload(f);
        }
      });
  }
  onRegister(value) {
// alert(this.model.profile_image);
    if (this.register.valid && this.recapcha.check()) {
      this.isequal = true;
      this.endRequest = this.signupService.post_service(this.register.value, this.model.profile_image).subscribe(
        data => {
          swal({
            type: 'success',
               title: 'Please check your email for account activation instructions',
              showConfirmButton: true,
              width: '512px',
             });
          this.router.navigate(['/signin']);
        },
        error => {
        });
    } 
    else {
      this.validateAllFormFields(this.register);
      this.captcha.resetImg();
      // this.captcha.reset();
      // this.isequal = false;

      swal({
        type: 'error',
        title: 'Please confirm that you are not a robot',
        showConfirmButton: false,
        width: '512px',
        timer: 2000
      });
    }
  }
  
  onRegisteragency(value) {
    // alert(this.register.value.phone)
    if ( this.recapcha.check()) {
      this.isInvalid = true;
      this.endRequest = this.signupService.agency(this.register2.value, this.model.profile_image).subscribe(
        data => {
          swal({
                  type: 'success',
                     title: 'Please check your email for account activation instructions',
                    showConfirmButton: true,
                    width: '512px',
                   });
          this.router.navigate(['/signin']);
        },
        error => {
        });
    }
    else {
      this.validateAllFormFields(this.register2);
      this.captcha.resetImg();
      // this.captcha.reset();
      // this.isequal = false;

      swal({
        type: 'error',
        title: 'Please confirm that you are not a robot',
        showConfirmButton: false,
        width: '512px',
        timer: 2000
      });
    }
  }
  // send_link(email) {
  //   this.endRequest = this.signupService.activation_service(email).subscribe(
  //     data => {
  //       swal({
  //         type: 'success',
  //         title: 'Please check your email for account activation instructions',
  //         showConfirmButton: true,
  //         width: '512px',
  //       });
  //     },
  //     error => {
  //     });
  // }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  ngOnInit() {
    window.scroll(0, 0);
    // --------------- SEO Service ---------------
    // setting the page title 
    this.seoService.setTitle('Signup');

    // Updating Open Graph
    this.seoService.updateOGTitle('Signup');
    this.seoService.updateOGURL(window.location.href);

    // setting CanonicalURL
    this.seoService.createLinkForCanonicalURL();

    // setting twitter
    this.seoService.updateTwitterTitle('Signup');

    // --------------- SEO Service End ---------------

    if (isPlatformBrowser(this.platformId)) {
      this.logedin = localStorage.getItem('loged_in');
      // alert(this.logedin)
    }
    if (this.logedin == 1) {

      this.router.navigate(['/']);
    }
    this.emailVerify = this.formBuilder.group({
      code: ['', Validators.required]
    });
    this.register = this.formBuilder.group({
      firstname: ['', Validators.compose([Validators.required, Validators.pattern(this.textonly),Validators.minLength(2)])],
      lastname: ['', Validators.compose([Validators.required, Validators.pattern(this.textonly),Validators.minLength(2)])],
      companyname: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      zipcode: ['', Validators.compose([Validators.required, Validators.pattern(this.digitsOnly), Validators.minLength(5)])],
      profile_image : [ '',Validators.compose([])],
      city: ['', Validators.compose([Validators.required])],
      country: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      username: ['', Validators.compose([Validators.required, Validators.pattern(this.usernameOnly), Validators.minLength(3)])],
      // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailonly), Validators.email])],
      // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
      // optionsCheckboxes: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(this.password_regex), Validators.maxLength(100)])],
      confirmPassword: ['', Validators.compose([Validators.required, , Validators.pattern(this.password_regex)])],
    }, {
        validator: PasswordValidation.MatchPassword // your validation method
      });
      this.register2 = this.formBuilder.group({
        firstname: ['',  Validators.compose([Validators.required, Validators.pattern(this.textonly),Validators.minLength(2)])],
        lastname: ['', Validators.compose([Validators.required, Validators.pattern(this.textonly),Validators.minLength(2)])],
        agency_name: ['', Validators.compose([Validators.required])],
        address: ['', Validators.compose([Validators.required])],
        zipcode: ['', Validators.compose([Validators.required, Validators.pattern(this.digitsOnly), Validators.minLength(5)])],
        city: ['', Validators.compose([Validators.required])],
        country: ['', Validators.compose([Validators.required])],
        state: ['', Validators.compose([Validators.required])],
        phone: ['', Validators.compose([Validators.required])],
        username: ['', Validators.compose([Validators.required, Validators.pattern(this.usernameOnly), Validators.minLength(3)])],
        // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
        email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailonly), Validators.email])],
        // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
        // optionsCheckboxes: ['', Validators.required],
        password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(this.password_regex), Validators.maxLength(100)])],
        confirmPassword: ['', Validators.compose([Validators.required, , Validators.pattern(this.password_regex)])],
      }, {
          validator: PasswordValidation.MatchPassword // your validation method
        });
  }
  ngAfterViewInit(){
    this.signupService.getcounty().subscribe( data =>{
      this.allcountry = data['countries'];
      console.log(this.allcountry);
    })
  }
  ngOnDestroy() {
    // this.endRequest.unsubscribe();
  }

}

