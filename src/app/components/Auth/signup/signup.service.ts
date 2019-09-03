import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers , Response} from '@angular/http'

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor(private http: HttpClient,private _http:Http) { }

  email_exist(email) {
    return this.http.post('https://apis.rfpgurus.com/email_exist/', {
      'email': email
    });
  }
getcounty(){
  return this.http.get('https://apis.rfpgurus.com/all_countries/')
}
  username_exist(username) {
    return this.http.post('https://apis.rfpgurus.com/user_name_exist/', {
      'username': username
    });
  }
  agency_exist(agency) {
    return this.http.post('https://apis.rfpgurus.com/agency_exist/', {
      'agency': agency
    });
  }
  post_service(obj) {
    return this.http.post("https://apis.rfpgurus.com/register/", {
      'obj': obj
    });

  }
  agency(obj) {
    return this.http.post("https://apis.rfpgurus.com/agency_register/", {
      
      'obj': obj
    });

  }
  activation_service(email) {
    return this.http.post("https://apis.rfpgurus.com/ac_code/", {
      'email': email
    });
  }

  authenticate_service(uid) {
    return this.http.get('https://apis.rfpgurus.com/activate/' + uid);

  }
  agencyauthenticate_service(uid) {
    // alert(uid);
    return this._http.get('https://apis.rfpgurus.com/agency_activate_account/' + uid);

  }
  zipcode(zip) {
   
    return this._http.get('https://apis.rfpgurus.com/zipcode/' + zip + '/').map((response: Response) => response.json());
  }


}