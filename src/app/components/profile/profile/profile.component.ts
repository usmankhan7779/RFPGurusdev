import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import swal from 'sweetalert2';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';
import { MainService } from '../../../services/main.service';
import { DatePipe } from '@angular/common';
import { AuthService } from "angular4-social-login";
import { AdvanceService } from '../../other/advance-search/advance.service';
declare const $: any;
import { SeoService } from '../../../services/seoService';
import { SignupService } from '../../Auth/signup/signup.service';
import { HttpClient } from '@angular/common/http';
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
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'  ],
    providers: [AdvanceService, AuthService, ProfileService, MainService, SignupService]
})
export class ProfileComponent implements OnInit {
    endRequest;
    today: number = Date.now();
    record;
    result: boolean = false;
    input;files;
    file
    ImgSrc;
    base64textString;
    public typeValidation: User;
    register: FormGroup;
    emailVerify: FormGroup;
    login: FormGroup;
    type: FormGroup;
    pkgsub = false;
    profile: any = [];
    personal: any = [];
    local;
    image;
    options: FormGroup;
    uname;
    model : any = {};
    agency;
    personal2;
    comapny;
    usernameexist;
    allcountry;
    country;
    vin_Data = { "city": "", "state": "" };
    emailexist;
    digitsOnly = '^[0-9,-]+$';
    public phoneMask = ['+', '1', '-', /[1-9]/, /\d/, /\d/, '-',  /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
    constructor(private signupServ: SignupService, private authService: AuthService, private _nav: Router, private _serv: ProfileService, private _http: HttpClient, private datePipe: DatePipe, private formBuilder: FormBuilder, private _adserv: AdvanceService, private _ser: MainService, private seoService: SeoService) {
        if (localStorage.getItem('role') == '0') {
            this.local = localStorage.getItem('loged_in');
            let pars = JSON.parse(this.local);
            this.uname = pars.username
            this.endRequest = this._serv.get_profile().subscribe(
                data => {
                    this.personal = data;
                    this.country =this.personal.country;
                    this.image=this.personal.profile_image
                    // alert(this.country)
                    console.log(this.image);
                    this.comapny=this.personal.company;
                    localStorage.setItem('address' , this.personal.address);
           
                    this.profile = data['user'];
                    localStorage.setItem('name', this.profile.username)
                   

                });
           
        }
        if (localStorage.getItem('role') == '1') {
            // this.local = localStorage.getItem('loged_in2');   this.profile = data['user'];
            // let pars = JSON.parse(this.local);
            // this.uname = pars.username
            this.agency =localStorage.getItem('role');
            this.endRequest = this._serv.agencyprofile().subscribe(
                data => {
                    this.personal = data;
                    this.country = this.personal.country;
                    // this.image2=this.personal.profile_image
                    // this.profile = this.personal2;
                    // alert(this.profile);
                    // alert(this.personal2);
                    
                    this.profile = data['user'];

                });
    }
    this.signupServ.getcounty().subscribe( data =>{
        this.allcountry = data['countries'];
        console.log(this.allcountry);
      })
// this.agencyinfo();
        this.options = formBuilder.group({
            bottom: 0,
            fixed: false,
            top: 0
        });
    }
    image2;
    isFieldValid(form: FormGroup, field: string) {
        return !form.get(field).valid && form.get(field).touched;
    }
    displayFieldCss(form: FormGroup, field: string) {
        return {
            'has-error': this.isFieldValid(form, field),
            'has-feedback': this.isFieldValid(form, field)
        };
    }
    keyPress(event: any) {
        const pattern = /[0-9\ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
          event.preventDefault();
        }
      }
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
    invalid
    zipcodeCheck(zipcode1) {
        if (zipcode1.length > 4) {
            this.endRequest = this.signupServ.zipcode(zipcode1).subscribe(
                data => {
                    this.personal['city'] = data['city']
                    this.personal['state'] = data['state']
                    this.personal['country'] = data['country']
                },
                error=>{
                    if(error.status==400)
                    {
                        this.invalid=error.status
                        delete this.personal['city'];
                        delete this.personal['state'];
                        delete this.personal['country'];
                    }

                });
        }
    }
    usernameCheck(username1) {
        this.endRequest = this.signupServ.username_exist(username1).subscribe
            (
                data => {
                    this.usernameexist = data;
                });
    }
    emailCheck(email1) {
        this.endRequest = this.signupServ.email_exist(email1).subscribe
            (
                data => {
                    this.emailexist = data;
                }
            );
    }
    onRegister() {
        // alert('hffgfc')
        if (this.register.valid) {

            this.endRequest = this._serv.ProfileUpdate(this.register.value, this.model.profile_image).subscribe(
                data => {
                    swal({
                        type: 'success',
                        title: 'Your profile has been updated successfully ',
                        showConfirmButton: false,
                        timer: 1500, width: '512px',
                    })
                });
        } else {
            this.validateAllFormFields(this.register);
            swal(
                'Oops',
                'Invalid details',
                'error'
            )
        }
    }
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
   
    agencyinfo(){
        if (localStorage.getItem('loged_in2')) {
            // this.local = localStorage.getItem('loged_in2');
            // let pars = JSON.parse(this.local);
            // this.uname = pars.username
            this.endRequest = this._serv.agencyprofile().subscribe(
                data => {
                    this.personal2 = data;
                    this.country = this.personal2.country
                    
                    // alert(this.personal2);
                    
                   

                });
    }
}
    mainFunction() {
        this.endRequest = this._ser.purchaseHistory().subscribe(
            data => {
                this.record = data;
                this.result = true;
                var enddate = this.record[0].end_date.toString();
                var date = new Date();
                var currentDate = this.datePipe.transform(date, "yyyy-MM-dd").toString()
                if (enddate <= currentDate && this.record[0].is_paid == true) {
                    this.endRequest = this._ser.expirePackage(enddate).subscribe(data => {
                        if (data == true) {
                            this.record[0].is_paid = false;
                            swal(
                                'Subscription',
                                'Your package has been expired.',
                                'success'
                            )
                        }
                    })
                }
            })
    }
    textonly = '[a-zA-Z]+';
    usernameOnly = '[a-zA-Z0-9_.]+';

    ngOnInit() {
        window.scroll(0, 0);

        // --------------- SEO Service ---------------
        // setting the page title 
        this.seoService.setTitle('Profile');

        // Updating Open Graph
        this.seoService.updateOGTitle('Profile');
        this.seoService.updateOGURL(window.location.href);

        // setting CanonicalURL
        this.seoService.createLinkForCanonicalURL();

        // setting twitter
        this.seoService.updateTwitterTitle('Profile');

        // --------------- SEO Service End ---------------

        this.emailVerify = this.formBuilder.group({
            code: ['', Validators.required]
        });
        this.register = this.formBuilder.group({
            firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+'),Validators.minLength(2)]],
            lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+'),Validators.minLength(2)]],
            companyname: [''],
            address: ['', [Validators.required]],
            username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9_.]+')]],
            zipcode: ['', [Validators.required, Validators.pattern('^[0-9,-]+$'), Validators.minLength(5)]],
            city: ['', [Validators.required]],
            country: ['', [Validators.required]],
            state: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            
            // newsletter: ['', Validators.required],
            // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
            email: [{ value: '', disabled: true }, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
            // optionsCheckboxes: ['', Validators.required],
            // password: ['', Validators.required],
            // confirmPassword: ['', Validators.required],
        });

        $('#click_advance').click(function () {
            $("i", this).toggleClass("fa-arrow-left fa-arrow-right");
        });
    }

    logout() {
        this.authService.signOut();
        localStorage.clear();
        swal({
            type: 'success',
            title: 'You have sucessfully logged out from RFPGurus',
            showConfirmButton: false,
            timer: 1500, width: '512px',
        });
        this._nav.navigate(['/']);
    }
}