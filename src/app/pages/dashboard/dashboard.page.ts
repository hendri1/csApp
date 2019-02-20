import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Storage } from '@ionic/storage';

import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth-service';
import { UserService } from '../../services/user-service';
import { FirebaseAuthService } from '../../services/firebase-auth-service';
import { Helper } from '../../providers/helper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  providers: [FirebaseAuthService, AuthService, UserService, Helper],
})
export class DashboardPage implements OnInit {

  public menuSelected: string;
  public title: string;
  public username: string;
  public canvasWidth: number;
  public needleValue: number;
  public centralLabel: string;
  public name: string;
  public bottomLabel: string;
  public options: any;
  public lastUpdated: number;

  private subsScore: Subscription;
  private subsCreditReport: Subscription;

  public gaugeChart: Object;

  constructor(
    private authService: AuthService,
    private firebaseAuthService: FirebaseAuthService,
    private userService: UserService,
    private helper: Helper,
    private storage: Storage,
    private router: Router
  ) {
    this.menuSelected = 'dashboard';
    this.title = 'Dashboard';

    this.canvasWidth = 300;
    this.needleValue = 10;
    this.centralLabel = '';
    this.name = '';
    this.bottomLabel = '';
    this.options = {
      hasNeedle: true,
      needleColor: '#FFF',
      arcColors: ['#464646', '#FE2F22', '#FF7922', '#FEAD20', '#FAD30F', '#AAD31E', '#56C624'],
      arcDelimiters: [10, 20, 30, 55, 70, 85],
    };

    this.gaugeChart = {
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
            'code': '#FF7922',
          },
          {
            'minValue': '301',
            'maxValue': '650',
            'code': '#FEAD20',
          },
          {
            'minValue': '651',
            'maxValue': '750',
            'code': '#FAD30F',
          },
          {
            'minValue': '751',
            'maxValue': '850',
            'code': '#AAD31E',
          },
          {
            'minValue': '851',
            'maxValue': '1000',
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
    };
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      let current_route = this.router.url.toString();
      if (event instanceof NavigationEnd && current_route === '/dashboard') {        
        this.initForm();
      }
    });

    this.initForm();
  }

  public initForm() {
    this.helper.checkLogin('logout');

    this.storage.get('token').then((val) => {
      if(val !== null) {
        this.storage.get('personInfo').then((valPerson) => {
          if(valPerson === null) {
            this.getCreditReport(val);
          } else {
            this.username = valPerson['fullname'];
          }
        });

        this.getScore(val);
      }
    });

    this.storage.get('userGoogle').then((val) => {
      if(val !== null) {
        let data = JSON.parse(val);
        this.username = data.user.providerData[0].displayName;
        this.getScore(data.credential.idToken);
      }
    });

    this.storage.get('userFacebook').then((val) => {
      if(val !== null) {
        let data = JSON.parse(val);
        this.username = data.user.providerData[0].displayName;
        this.getScore(data.credential.idToken);
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

  private getCreditReport(token: string) {
    if (this.subsCreditReport != undefined) {
      this.subsCreditReport.unsubscribe();
    }

    this.subsCreditReport = this.userService.getCreditReport(token).subscribe(
      (result) => {
        this.helper.setStorage('personInfo', result['data']['personInfo']);
        this.username = result['data']['personInfo']['fullname'];
      },
      err => {
        console.log(err);
    });
  }

  private getScore(token: string) {
    if (this.subsScore != undefined) {
      this.subsScore.unsubscribe();
    }

    this.subsScore = this.userService.getScore(token).subscribe(
      (result) => {
        let lastData = result['data'].length - 1;
        this.needleValue = result['data'][lastData]['score'];
        this.lastUpdated = result['data'][lastData]['timestamp'];
      },
      err => {
        console.log(err);
    });
  }

}
