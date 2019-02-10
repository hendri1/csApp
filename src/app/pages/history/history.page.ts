import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { Storage } from '@ionic/storage';

import { AuthService } from '../../services/auth-service';
import { FirebaseAuthService } from '../../services/firebase-auth-service';
import { Helper } from '../../providers/helper';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  providers: [FirebaseAuthService, AuthService, Helper],
})
export class HistoryPage implements OnInit {

  public menuSelected: string;
  public title: string;
  public username: string;

  @ViewChild('sidenav') sidenav: MatSidenav;

  public lineChart: Object;
  public linearGauge: Object;

  constructor(
    private authService: AuthService,
    private helper: Helper,
    private firebaseAuthService: FirebaseAuthService,
    private storage: Storage
  ) {
    this.menuSelected = 'history';
    this.title = 'History';
  }

  ngOnInit() {
    this.helper.checkLogin('logout');
    
    this.linearGauge = {
      'chart': {
        'bgColor': '#4A6BE2',
        'baseFont': 'Rubik-Medium',
        'baseFontSize': '11',
        'baseFontColor': '#FFF',
        'theme': 'fusion',
        'lowerLimit': '0',
        'upperLimit': '1000',
        'chartBottomMargin': '40',
        'valueFontSize': '11',
        'valueFontBold': '0'
      },
      'colorRange': {
        'color': [
          {
            'minValue': '0',
            'maxValue': '300',
            'label': 'Poor',
            'code': '#FF7922',
          },
          {
            'minValue': '301',
            'maxValue': '650',
            'label': 'Fair',
            'code': '#FEAD20',
          },
          {
            'minValue': '651',
            'maxValue': '750',
            'label': 'Good',
            'code': '#FAD30F',
          },
          {
            'minValue': '751',
            'maxValue': '850',
            'label': 'Very Good',
            'code': '#AAD31E',
          },
          {
            'minValue': '851',
            'maxValue': '1000',
            'label': 'Exceptional',
            'code': '#56C624',
          }
        ]
      },
      'pointers': {
        'pointer': [
          {
            'value': '650'
          }
        ]
      }
    }

    this.lineChart = {
      'chart': {
        'bgColor': '#FAFAFA',
        'baseFont': 'Rubik-Medium',
        'baseFontSize': '11',
        'baseFontColor': '#000',
        'divLineColor': '#D8D8D8',
        'numVDivLines': '3',
        'theme': 'fusion',
      },
      'data': [{
        'label': 'Dec 10',
        'value': '700',
        'anchorBorderColor': '#FFA000',
        'anchorBgColor': '#FFA000',
        'color': '#FFA000'
      }, {
        'label': 'Dec 15',
        'value': '300',
        'anchorBorderColor': '#FFA000',
        'anchorBgColor': '#FFA000',
        'color': '#FFA000'
      }, {
        'label': 'Dec 20',
        'value': '900',
        'anchorBorderColor': '#FFA000',
        'anchorBgColor': '#FFA000',
        'color': '#FFA000'
      }]
    };

    this.storage.get('token').then((val) => {
      if (val !== null) {

      }
    });

    this.storage.get('userGoogle').then((val) => {
      if (val !== null) {
        let data = JSON.parse(val);
        this.username = data.user.providerData[0].displayName;
      }
    });

    this.storage.get('userFacebook').then((val) => {
      if (val !== null) {
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
