import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { Storage } from '@ionic/storage';

import { AuthService } from '../../services/auth-service';
import { FirebaseAuthService } from '../../services/firebase-auth-service';
import { Helper } from '../../providers/helper';
import { offersData } from '../../providers/globals';

import { OffersInterface } from './offers.interface';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
  providers: [FirebaseAuthService, AuthService, Helper],
})
export class OffersPage implements OnInit {

  public offers: OffersInterface;

  public menuSelected: string;
  public title: string;
  public username: string;

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    private authService: AuthService,
    private helper: Helper,
    private firebaseAuthService: FirebaseAuthService,
    private storage: Storage
  ) {
    this.menuSelected = 'offers';
    this.title = 'Offers';

    this.offers = offersData;
  }

  ngOnInit() {
    this.storage.get('token').then((val) => {
      if(val !== null) {

      }
    });

    this.storage.get('userGoogle').then((val) => {
      if(val !== null) {
        let data = JSON.parse(val);
        this.username = data.user.providerData[0].displayName;
      }
    });

    this.storage.get('userFacebook').then((val) => {
      if(val !== null) {
        let data = JSON.parse(val);
        this.username = data.user.providerData[0].displayName;
      }
    });
  }

  public logout() {
    this.firebaseAuthService.logout();
    this.authService.logout();
  }

  public navigate(url: string) {
    this.helper.navigate(url);
  }

}
