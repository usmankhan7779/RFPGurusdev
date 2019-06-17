
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class StateService {
  constructor(private http: HttpClient) {  }

  staterecord(state, items, page) {
    return this.http.get('https://apis.rfpgurus.com/rf_p/std/' + state + '/' + items + '?page=' + page);
  }

  downloadFile(id) {
    return this.http.get('https://apis.rfpgurus.com/rf_p/download_file/' + id + '/');
  }

  unsub_staterecord(state, items, page) {
    return this.http.get('https://apis.rfpgurus.com/rf_p/unsub_std/' + state + '/' + items + '?page=' + page);
  }
}
