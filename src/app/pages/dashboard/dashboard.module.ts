import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { GaugeChartComponent } from 'angular-gauge-chart';
import { MomentModule } from 'ngx-moment';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';

import { ComponentsModule } from '../../modules/components.module';

import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Widgets from 'fusioncharts/fusioncharts.widgets';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

FusionChartsModule.fcRoot(FusionCharts, Charts, Widgets, FusionTheme);

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MomentModule,
    ComponentsModule,
    FusionChartsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DashboardPage,
    GaugeChartComponent
  ]
})
export class DashboardPageModule {}
