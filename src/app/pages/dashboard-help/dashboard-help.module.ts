import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardHelpPage } from './dashboard-help.page';

import { ComponentsModule } from '../../modules/components.module';
import { PipesModules } from '../../modules/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: DashboardHelpPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PipesModules,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DashboardHelpPage
  ],
})
export class DashboardHelpPageModule {}
