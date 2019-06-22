import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactUsService } from './contact-us.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SeoService } from '../../../services/seoService';

const normalPattern = /^[a-zA-Z0-9_.-]+?/;
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  providers: [ContactUsService]
})
export class ContactUsComponent implements OnInit {
  form;
  public phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  emailonly = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  endRequest;
 name= '[a-zA-Z0-9_.]+';
  constructor(private _serv: ContactUsService, private _nav: Router, private seoService: SeoService) { }
  ngOnInit() {
    window.scroll(0, 0);
    // --------------- SEO Service ---------------
    // setting the page title 
    this.seoService.setTitle('Contact Us');

    // Updating Open Graph
    this.seoService.updateOGTitle('Contact Us');
    this.seoService.updateOGURL(window.location.href);

    // setting CanonicalURL
    this.seoService.createLinkForCanonicalURL();

    // setting twitter
    this.seoService.updateTwitterTitle('Contact Us');

    // --------------- SEO Service End ---------------
    this.form = new FormGroup({
      name: new FormControl("", [
        Validators.required,
        Validators.pattern(this.name),
        Validators.minLength(2),
      ]),
      email: new FormControl("", Validators.compose([
        Validators.required
        , Validators.pattern(this.emailonly),
      ])),
      phone: new FormControl("", Validators.compose([
        Validators.required,
      ])),
      message: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern(normalPattern),
        Validators.minLength(20),
      ])),
    });
  }
  onSubmit(name, email, phone, message) {
    this.endRequest = this._serv.contact(name, email, phone, message).subscribe(data => {
      swal({
        type: 'success',
        title: 'Thank you for contacting us, we will reply soon on your email',
        showConfirmButton: true,
        confirmButtonColor: "#090200",
        timer: 3000, width: '512px',
      });
      let url = '/';
      this._nav.navigate([url]);
    })
  }
  fun_send_message() {
  }
}