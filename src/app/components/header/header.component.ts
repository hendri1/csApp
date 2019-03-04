import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router';

import { Storage } from '@ionic/storage';

import { Subscription } from 'rxjs';

import { menuHeader } from '../../providers/globals';
import { Helper } from '../../providers/helper';
import { AuthService } from '../../services/auth-service';
import { UserService } from '../../services/user-service';
import { FirebaseAuthService } from '../../services/firebase-auth-service';

import { MenuInterface } from './header.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [UserService, AuthService, FirebaseAuthService, Helper],
})
export class HeaderComponent implements OnInit {

  public username: string;
  public menu: MenuInterface;
  
  private subsCreditReport: Subscription;

  @ViewChild('sidenav') sidenav: MatSidenav;
  @Input() title: string;
  @Input() isDashboard: boolean;
  @Input() isDashboardHelp: boolean;

  constructor(
    private helper: Helper,
    private storage: Storage,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private firebaseAuthService: FirebaseAuthService
  ) { 
    this.menu = menuHeader;
  }

  ngOnInit() {
    this.storage.get('token').then((val) => {
      if(val !== null) {
        this.storage.get('personInfo').then((valPerson) => {
          if(valPerson === null) {
            this.getCreditReport(val);
          } else {
            this.username = valPerson['fullname'];
          }
        });
      }
    });

    this.storage.get('userGoogle').then((val) => {
      if(val !== null) {
        let data = JSON.parse(val);
        this.username = data.user.displayName;
      }
    });
    
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {        
        this.sidenav.close();
      }
    });
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

  public navigate(url: string) {    
    this.helper.navigate(url);
    this.sidenav.close();
  }

  public logout() {
    this.firebaseAuthService.logout();
    this.authService.logout();
  }

  public openMenu() {
    let container = document.getElementById('nav');
    container.style.zIndex = '999999999';
    this.sidenav.open();
  }

  public closeMenu() {
    let container = document.getElementById('nav');
    container.style.zIndex = '999';
    this.sidenav.close();
  }

}
