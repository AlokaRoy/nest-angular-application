import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';


export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getToken()) {
    return of(true);
  } else if (authService.checkIfSignedUp()) {
    router.navigate(['/authorization']);
    return of(false);
  } else {
    router.navigate(['/']);
    return of(false);
  }
};