// Guard de usuario: permite acceder a /tabs-user si hay token y el rol está definido (admin o user)
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const tabsUserGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Verifica rol desde memoria/localStorage y que exista token
  return auth.ensureRole$().pipe(
    map(role => {
      const hasToken = !!auth.token;                 
      const ok = hasToken && (role === true || role === false); 
      return ok ? true : router.createUrlTree(['/login']);      
    })
  );
};
