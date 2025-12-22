// Guard de administrador: solo permite acceso si hay token y el rol es admin (true)
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const tabsAdminGuard: CanActivateFn = () => {
  const auth = inject(AuthService); // Servicio de autenticación
  const router = inject(Router);    // Router para redirecciones

  return auth.ensureRole$().pipe(
    map(role => {
      const ok = !!auth.token && role === true; // Debe tener token y ser admin
      return ok ? true : router.createUrlTree(['/notfound']); // Si no, lo manda a "notfound"
    })
  );
};
