import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Storage } from '@ionic/storage';
import * as moment from 'moment';

import { Subscription } from 'rxjs';

import { UserService } from '../../services/user-service';
import { Helper } from '../../providers/helper';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  providers: [Helper, UserService],
})
export class HistoryPage implements OnInit {

  public menuSelected: string;
  public title: string;
  public username: string;

  public lineChart: Object;
  public linearGauge: Object;

  private subsScore: Subscription;

  constructor(
    private helper: Helper,
    private router: Router,
    private storage: Storage,
    private userService: UserService
  ) {
    this.menuSelected = 'history';
    this.title = 'History';
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      let current_route = this.router.url.toString();
      if (event instanceof NavigationEnd && current_route === '/history') {        
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
  }

  private initForm() {
    this.helper.checkLogin('logout');

    this.storage.get('token').then((val) => {
      if(val !== null) {
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

  private getScore(token: string) {
    if (this.subsScore != undefined) {
      this.subsScore.unsubscribe();
    }

    this.subsScore = this.userService.getScore(token).subscribe(
      (result) => {
        let lastData = result['data'].length - 1;
        this.linearGauge['pointers']['pointer'][0]['value'] = result['data'][lastData]['score'];

        let datas = [];
        for (let index in result['data']) {
          let data = {
            label: '',
            value: 0,
            anchorBorderColor: '',
            anchorBgColor: '',
            color: '',
          }
          for (let key in result['data'][index]) {
            if(key === 'score') {
              data['value'] = parseInt(result['data'][index][key]);
            } else if(key === 'timestamp') {
              let label = moment(result['data'][index][key]).format('MMM DD');
              data['label'] = label;
            }
          }
          data['anchorBorderColor'] = '#FFA000';
          data['anchorBgColor'] = '#FFA000';
          data['color'] = '#FFA000';
          datas.push(data);
        }
        
        this.lineChart['data'] = datas;
      },
      err => {
        console.log(err);
    });
  }

}
