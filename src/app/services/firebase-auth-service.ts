import { Injectable } from '@angular/core';
import { AngularFireAuth } from  "@angular/fire/auth";

import { auth } from  'firebase/app';

import { Storage } from '@ionic/storage';

import { Helper } from '../providers/helper';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(
    public angularFireAuth: AngularFireAuth,
    private storage: Storage,
    private helper: Helper
  ) {
  }

  public async loginGoogle() {
    let result = await this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.storage.set('userGoogle', JSON.stringify(result));
    this.helper.checkLogin('login');
  }

  public async loginFacebook() {
    let result = await this.angularFireAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
    this.storage.set('userFacebook', JSON.stringify(result));
    this.helper.checkLogin('login');
  }

  public async logout() {
    await this.angularFireAuth.auth.signOut();
  }
}