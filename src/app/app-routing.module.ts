import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'intro', pathMatch: 'full' },
  { path: 'intro', loadChildren: './pages/intro/intro.module#IntroPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule' },
  { path: 'offers', loadChildren: './pages/offers/offers.module#OffersPageModule' },
  { path: 'dashboard-help', loadChildren: './pages/dashboard-help/dashboard-help.module#DashboardHelpPageModule' },
  { path: 'reports', loadChildren: './pages/reports/reports.module#ReportsPageModule' },
  { path: 'history', loadChildren: './pages/history/history.module#HistoryPageModule' },
  { path: 'sign-up', loadChildren: './pages/sign-up/sign-up.module#SignUpPageModule' },
  { path: 'forgot-password', loadChildren: './pages/forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  { path: 'sign-up-one', loadChildren: './pages/sign-up-one/sign-up-one.module#SignUpOnePageModule' },
  { path: 'sign-up-two', loadChildren: './pages/sign-up-two/sign-up-two.module#SignUpTwoPageModule' },
  { path: 'sign-up-three', loadChildren: './pages/sign-up-three/sign-up-three.module#SignUpThreePageModule' },
  { path: 'account-settings', loadChildren: './pages/account-settings/account-settings.module#AccountSettingsPageModule' },
  { path: 'contact-us', loadChildren: './pages/contact-us/contact-us.module#ContactUsPageModule' },
  { path: 'how-it-works', loadChildren: './pages/how-it-works/how-it-works.module#HowItWorksPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
