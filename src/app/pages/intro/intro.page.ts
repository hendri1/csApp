import { Component, OnInit } from '@angular/core';

import { Helper } from '../../providers/helper';
import { introSlides } from '../../providers/globals';
import { IntroSlidesInterface } from './intro.interface';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  providers: [Helper],
})
export class IntroPage implements OnInit {

  public slides: IntroSlidesInterface;

  constructor(
    private helper: Helper
  ) {
    this.slides = introSlides;
  }

  ngOnInit() {
    console.log('intro has been init');
    
    this.helper.checkLogin('login');
  }

  public navigate(url: string) {
    this.helper.navigate(url);
  }

}
