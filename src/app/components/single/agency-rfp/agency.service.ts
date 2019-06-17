import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AgencyService {

    constructor(private http: HttpClient) { }
    staterecord(agency, items, page) {
        return this.http.get('https://apis.rfpgurus.com/rf_p/agency/' + agency + '/' + items + '?page=' + page);
    }

    downloadFile(id) {
        return this.http.get('https://apis.rfpgurus.com/rf_p/download_file/' + id + '/');
    }
}
