import { SetHeaders } from './../../../AuthGuards/auth.interceptor';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ForgetPasswordService {
    constructor(private http: HttpClient, private authInterceptor: SetHeaders) { }
    change_password(pass1, pass2, code) {
        return this.http.put('https://apis.rfpgurus.com/change_password/', JSON.stringify(
            {
                "pass1": pass1,
                "pass2": pass2,
                "code": code
            }), { headers: this.authInterceptor.setHeaders() });
    }
    checkUse() {
        return this.http.get('https://apis.rfpgurus.com/checklinkuse/link/');
    }
}