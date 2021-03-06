
import { Component, OnInit, OnDestroy , Output , EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignupService } from "../signup/signup.service";
import swal from 'sweetalert2';
import { SeoService } from 'src/app/services/seoService';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Component({
  selector: 'app-agencyaccountactivation',
  templateUrl: './agencyaccountactivation.component.html',
  styleUrls: ['./agencyaccountactivation.component.css']
})
export class AgencyaccountactivationComponent implements OnInit {
  endRequest;
  sub; id;
  @Output() fire: EventEmitter<any> = new EventEmitter();

  constructor(
    private seoService: SeoService,
    private signupService: SignupService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    window.scroll(0, 0);
    this.endRequest = this.sub = this.route.params.subscribe(params => {
      this.authenticate(params['query2']);
      localStorage.setItem('testing' , '0');
      this.id=this.route.snapshot.paramMap.get("query2");
      // alert(this.id);
      // alert(this.authenticate(params['query2']));

    });
  }
  public emittedData(data) {
    // console.log(data);
    this.fire.emit(data);
  }
  authenticate(uid) {
    this.endRequest = this.signupService.agencyauthenticate_service(uid)
      .subscribe(
        data => {
         
          swal({
            type: 'success',
            title: 'Your Agency  Account has been successfully verified. Please login to continue for a Next-Gen RFP Search and Alert experience.',
            showConfirmButton: false,
            timer: 2000,
            width: '512px',
          })
          localStorage.setItem('testing' , '0');
          this.router.navigate(['/signin']);
        },
        error => {
          if (error.status == 403) {
            swal({
              type: 'error',
              title: 'Your account has already been activated',
              showConfirmButton: false,
              timer: 2000,
              width: '512px',
            })
          }
          localStorage.setItem('testing' , '0');
          this.router.navigate(['/signin']);
        });
  }
}
