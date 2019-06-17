import { SetHeaders } from './../../../AuthGuards/auth.interceptor';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ChangedPasswordService {
    currentUser;

    constructor(private http: HttpClient, private authInterceptor: SetHeaders) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    user_change_password(oldpass, pass1, pass2) {
        return this.http.put('https://apis.rfpgurus.com/user_change_password/' + this.currentUser.username + '/',
            JSON.stringify({
                "currentPassword": oldpass,
                "newPassword": pass1,
                "newPassword2": pass2,
            }), { headers: this.authInterceptor.setHeaders() })
    }
}