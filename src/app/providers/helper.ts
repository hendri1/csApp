import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

import { Storage } from '@ionic/storage';

@Injectable()
export class Helper {

  private loading: any;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private storage: Storage
  ) { }

  public navigate(url: string) {
    this.router.navigateByUrl(url);
  }

  public createForm(parameter: any) {
    let result: FormGroup;

    result = this.formBuilder.group(parameter);

    return result;
  }

  public resetForm(form: FormGroup) {
    form.reset();
  }

  public async showAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  public async showLoading(message: string) {
    this.loading = await this.loadingController.create({
      message: message
    });
    await this.loading.present();
  }

  public async showLoadingWithDuration(message: string, duration: number) {
    this.loading = await this.loadingController.create({
      message: message,
      duration: duration
    });
    await this.loading.present();
  }

  public dismissLoading() {
    this.loading.dismiss();
  }

  public checkLogin(mode: string) {
    let isLogin = false;

    this.storage.get('token').then((val) => {
      if(val !== '' && val !== null) {
        console.log('user', val);
        isLogin = true;    
      }
    }).finally(() => {
      if(mode === 'login') {
        if(isLogin === true) {
          this.navigate('dashboard');
        } else {
          this.checkLoginGoogle(mode);
        }
      } else {
        if(isLogin !== true) {
          this.checkLoginGoogle(mode);
        }
      }
    });
  }

  public checkLoginGoogle(mode: string) {
    let isLogin: boolean;

    this.storage.get('userGoogle').then((val) => {
      let userGoogle = JSON.parse(val);
      if(userGoogle) {
        if(userGoogle.credential.idToken !== '') {
          console.log('userGoogle', userGoogle);
          isLogin = true;
        }
      }
    }).finally(() => {
      if(mode === 'login') {
        if(isLogin === true) {
          this.navigate('dashboard');
        } else {
          this.checkLoginFacebook(mode);
        }
      } else {
        if(isLogin !== true) {
          this.checkLoginFacebook(mode);
        }
      }
    });
  }

  public checkLoginFacebook(mode: string) {
    let isLogin = false;

    this.storage.get('userFacebook').then((val) => {
      let userFacebook = JSON.parse(val);
      if(userFacebook) {
        if(userFacebook.credential.accessToken !== '') {
          console.log('userFacebook', userFacebook);
          isLogin = true;
        }
      }
    }).finally(() => {
      if(mode === 'login') {
        if(isLogin === true) {
          this.navigate('dashboard');
        }
      } else {
        if(isLogin !== true) {
          this.navigate('intro');
        }
      }
    });
  }

}