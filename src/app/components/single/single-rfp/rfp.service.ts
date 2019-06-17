import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RfpService {

  constructor(private http: HttpClient) {  }

  postWatchlist(rfpid) {
    return this.http.post('https://apis.rfpgurus.com/rf_p/watchlist/', JSON.stringify({
      "rfp": rfpid
    }));
  }

  rfprecord(id, val) {
    if (val == 'old') {
      return this.http.get('https://apis.rfpgurus.com/rf_p/old_rfpdata/' + id + '/');
    }
    else {
      return this.http.get('https://apis.rfpgurus.com/rf_p/rfpdata/' + id + '/');
    }
  }

  downloadFile(id) {
    return this.http.get('https://apis.rfpgurus.com/rf_p/download_file/' + id + '/');
  }

}
