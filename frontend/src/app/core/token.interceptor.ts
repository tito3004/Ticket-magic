// Interceptor para poner el token en todas las peticiones
import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem('token'); // saco el token guardado

  try {
    // si por error se guardó como JSON, lo paso a string
    const parsed = JSON.parse(token as string);
    if (Array.isArray(parsed)) token = parsed.join('.');
    else if (typeof parsed === 'string') token = parsed;
  } catch {
    // si no es JSON, no pasa nada
  }

  // si tengo token, lo agrego al header Authorization
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(req); // sigo con la petición
};
