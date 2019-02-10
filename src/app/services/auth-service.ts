import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiVariable } from '../providers/globals';

@Injectable()
export class AuthService {

  constructor(
    private router: Router,
    private http: Http,
    private storage: Storage
  ) {

  }

  public logout() {
    this.storage.clear();
    this.router.navigateByUrl('');
  }

  public login(user: any): Observable<boolean> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    let params = '_username='+encodeURIComponent(user['email'])+'&_password='+encodeURIComponent(user['password']);
    let url = ApiVariable.apiDev + '/api/login';
    return this.http.post(url, params, options)
    .pipe(map((response: any) => {
      let res = response.json();
      if (res) {
        this.storage.set('token', res['token']);
        return res;
      }
    }));
  }

  public register(user: any): Observable<boolean> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    let params = 'name='+encodeURIComponent(user['full_name'])+'&email='+encodeURIComponent(user['email'])+'&current_address='+encodeURIComponent(user['address'])+'&phone='+encodeURIComponent(user['mobile_number'])+'&driver_license='+encodeURIComponent(user['driver_license_number'])+'&password='+encodeURIComponent(user['password'])+'&date='+encodeURIComponent(user['dob'])+'&is_fake_account='+encodeURIComponent('1');
    let url = ApiVariable.apiDev + '/api/register';
    return this.http.post(url, params, options)
    .pipe(map((response: any) => {
      let res = response.json();
      if (res) {
        this.storage.set('token', res['token']);
        return res;
      }
    }));
  }
}