import { Routes } from '@angular/router';
import { CanActivate } from '../core/utils/can-activate';

export const routes: Routes = [
  {
    path: '',
    canActivate: [CanActivate],
    loadComponent: () => {
      return import('./Pages/home/home.component').then((m) => m.AppHome);
    },
  },
  {
    path: 'authentication',
    loadComponent: () => {
      return import('./Pages/authentication/authentication.component').then(
        (m) => m.AppAuthentication,
      );
    },
  },
];
