import { Component, OnInit } from '@angular/core';
// import { Component } from '@angular/core';
;
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { FooterService } from '../footer/footer.service';

@Component({
  selector: 'app-footercmp',
  templateUrl: './footercmp.component.html',
  styleUrls: ['./footercmp.component.css']
})
export class FootercmpComponent implements OnInit {
  constructor( private _serv: FooterService) { }
   
  form = new FormGroup({
      email: new FormControl("", Validators.compose([Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
      ]))
  })
  get email() {
      return this.form.get('email');
  }
  check_login() {
      if (localStorage.getItem('loged_in')) {
          return true;
      } else {

          return false;
      }
  }
  check_adminlogin() {
      if (localStorage.getItem('currentadmin')) {

          return true;
      } else {

          return false;
      }
  }
  ngOnInit() {
    
  }
  onSubmit(email) {
      this._serv.subcribe(email).subscribe(
          data => {
              swal({
                  type: 'success',
                  title: 'Successfully subscribed!',
                  showConfirmButton: false,
                  timer: 1500, width: '512px',
              });
          },
          error => {
              swal(
                  'Sorry',
                  'You already subscribed!',
                  'error'
              )
          })
  }

}
