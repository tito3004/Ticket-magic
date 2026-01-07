import {
  environment
} from "./chunk-NISRFBUD.js";
import {
  BehaviorSubject,
  HttpClient,
  HttpHeaders,
  Injectable,
  catchError,
  of,
  setClassMetadata,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-STY3AUPG.js";

// src/app/services/auth.service.ts
var _AuthService = class _AuthService {
  // ---- Helpers de token (get/set en localStorage) ----
  get token() {
    return localStorage.getItem(this.tokenKey);
  }
  set token(v) {
    if (v)
      localStorage.setItem(this.tokenKey, v);
    else
      localStorage.removeItem(this.tokenKey);
  }
  // Normaliza token a string "xxx.yyy.zzz"
  normalizeToken(raw) {
    if (!raw)
      return null;
    if (typeof raw === "string")
      return raw;
    if (Array.isArray(raw) && raw.every((p) => typeof p === "string")) {
      return raw.join(".");
    }
    if (typeof raw === "object") {
      try {
        const maybe = JSON.parse(JSON.stringify(raw));
        if (Array.isArray(maybe))
          return maybe.join(".");
        if (typeof maybe === "string")
          return maybe;
      } catch {
      }
    }
    return null;
  }
  // ---- Helpers de rol (BehaviorSubject + localStorage) ----
  get isAdmin$() {
    return this.rol$.asObservable();
  }
  get isAdmin() {
    return this.rol$.value;
  }
  seedRoleFromStorage() {
    const raw = localStorage.getItem(this.roleKey);
    if (raw === null)
      return null;
    const val = raw.toLowerCase() === "true";
    this.rol$.next(val);
    return val;
  }
  // Asegura que el rol esté sembrado desde storage cuando sea necesario
  ensureRole$() {
    if (this.rol$.value !== null)
      return of(this.rol$.value);
    const seeded = this.seedRoleFromStorage();
    return of(seeded);
  }
  // ---- Llamadas a la API ----
  // Login: guarda token normalizado y rol en storage/estado
  login(datos) {
    return this.http.post(`${this.url}/login`, datos, { headers: this.headers }).pipe(tap((res) => {
      const norm = this.normalizeToken(res?.token);
      if (norm)
        this.token = norm;
      if (typeof res?.rol === "boolean") {
        this.rol$.next(res.rol);
        localStorage.setItem(this.roleKey, String(res.rol));
      } else {
        this.rol$.next(null);
        localStorage.removeItem(this.roleKey);
      }
    }), catchError((err) => {
      console.error("Error al iniciar sesi\xF3n:", err);
      const backendMessage = err?.error?.message ?? "Error desconocido";
      return of({ status: false, message: backendMessage });
    }));
  }
  // Logout: limpia token y rol
  logout() {
    this.token = null;
    this.rol$.next(null);
    localStorage.removeItem(this.roleKey);
  }
  // Verifica validez de un token (GET)
  verificarToken(token) {
    return this.http.get(`${this.url}/verificar?token=${token}`).pipe(catchError((error) => {
      console.error("Error al verificar el token:", error);
      const backendMessage = error?.error?.message || "Error desconocido";
      return of({ status: false, message: backendMessage });
    }));
  }
  // Restaurar contraseña con token (POST)
  recuperando(token, datos) {
    return this.http.post(`${this.url}/restaurar?token=${token}`, datos, { headers: this.headers }).pipe(catchError((error) => {
      console.error("Error al restaurar:", error);
      const backendMessage = error?.error?.message || "Error desconocido";
      return of({ status: false, message: backendMessage });
    }));
  }
  // Inyección de HttpClient
  constructor(http) {
    this.http = http;
    this.url = `${environment.apiurl}auth`;
    this.headers = new HttpHeaders({ "Content-Type": "application/json; charset=utf-8" });
    this.rol$ = new BehaviorSubject(null);
    this.tokenKey = "token";
    this.roleKey = "is_admin";
  }
};
_AuthService.\u0275fac = function AuthService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AuthService)(\u0275\u0275inject(HttpClient));
};
_AuthService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
var AuthService = _AuthService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  AuthService
};
//# sourceMappingURL=chunk-53OPTF36.js.map
