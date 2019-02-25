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
    // this.googlePlus.login({
    //   'webClientId': '556411616998-hhm0as4fk3o8pr5unb2b3694qh6div3c.apps.googleusercontent.com',
    //   'offline': true
    // }).then(res => {
    //   const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.idToken);
    //   firebase.auth().signInWithCredential(googleCredential).then(response => {
    //     this.helper.setStorage('userGoogle', JSON.stringify(response));
    //     this.helper.checkLogin('login');
    //   });
    // });
    await this.googlePlus.login({
      'webClientId': '732132277458-itm9q9nu9nq6ea7vc7ed4od3isdn41ol.apps.googleusercontent.com',
      'offline': true,
      'scopes': 'profile email'
    }).then(result =>{
      this.helper.showAlert('test success', 'test success', JSON.stringify(result));
      // this.helper.setStorage('userGoogle', JSON.stringify(result));
      // this.helper.checkLogin('login');
    }, err =>{
      this.helper.showAlert('test error', 'test error', err);
      console.log(err);
    });

    // let result = await this.angularFireAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(googlePlusUser.idToken))
    // this.helper.setStorage('userGoogle', JSON.stringify(result));
    // this.helper.checkLogin('login');
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