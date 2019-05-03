import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable()
export class SupportService {

  constructor(
    private http: Http,
  ) {

  }

  public contactUs(data: any): Observable<boolean> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    let params = 'firstname='+encodeURIComponent(data['name'])+'&email='+encodeURIComponent(data['email'])+'&subject='+encodeURIComponent(data['subject'])+'&messages='+encodeURIComponent(data['messages']);
    let url = environment.api + '/api/contact-us';
    return this.http.post(url, params, options)
    .pipe(map((response: any) => {
      let res = response.json();
      if (res) {
        return res;
      }
    }));
  }

  public checkTokenGoogle(token: string): Observable<boolean> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    let params = 'id_token='+encodeURIComponent(token);
    let url = environment.api + '/api/check-oauth-token';
    return this.http.post(url, params, options)
    .pipe(map((response: any) => {
      let res = response.json();
      if (res) {
        return res;
      }
    }));
  }

  public checkTokenFacebook(token: string): Observable<boolean> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    let params = 'id_token='+encodeURIComponent(token);
    let url = environment.api + '/api/check-fb-oauth-token';
    return this.http.post(url, params, options)
    .pipe(map((response: any) => {
      let res = response.json();
      if (res) {
        return res;
      }
    }));
  }

}