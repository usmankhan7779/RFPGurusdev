import { Injectable } from "@angular/core";
// import { Http, Headers, Response } from '@angular/http';
import { Headers, Http, Response } from '@angular/http';
import {
    HttpClient
} from '@angular/common/http';
import {  HttpHeaders } from '@angular/common/http';

// import { SharedData } from '../../shared-service';

@Injectable()
export class CustomerService{
    
    constructor(private http:HttpClient, private _https : Http){
      
    }
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    getview(){
        if (localStorage.getItem('currentUser')){
            // alert(JSON.parse(localStorage.getItem('currentUser')).token)
            let headers = new Headers();
             
            headers.append('Authorization', 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token);
            headers.append('Content-Type', 'application/json');      
        return this._https.get('https://apis.rfpgurus.com/ticket/Useralltickets/', {headers: headers}).map((response: Response) => response.json());
    }
}
eachview(id){
    if (localStorage.getItem('currentUser')){
        // alert(JSON.parse(localStorage.getItem('currentUser')).token)
        let headers = new Headers();
         
        headers.append('Authorization', 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token);
        headers.append('Content-Type', 'application/json');      
    return this._https.get('https://apis.rfpgurus.com/ticket/reply_ticket_User/' + id + '/', {headers: headers}).map((response: Response) => response.json());
}
}

    support(sub, des, attach_file){  
// alert(attach_file)
        let headers = new Headers();
        headers.append('Access-Control-Allow-Methods', 'application/json');     
        headers.append('Authorization', 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token);   
     
        // let attach_file = {};
       
return this.http.post("https://apis.rfpgurus.com/ticket/Ticket_Issue_For_User/",    
 JSON.stringify({


    "subject": sub,
"description": des,
"attach_file" : []

}), this.httpOptions)
    }
    postdesc( des, id){  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');     
        headers.append('Authorization', 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token);   
return this._https.post("https://apis.rfpgurus.com/ticket/reply_ticket_User/" + id + '/',    
 JSON.stringify({
    
"description": des,
}), { headers: headers })
    }
    
}