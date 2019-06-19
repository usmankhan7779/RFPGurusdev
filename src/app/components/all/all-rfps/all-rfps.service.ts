import { SetHeaders } from './../../../AuthGuards/auth.interceptor';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class AllRfpsService {
    constructor(private http: HttpClient, private authInterceptor: SetHeaders,private _https : Http) { }
    trial_document(id) {
        return this.http.get('https://apis.rfpgurus.com/document_trial/' + id)
    }
    latestrfpecord(items, page) {
        let headers = new Headers();
    if(localStorage.getItem('currentUser')){
      headers = new Headers({'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token});
      
         
        // let headers = new Headers(); 
        headers.append('Content-Type', 'application/json');
         
        // headers.append('Authorization', 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token);
        return this._https.get('https://apis.rfpgurus.com/rf_p/latest/' + items + '?page=' + page,{headers:headers}).map((response: Response) => response.json())
        }
        else{
            return this.http.get('https://apis.rfpgurus.com/rf_p/latest/' + items + '?page=' + page)

        }
    }
    downloadFile(id) {
        return this.http.get('https://apis.rfpgurus.com/rf_p/download_file/' + id + '/')
    }
    fiter_rfp(val, model, page) {
        if (model == 'old') {
            return this.http.post('https://apis.rfpgurus.com/rf_p/filterforAdmin/old' + '?page=' + page, {
                'filter': val.toString()
            });
        } else if (model == 'new') {
            return this.http.post('https://apis.rfpgurus.com/rf_p/filterforAdmin/new' + '?page=' + page, {
                'filter': val.toString()
            });
        }

    }
    update_rfp(id, rfp_number, rfpkey, title, descriptionTag, states, agency, date_entered, due_date, web_info, rfp_reference, category, subcat, seoTitleUrl, bid_type, agency_type, city_or_county, city, open_rfp, record_added, data_model, oldcat) {
        if (category) {
            var cate = category.toString()
        }
        if (subcat) {
            var subcat = subcat.toString()
        }
        var plainText = descriptionTag.replace(/<[^>]*>/g, '');
        if (data_model == false) {
            return this.http.put('https://apis.rfpgurus.com/rf_p/edit_rfp_old_table/' + id, JSON.stringify({
                "rfpkey": rfpkey,
                "rfp_number": rfp_number,
                "title": title,
                "record_added": record_added,
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
                "category": oldcat,
                "deescription": plainText
            }), { headers: this.authInterceptor.setHeaders() });
        } else {
            return this.http.put('https://apis.rfpgurus.com/rf_p/edit_rfp_cleaning_table/' + id, JSON.stringify({
                "rfpkey": rfpkey,
                "rfp_number": rfp_number,
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
                "category": oldcat,
                "deescription": plainText
            }), { headers: this.authInterceptor.setHeaders() });
        }

    }
    add_rfp(rfpkey, governmentbidsusers, title, descriptionTag, states, agency, date_entered, due_date, web_info, rfp_reference, category, subcat, seoTitleUrl, bid_type, agency_type, city_or_county, city, open_rfp, record_added, oldcat, url) {
        if (category) {
            var cate = category.toString()
        }
        if (subcat) {
            var subcat = subcat.toString()
        }
        var plainText = descriptionTag.replace(/<[^>]*>/g, '');
        return this.http.post('https://apis.rfpgurus.com/rf_p/add_rfp/', JSON.stringify({
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
        }));
    }
    post_url(url) {
        return this.http.post('https://apis.rfpgurus.com/rf_p/addprofileurl/', JSON.stringify({
            "profile_url": url
        }));
    }
}