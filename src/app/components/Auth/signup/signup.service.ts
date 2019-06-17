import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor(private http: HttpClient) { }

  email_exist(email) {
    return this.http.post('https://apis.rfpgurus.com/email_exist/', {
      'email': email
    });
  }

  username_exist(username) {
    return this.http.post('https://apis.rfpgurus.com/user_name_exist/', {
      'username': username
    });
  }

  post_service(obj) {
    return this.http.post("https://apis.rfpgurus.com/register/", {
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

  zipcode(zip) {
    return this.http.get('https://apis.rfpgurus.com/zipcode/' + zip + '/');
  }


}