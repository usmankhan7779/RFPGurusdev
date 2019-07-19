import {Component, OnInit} from '@angular/core';
import { CustomerService} from './customer-service';
// import {
//   SharedData
// } from '../../shared-service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  NgModel
} from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'customer-support',
  templateUrl: 'customer.support.html',
  styleUrls: ['./customer.support.css']
})
export class CustomerSupportComponent implements OnInit {

  constructor(private customerSupport: CustomerService, private fb: FormBuilder) {}
  
  form: FormGroup
  disable = true;
  topic;
  newsubject = new FormControl("", Validators.required)
  ngOnInit() {
    window.scroll(0,0);
    this.form = this.fb.group({
      des: new FormControl("", Validators.required),
      sub: new FormControl("", Validators.required),
      othersub : new FormControl("")
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
  }
 subjects;
  CustomerSupport() {
  if (!this.isSubject){
    this.customerSupport.support(this.form.value['sub'] , this.form.value['des']).subscribe(res => {
      // alert(this.form.value['des']);
      // this.alert.AlertBox("success", "Your query has been sent")
      this.form.reset();

      this.isSubject.reset();

      swal({
        type: 'success',
        title: 'Successfully post',
        showConfirmButton: false,
        width: '512px',
        timer: 2000
      });
    });

    this.tickets();
  }
  else {
    this.customerSupport.support(this.form.value['othersub'] , this.form.value['des']).subscribe(res => {
      // alert(this.form.value['des']);
      // this.alert.AlertBox("success", "Your query has been sent")
      this.form.reset();

      this.isSubject.reset();

      swal({
        type: 'success',
        title: 'Successfully posted',
        showConfirmButton: false,
        width: '512px',
        timer: 2000
      });
    });

    this.tickets();
  }
 
  }

  isSubject
  queryList = [{
      key: "Having issue in download",
      value: "Having issue in download"
    },
    {
      key: "Issue related to pricing",
      value: "Issue related to pricing"
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