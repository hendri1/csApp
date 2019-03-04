import { Injectable } from '@angular/core';
import { AngularFireAuth } from  "@angular/fire/auth";

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';

import * as firebase from 'firebase/app';
import { auth } from  'firebase/app';

import { Helper } from '../providers/helper';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(
    public angularFireAuth: AngularFireAuth,
    private helper: Helper,
    private platform: Platform,
    private googlePlus: GooglePlus
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
      'webClientId': '362179339793-fjrgetqn7b0lji0e3rnd95ebaujddco4.apps.googleusercontent.com',
      'offline': true
    });

    let result = await this.angularFireAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(googleData.idToken))
    this.helper.setStorage('userGoogle', JSON.stringify(result));
    this.helper.checkLogin('login');
  }

  public async loginGoogleWebsite() {
    let result = await this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.helper.setStorage('userGoogle', JSON.stringify(result));
    this.helper.checkLogin('login');
  }

  public async loginFacebook() {
    let result = await this.angularFireAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
    this.helper.setStorage('userFacebook', JSON.stringify(result));
    this.helper.checkLogin('login');
  }

  public async logout() {
    await this.angularFireAuth.auth.signOut();
  }
}