// Servicio de autenticación: login, verificación/restauración con token y manejo de rol/estado
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
export interface ApiResponse {
  status: boolean;
  message: string;
  value?: any;
  usuario?: any;
  token?: string | string[];  
  rol?: boolean;              
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Config base de API y headers
  private url = `${environment.apiurl}auth`;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

  // Estado reactivo del rol (admin|user|null)
  private rol$ = new BehaviorSubject<boolean | null>(null);

  // Claves de storage
  private tokenKey = 'token';
  private roleKey  = 'is_admin';

  // ---- Helpers de token (get/set en localStorage) ----
  get token(): string | null { return localStorage.getItem(this.tokenKey); }
  set token(v: string | null) {
    if (v) localStorage.setItem(this.tokenKey, v);
    else   localStorage.removeItem(this.tokenKey);
  }

  // Normaliza token a string "xxx.yyy.zzz"
  private normalizeToken(raw: unknown): string | null {
    if (!raw) return null;
    if (typeof raw === 'string') return raw;
    if (Array.isArray(raw) && raw.every(p => typeof p === 'string')) {
      return (raw as string[]).join('.');
    }
    // Intenta recuperar si vino como objeto/JSON
    if (typeof raw === 'object') {
      try {
        const maybe = JSON.parse(JSON.stringify(raw));
        if (Array.isArray(maybe)) return maybe.join('.');
        if (typeof maybe === 'string') return maybe;
      } catch {}
    }
    return null;
  }

  // ---- Helpers de rol (BehaviorSubject + localStorage) ----
  get isAdmin$(): Observable<boolean | null> { return this.rol$.asObservable(); }
  get isAdmin(): boolean | null { return this.rol$.value; }

  private seedRoleFromStorage(): boolean | null {
    const raw = localStorage.getItem(this.roleKey);
    if (raw === null) return null;
    const val = raw.toLowerCase() === 'true';
    this.rol$.next(val);
    return val;
  }

  // Asegura que el rol esté sembrado desde storage cuando sea necesario
  ensureRole$(): Observable<boolean | null> {
    if (this.rol$.value !== null) return of(this.rol$.value);
    const seeded = this.seedRoleFromStorage();
    return of(seeded);
  }

  // ---- Llamadas a la API ----

  // Login: guarda token normalizado y rol en storage/estado
  login(datos: any): Observable<ApiResponse> {
    return this.http
      .post<ApiResponse>(`${this.url}/login`, datos, { headers: this.headers })
      .pipe(
        tap(res => {
          const norm = this.normalizeToken(res?.token);
          if (norm) this.token = norm;

          if (typeof res?.rol === 'boolean') {
            this.rol$.next(res.rol);
            localStorage.setItem(this.roleKey, String(res.rol));
          } else {
            this.rol$.next(null);
            localStorage.removeItem(this.roleKey);
          }
        }),
        catchError(err => {
          console.error('Error al iniciar sesión:', err);
          const backendMessage = err?.error?.message ?? 'Error desconocido';
          return of({ status: false, message: backendMessage } as ApiResponse);
        })
      );
  }

  // Logout: limpia token y rol
  logout(): void {
    this.token = null;
    this.rol$.next(null);
    localStorage.removeItem(this.roleKey);
  }

  // Verifica validez de un token (GET)
  verificarToken(token: string): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>(`${this.url}/verificar?token=${token}`)
      .pipe(
        catchError(error => {
          console.error('Error al verificar el token:', error);
          const backendMessage = error?.error?.message || 'Error desconocido';
          return of({ status: false, message: backendMessage } as ApiResponse);
        })
      );
  }

  // Restaurar contraseña con token (POST)
  recuperando(token: string, datos: any): Observable<ApiResponse> {
    return this.http
      .post<ApiResponse>(`${this.url}/restaurar?token=${token}`, datos, { headers: this.headers })
      .pipe(
        catchError(error => {
          console.error('Error al restaurar:', error);
          const backendMessage = error?.error?.message || 'Error desconocido';
          return of({ status: false, message: backendMessage } as ApiResponse);
        })
      );
  }

  // Inyección de HttpClient
  constructor(private http: HttpClient) {}
}
