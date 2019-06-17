import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CategoryRfpService {

  constructor(private http: HttpClient) { }
  subcatrfprecord(state, items, page) {
    return this.http.get('https://apis.rfpgurus.com/rf_p/subcat/' + state + '/' + items + '?page=' + page);
  }
  catrfprecord(state, items, page) {
    return this.http.get('https://apis.rfpgurus.com/rf_p/cat/' + state + '/' + items + '?page=' + page);
  }
  downloadFile(id) {
    return this.http.get('https://apis.rfpgurus.com/rf_p/download_file/' + id + '/');
  }
}
