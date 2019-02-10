import { Component, OnInit } from '@angular/core';

import { howItWorksData } from '../../providers/globals';

import { HowItWorksInterface } from './how-it-works.interface';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.page.html',
  styleUrls: ['./how-it-works.page.scss'],
})
export class HowItWorksPage implements OnInit {
  
  public title: string;

  public data: HowItWorksInterface;

  constructor(

  ) {
    this.title = 'How It Works';

    this.data = howItWorksData;
  }

  ngOnInit() {
  }

}
