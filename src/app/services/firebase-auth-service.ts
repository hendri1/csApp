import { Injectable } from '@angular/core';
import { AngularFireAuth } from  "@angular/fire/auth";

import { auth } from  'firebase/app';

import { Helper } from '../providers/helper';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(
    public angularFireAuth: AngularFireAuth,
    private helper: Helper
  ) {
  }

  public async loginGoogle() {
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