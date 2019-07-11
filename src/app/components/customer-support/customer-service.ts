import { Injectable } from "@angular/core";
import { Http, Headers, Response } from '@angular/http';

import {
    HttpClient
} from '@angular/common/http';
// import { SharedData } from '../../shared-service';

@Injectable()
export class CustomerService{
    
    constructor(private http:HttpClient, private _https : Http){
      
    }
    support(sub, des){  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');     
        headers.append('Authorization', 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token);   
return this._https.post("https://apis.rfpgurus.com/ticket/Tikketissue_For_User/",    
 JSON.stringify({
    "subject": sub,
"description": des,
}), { headers: headers })
    }
}