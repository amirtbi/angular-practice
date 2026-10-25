import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const CanActivate: CanActivateFn = () => {
  const user = inject(AuthService).user();
  return user ? true : inject(Router).createUrlTree(['/authentication']);
};
