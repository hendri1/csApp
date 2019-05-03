import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Storage } from '@ionic/storage';

import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { UserService } from '../../services/user-service';
import { Helper } from '../../providers/helper';
import { UserInterface } from './reports.interface';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
  providers: [Helper, UserService],
})
export class ReportsPage implements OnInit {

  public menuSelected: string;
  public title: string;
  public username: string;
  public panelOpenState: boolean;
  public userInformation: UserInterface;

  private subsScore: Subscription;
  private subsUser: Subscription;

  public linearGauge: Object;

  constructor(
    private helper: Helper,
    private router: Router,
    private userService: UserService,
    private storage: Storage
  ) {
    this.menuSelected = 'reports';
    this.title = 'Reports';
    this.panelOpenState = false;

    this.userInformation = {
      fullname: '',
      ohtername: '',
      dob: '',
      drivers_license: '',
      employer: '',
      address: {
        address: '',
        first_reported: '',
        last_reported: ''
      }
    }
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      let current_route = this.router.url.toString();
      if (event instanceof NavigationEnd && current_route === '/reports') {     
        this.initForm();
      }
    });

    this.initForm();

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
  }

  private initForm() {
    this.helper.checkLogin('logout');

    this.storage.get('token').then((val) => {
      if(val !== null) {
        this.getScore(val);
        this.getDetailUser(val);
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

  private getScore(token: string) {
    if (this.subsScore != undefined) {
      this.subsScore.unsubscribe();
    }

    this.subsScore = this.userService.getScore(token).subscribe(
      (result) => {
        let lastData = result['data'].length - 1;
        this.linearGauge['pointers']['pointer'][0]['value'] = result['data'][lastData]['score'];
      },
      err => {
        console.log(err);
    });
  }

  private getDetailUser(token: string) {
    if (this.subsUser != undefined) {
      this.subsUser.unsubscribe();
    }

    this.subsUser = this.userService.getCreditReport(token).subscribe(
      (result) => {
        const data = result['data']['personInfo'];
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            if(key === 'dob') {
              let dob = moment(data[key], 'DD/MM/YYYY').format('DD/MM/YYYY');
              this.userInformation['dob'] = dob;
            } else if(key === 'addresses') {
              let first_reported = moment(data[key][0]['first_reported'], 'DD-MM-YYYY').format('DD-MM-YYYY');
              let last_reported = moment(data[key][0]['last_reported'], 'DD-MM-YYYY').format('DD-MM-YYYY');

              this.userInformation['address']['address'] = data[key][0]['address'];
              this.userInformation['address']['first_reported'] = first_reported;
              this.userInformation['address']['last_reported'] = last_reported;
            }

            if(typeof this.userInformation[key] !== 'undefined') {
              this.userInformation[key] = data[key];
            }
          }
        }
      },
      err => {
        console.log(err);
    });
  }

}
