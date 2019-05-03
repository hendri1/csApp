import { Injectable } from '@angular/core';
import { AngularFireAuth } from  "@angular/fire/auth";

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import * as firebase from 'firebase/app';
import { auth } from  'firebase/app';

import { Helper } from '../providers/helper';
import { environment } from '../../environments/environment';

import { SupportService } from './support-service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(
    public angularFireAuth: AngularFireAuth,
    private helper: Helper,
    private storage: Storage,
    private platform: Platform,
    private googlePlus: GooglePlus,
    private facebook: Facebook,
    private supportService: SupportService
  ) {
  }

  public async loginGoogle() {
    if (this.platform.is('cordova')) {
      this.loginGoogleMobile();
    } else {
      this.loginGoogleWebsite();
    }
  }

  public async loginGoogleMobile() {
    let googleData = await this.googlePlus.login({
      'webClientId': environment.google_app_id,
      'offline': true
    });

    let result = await this.angularFireAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(googleData.idToken))
    this.helper.showAlert('title', '', JSON.stringify(result));
    this.helper.showAlert('title', '', JSON.stringify(result['apiKey']));
    this.helper.showAlert('title', '', JSON.stringify(result['authDomain']));
    // this.checkLoginGoogle(result, result['credential']['accessToken']);
  }

  public async loginGoogleWebsite() {
    let result = await this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.checkLoginGoogle(result, result['credential']['idToken']);
  }

  public checkLoginGoogle(result: any, token: string) {
    let errorMsg = [];
    this.supportService.checkTokenGoogle(token).subscribe(
      (response) => {
        if(response['jwt_token']) {
          this.helper.setStorage('userGoogle', JSON.stringify(result));
          this.helper.checkLogin('login');
        } else {
          let user = {
            email: response['payload']['email']
          };
          this.storage.set('user', user);
          this.helper.navigate('sign-up-one');
        }
      },
      err => {
        errorMsg = JSON.parse(err['_body']);
        errorMsg['title'] = errorMsg['message'];
        errorMsg['message'] = 'Please try again';
        this.helper.showAlert(errorMsg['title'], '', errorMsg['message']);
      });
  }

  public async loginFacebook() {
    if (this.platform.is('cordova')) {
      this.loginFacebookMobile();
    } else {
      this.loginFacebookWebsite();
    }
  }

  public async loginFacebookMobile() {
    let facebookData = await this.facebook.login(['email']);

    let result = await this.angularFireAuth.auth.signInWithCredential(firebase.auth.FacebookAuthProvider.credential(facebookData.authResponse.accessToken))
    this.checkLoginFacebook(result, result['credential']['accessToken']);
  }

  public async loginFacebookWebsite() {
    let result = await this.angularFireAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
    this.checkLoginFacebook(result, result['credential']['accessToken']);
  }

  public checkLoginFacebook(result: any, token: string) {
    let errorMsg = [];
    this.supportService.checkTokenFacebook(token).subscribe(
      (response) => {
        if(response['jwt_token']) {
          this.helper.setStorage('userFacebook', JSON.stringify(result));
          this.helper.checkLogin('login');
        } else {
          let user = {
            email: result['user']['email']
          };
          this.storage.set('user', user);
          this.helper.navigate('sign-up-one');
        }
      },
      err => {
        errorMsg = JSON.parse(err['_body']);
        errorMsg['title'] = errorMsg['message'];
        errorMsg['message'] = 'Please try again';
        this.helper.showAlert(errorMsg['title'], '', errorMsg['message']);
      });
  }

  public async logout() {
    await this.angularFireAuth.auth.signOut();
  }
}