import { SetHeaders } from './../../../AuthGuards/auth.interceptor';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HeaderService {
  constructor(private http: HttpClient, private authInterceptor: SetHeaders) { }

  logdetail() {
    return this.http.get('https://apis.rfpgurus.com/rf_p/logDetail/')
  }

  notify() {
    return this.http.get('https://apis.rfpgurus.com/user_notifications/');
  }

  deletenotify(id: string) {
    return this.http.delete('https://apis.rfpgurus.com/read_delete/' + id + '/');
  }

  Updatenotify(id: string) {
    return this.http.put('https://apis.rfpgurus.com/read_delete/' + id + '/', JSON.stringify({})
      , { headers: this.authInterceptor.setHeaders() });
  }
  Watchlist() {
    return this.http.get('https://apis.rfpgurus.com/rf_p/watchlist/');
  }

  deleteallnotify() {
    return this.http.delete('https://apis.rfpgurus.com/delete_all_notification/');
  }

  deleteWatchlist(rfpid: string) {
    return this.http.delete('https://apis.rfpgurus.com/rf_p/watchlistdelete/' + rfpid);
  }

  AlldeleteWatchlist() {
    return this.http.delete('https://apis.rfpgurus.com/rf_p/Delete_all_watch_list/');
  }

  searchrecord(obj: string) {
    return this.http.get('https://apis.rfpgurus.com/rf_p/search_id/' + obj + '/10?page=1');
  }

  searchSuggestions(obj: string) {
    return this.http.post('https://apis.rfpgurus.com/rf_p/search_key/' + '15?page=1', { "query": obj });
  }


}
