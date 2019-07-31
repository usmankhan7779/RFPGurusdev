import { SetHeaders } from '../../../AuthGuards/auth.interceptor';
import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
// import { Headers, Http, Response } from '';
import swal from 'sweetalert2';
@Injectable()
export class AgancyPricingService {
    constructor(private http: HttpClient, private authInterceptor: SetHeaders,private _https : Http) { }
    add_rfp(rfpkey, governmentbidsusers, title, descriptionTag, states, agency, date_entered, due_date, web_info, rfp_reference, category, subcat, seoTitleUrl, bid_type, agency_type, city_or_county, city, open_rfp, record_added, oldcat, url) {
        if (category) {
            var cate = category.toString()
        }
        if (subcat) {
            var subcat = subcat.toString()
        }
        var plainText = descriptionTag.replace(/<[^>]*>/g, '');
        let headers = new Headers();
        if (localStorage.getItem('currentUser')) {
            headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
        }
        headers.append('Content-Type', 'application/json');
        return this._https.post('https://apis.rfpgurus.com/agency/add_rfp/', JSON.stringify({

            "rfpkey": rfpkey,
            "governmentbidsusers": governmentbidsusers,
            "title": title,
            "descriptionTag": descriptionTag,
            "state": states,
            "agency": agency,
            "date_entered": date_entered,
            "due_date": due_date,
            "web_info": web_info,
            "rfp_reference": rfp_reference,
            "new_category": cate,
            "sub_category": subcat,
            "seoTitleUrl": seoTitleUrl,
            "bid_type": bid_type,
            "agency_type": agency_type,
            "city_or_county": city_or_county,
            "city": city,
            "open_rfp": open_rfp,
            "record_added": record_added,
            "category": oldcat,
            "deescription": plainText,
            "profileurl": url
        }),
            { headers: headers }).map((response: Response) => response.json());
    }
    rfpsubcat(val) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._https.post('https://apis.rfpgurus.com/rf_p/searchby_multiple_categories/', JSON.stringify({ "category": val }),
          { headers: headers }).map((response: Response) => response.json());
      }
    admindropdown(state) {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._https.post('https://apis.rfpgurus.com/rf_p/add_rfp_dropdown/', JSON.stringify({
          "state":state,
         
        }),
          { headers: headers }).map((response: Response) => response.json());
      }
    get_card_info() {
        // return this.http.get('https://apis.rfpgurus.com/payment/cardinfo/');
        return this.http.get('https://apis.rfpgurus.com/payment/cardinfo/')
        // .map(response => response.json());
        // return this.authInterceptor.get('https://apis.rfpgurus.com/payment/cardinfo/');
    }

    authenticate_service(uid) {
        return this.http.get('https://apis.rfpgurus.com/activate/' + uid);
    }
pricingimage(){
    return this.http.get('https://apis.rfpgurus.com/super/pricing_images/');
}
    // this.isright,this.model.cardNumber, this.model.expirationdate,this.model.cardcod,this.var_get_id,this.data.course_id,this.model.cardtype,this.model.holdername,this.pkg_detail['type'],this.pkg_detail['dur']
    package_free(isright, cardNumber, expirationdate, cardcod, var_get_id, cardtype, holdername, pkg_type, pkg_dur) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');     
        headers.append('Authorization', 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token);
        return this._https.post("https://apis.rfpgurus.com/agency/agency_payment/",
            JSON.stringify({
                "id": cardNumber,
                "pricepackage": pkg_type,
                "duration": pkg_dur
            }), { headers: headers }).map((data: Response) => data.json());
        
    }
    addCard( name, address, zip, city, state, country, cardno, ccv, expiryDate, var_type_atm, setautopay, nickname) {
        let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token);
          return this._https.post('https://apis.rfpgurus.com/payment/cardInfo_web/',
          JSON.stringify({
            "name": name,
            "street_address": address,
            "zipcode": zip,
            "city": city,
            "state": state,
            "country": country,
            "number": cardno,
            "cvc": ccv,
            "expDate": expiryDate,
            "card_type": var_type_atm,
            "autopay": setautopay,
            "nickname": nickname
          }),{headers:headers}).map(response => response.json())
          // .map((res: Response) => {
          //   if (res) {
          //     if (res.status === 201 || res.status === 200 || res.status === 302 ) {
          //       const responce_data = res.json();
          //       return responce_data;
          //     }
          //   }
          // })
          // .catch((error: any) => {
          //   if (error.status === 302) {
          //     swal({
          //       type: 'error',
          //       title: error.message,
          //       showConfirmButton: false,
          //       timer: 1500, width: '512px',
          //     })
          //     return Observable.throw(new Error(error.status));
          //   } else if (error.status === 405) {
          //     swal({
          //       type: 'error',
          //       title: error.message,
          //       showConfirmButton: false,
          //       timer: 1500, width: '512px',
          //     })
          //     return Observable.throw(new Error(error.status));
          //   }
          //   else if (error.status === 406) {
          //     swal({
          //       type: 'error',
          //       title: error.message,
          //       showConfirmButton: false,
          //       timer: 1500, width: '512px',
          //     })
          //     return Observable.throw(new Error(error.status));
          //   } else if (error.status === 403) {
          //     swal({
          //       type: 'error',
          //       title: error.message,
          //       showConfirmButton: false,
          //       timer: 1500, width: '512px',
          //     })
          //     return Observable.throw(new Error(error.status));
          //   }
          //   else if (error.status === 400) {
          //     swal({
          //       type: 'error',
          //       title: 'Bad Request',
          //       showConfirmButton: false,
          //       timer: 1500, width: '512px',
          //     })
          //     return Observable.throw(new Error(error.status));
          //   }
          // });
      }
    package_free_trial(isright, cardNumber, expirationdate, cardcod, var_get_id, cardtype, holdername, pkg_type, pkg_dur) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');     
        headers.append('Authorization', 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token);
        return this._https.post("https://apis.rfpgurus.com/agency/agency_trial_subscription/",
            JSON.stringify({
                "package_detail": pkg_type,
                "card_info": cardNumber
            }),{ headers: headers }).map((res: Response) => {
                if (res.status == 200) {
                    swal(
                        'Your payment is posted successfully',
                        '',
                        'success'
                    )
                    res.json();
                }
            })
    }
    postagency(agencysearch) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');     
        headers.append('Authorization', 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token);
        return this._https.post("https://apis.rfpgurus.com/add_agency/",
            JSON.stringify({
                "agency": agencysearch,
               
            }),{ headers: headers }).map((res: Response) => {
                if (res.status == 200) {
                    swal(
                        'Your Agency add successfully',
                        '',
                        'success'
                    )
                   
                }
            })
    }
    updateCard(var_status, id, name, cardno, ccv, expiryDate, address, zip, city, state, country, set_auto_pay) {
        return this.http.put('https://apis.rfpgurus.com/payment/cardinfo/',
            JSON.stringify({
                // "cardNumber": cardno,
                "default": var_status,
                "cid": id,
                "name": name,
                // "pinCode": pin,
                "street_address": address,
                "zipcode": zip,
                "city": city,
                "state": state,
                "country": country,
                "number": cardno,
                "cvc": ccv,
                "expDate": expiryDate,
                "autopay": set_auto_pay
            }), { headers: this.authInterceptor.setHeaders() });
    }
    rfpagen() {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');     
        headers.append('Authorization', 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token);
       
        return this._https.get('https://apis.rfpgurus.com/rf_p/allagencies/',
          { headers: headers }).map((response: Response) => response.json());
      }
}
