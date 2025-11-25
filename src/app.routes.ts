import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const appRoutes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) 
  },
  { 
    path: 'app/:id', 
    loadComponent: () => import('./components/app-details/app-details.component').then(m => m.AppDetailsComponent)
  },
  { 
    path: 'publish', 
    loadComponent: () => import('./components/publish-app/publish-app.component').then(m => m.PublishAppComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'auth', 
    loadComponent: () => import('./components/auth/auth.component').then(m => m.AuthComponent)
  },
  { 
    path: 'user-dashboard', 
    loadComponent: () => import('./components/user-dashboard/user-dashboard.component').then(m => m.UserDashboardComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'publisher-dashboard', 
    loadComponent: () => import('./components/publisher-dashboard/publisher-dashboard.component').then(m => m.PublisherDashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'account-settings',
    loadComponent: () => import('./components/account-settings/account-settings.component').then(m => m.AccountSettingsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'help',
    data: { title: 'Help Center' },
    loadComponent: () => import('./components/placeholder-page/placeholder-page.component').then(m => m.PlaceholderPageComponent)
  },
  {
    path: 'policy',
    data: { title: 'Developer Policy' },
    loadComponent: () => import('./components/placeholder-page/placeholder-page.component').then(m => m.PlaceholderPageComponent)
  },
    {
    path: 'developers',
    data: { title: 'For Developers' },
    loadComponent: () => import('./components/placeholder-page/placeholder-page.component').then(m => m.PlaceholderPageComponent)
  },
  {
    path: 'about',
    data: { title: 'About Us' },
    loadComponent: () => import('./components/placeholder-page/placeholder-page.component').then(m => m.PlaceholderPageComponent)
  },
  {
    path: 'contact',
    data: { title: 'Contact Us' },
    loadComponent: () => import('./components/placeholder-page/placeholder-page.component').then(m => m.PlaceholderPageComponent)
  },
  {
    path: 'privacy',
    data: { title: 'Privacy Policy' },
    loadComponent: () => import('./components/placeholder-page/placeholder-page.component').then(m => m.PlaceholderPageComponent)
  },
  {
    path: 'terms',
    data: { title: 'Terms of Service' },
    loadComponent: () => import('./components/placeholder-page/placeholder-page.component').then(m => m.PlaceholderPageComponent)
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];