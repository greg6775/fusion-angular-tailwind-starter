import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    title: 'BBN Music - Drop in with your Audience'
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/auth/signup/signup.component').then(m => m.SignupComponent),
    title: 'Sign Up - BBN Music'
  },
  {
    path: 'signin',
    loadComponent: () => import('./pages/auth/signin/signin.component').then(m => m.SigninComponent),
    title: 'Sign In - BBN Music'
  },
  {
    path: 'c',
    loadChildren: () => import('./pages/dashboard/dashboard.routes').then(m => m.dashboardRoutes)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.routes').then(m => m.adminRoutes)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent),
    title: 'Settings - BBN Music'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
