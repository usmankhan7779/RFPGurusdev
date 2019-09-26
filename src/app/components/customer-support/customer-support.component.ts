import {Component, OnInit} from '@angular/core';
import { CustomerService} from './customer-service';
// import {
//   SharedData
// } from '../../shared-service';
import { Headers, Http, Response } from '@angular/http';
import { Router } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  NgModel
} from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import swal from 'sweetalert2';
@Component({
  selector: 'customer-support',
  templateUrl: 'customer-support.component.html',
  styleUrls: ['./customer-support.component.css']
})
export class CustomerSupportComponent implements OnInit {

  constructor(private customerSupport: CustomerService,  private router: Router, private fb: FormBuilder,  private http: HttpClient , private https : Http) {}
  
  form: FormGroup
  disable = true;
  topic;
  newsubject = new FormControl("", Validators.required)
  ngOnInit() {
    window.scroll(0,0);
    this.form = this.fb.group({
      des: new FormControl("", Validators.required),
      sub: new FormControl("", Validators.required),
      othersub : new FormControl(""),
      // course_image : new FormControl("")
    });
    this.tickets();
  }
  views;
  tickets(){
    this.customerSupport.getview().subscribe( data=> {
      this.views = data;
      // alert(this.views);
      console.log(this.views);
    })
  }
  queryid;
  getid(id){
 
    this.queryid = id;
    console.log(this.queryid);
    // alert(this.queryid);
    localStorage.setItem('queryidget', this.queryid);
    this.router.navigate(['/queryreply'], {queryParams: {ticketid : this.queryid}});
  }
  files;
  ImgSrc;
  file;
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
  image : any = {};
 subjects;
 course_image;
 attach_file;

 onSubmit() {

  this.http.post(
    'https://storage.rfpgurus.com/hamzatest1.php',
    
    this.input, { responseType: 'text' }
    ).subscribe(data => {
      if (data === "Sorry, not a valid Image.Sorry, only JPG, JPEG, PNG & GIF files are allowed.Sorry, your file was not uploaded.") {
        // EditCourseDialogComponent.ImageUploadFailer();
      } else {
        this.course_image = data;
      
        this.CustomerSupport();

      }

    });

  // }
}

//  onSubmit() {
//   let headers = new HttpHeaders();
//   headers.append('Content-Type', 'application/json');
//   this.http.post(
//     'https://storage.rfpgurus.com/hamzatest1.php',
//     this.input, { responseType: 'text' }).subscribe(data => {
//       if (data === "Sorry, not a valid Image.Sorry, only JPG, JPEG, PNG & GIF files are allowed.Sorry, your file was not uploaded.") {
//         // EditCourseDialogComponent.ImageUploadFailer();
//       } else {
//         this.course_image = data;
//         console.log(this.course_image);
//         // this.imagesuppload();

//       }

//     });
// this.CustomerSupport();
//   // }
// }
  CustomerSupport() {
  if (!this.isSubject){
    this.customerSupport.support(this.form.value['sub'] , this.form.value['des'], this.form.value['course_image']).subscribe(res => {
      // alert(this.form.value['des']);
      // this.alert.AlertBox("success", "Your query has been sent")
     

      swal({
        type: 'success',
        title: 'Successfully post',
        showConfirmButton: false,
        width: '512px',
        timer: 2000
      });
    });

    this.tickets();
    this.form.reset();

    this.isSubject.reset();
  }
  else {
    this.customerSupport.support(this.form.value['othersub'] , this.form.value['des'], this.form.value['course_image']).subscribe(res => {
      // alert(this.form.value['des']);
      // this.alert.AlertBox("success", "Your query has been sent")
   

      swal({
        type: 'success',
        title: 'Successfully posted',
        showConfirmButton: false,
        width: '512px',
        timer: 2000
      });
    });

    this.tickets();
    this.form.reset();

    this.isSubject.reset();
  }
 
  }

  isSubject
  queryList = [{
      key: "Billing",
      value: "Billing"
    },
    {
      key: "Technical Issue",
      value: "Technical Issue"
    },
    {
      key: "General Query",
      value: "General Query"
    },
    {
      key: "App Feedback",
      value: "App Feedback"
    },
    {
      key: "Mobile App Issues",
      value: "Mobile App Issues"
    },
    {
      key: "other",
      value: "Other"
    }
  ]
  changeSubject(event) {
    if (event.value != '') {
      this.disable = true
      // alert('chnagesubject');
    }
 
  }
  input;
  change(event) {
    if (event.isUserInput) {
      if (event.source.value == "other") {
        // alert('true');
        this.isSubject = event.source.selected;
        // this.input.reset();
        // alert(this.isSubject);
        this.disable = false;
      } else {
        this.isSubject = false
        this.disable = false
        // alert('false');
      }
    }
  }
}