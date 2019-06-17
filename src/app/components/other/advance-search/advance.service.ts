import { SetHeaders } from './../../../AuthGuards/auth.interceptor';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AdvanceService {

  constructor(private http: HttpClient, private authInterceptor: SetHeaders) { }
  trial_document() {
    return this.http.get('https://apis.rfpgurus.com/document_trial/');
  }
  dropdown(state, agency, category, sub_category) {
    return this.http.post('https://apis.rfpgurus.com/rf_p/drop_down/', JSON.stringify({
      "state": state,
      "agency": agency,
      "category": category,
      "sub_category": sub_category
    }), { headers: this.authInterceptor.setHeaders() });
  }
  admindropdown(state) {
    return this.http.post('https://apis.rfpgurus.com/rf_p/add_rfp_dropdown/', JSON.stringify({
      "state": state,
    }));
  }
  oldcategories(old) {
    return this.http.post('https://apis.rfpgurus.com/rf_p/get_new_cat_sub/', JSON.stringify({
      "old_cat": old,
    }));
  }
  rfpcity(value) {
    return this.http.post('https://apis.rfpgurus.com/county_city', JSON.stringify({ "county": value }));
  }
  rfpcounty(value) {
    return this.http.post('https://apis.rfpgurus.com/state_county', JSON.stringify({ "state": value }));
  }
  rfpagency(value) {
    return this.http.post('https://apis.rfpgurus.com/state_agency', JSON.stringify({ "state": value }));
  }
  rfpagen() {
    return this.http.get('https://apis.rfpgurus.com/rf_p/allagencies/');
  }
  rfpsubcat(val) {
    return this.http.post('https://apis.rfpgurus.com/rf_p/searchby_multiple_categories/', JSON.stringify({ "category": val }));
  }
  rfpsinglesubcat(val) {
    return this.http.post('https://apis.rfpgurus.com/rf_p/search_sub_category/', JSON.stringify({ "category": val }));
  }
  downloadFile(id) {
    return this.http.get('https://apis.rfpgurus.com/rf_p/download_file/' + id + '/');
  }
  advancesearch(Rfpnum, title, status, enterdate, duedate, state, agency, cat, items, page, subcate) {
    return this.http.put('https://apis.rfpgurus.com/rf_p/advance/' + items + '/?page=' + page,
      JSON.stringify({
        "rfp_key": Rfpnum,
        "title": title,
        "status": status,
        "posted_from": enterdate,
        "posted_to": duedate,
        "state": state,
        "agency": agency,
        "category": cat,
        "sub_category": subcate
      }), { headers: this.authInterceptor.setHeaders() });

  }
  searchrfprecord(Rfpnum, title, status, enterdate, duedate, state, agency, cat, items, page, subcat, submissionfrom, submissionto) {
    return this.http.put('https://apis.rfpgurus.com/rf_p/filters/' + items + '/?page=' + page,
      JSON.stringify({
        "rfp_key": Rfpnum,
        "title": title,
        "status": status,
        "posted_from": enterdate,
        "posted_to": duedate,
        "state": state,
        "agency": agency,
        "category": cat,
        "sub_category": subcat,
        "submission_from": submissionfrom,
        "submission_to": submissionto
      }), { headers: this.authInterceptor.setHeaders() });
  }
}
