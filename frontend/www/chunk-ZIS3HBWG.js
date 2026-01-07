import {
  environment
} from "./chunk-NISRFBUD.js";
import {
  HttpClient,
  HttpHeaders,
  Injectable,
  catchError,
  of,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-STY3AUPG.js";

// src/app/services/admin.service.ts
var _AdminService = class _AdminService {
  constructor(http) {
    this.http = http;
    this.headers = new HttpHeaders({ "Content-Type": "application/json; charset=utf-8" });
    this.url = `${environment.apiurl}admin`;
  }
  // Llamada HTTP para agregar un artista
  agregar_artista(datos) {
    return this.http.post(this.url + "/agregar_artista", datos).pipe(catchError((error) => {
      console.error("Error al registrar artista:", error);
      const backendMessage = error?.error?.message || "Error desconocido";
      return of({ status: false, message: backendMessage });
    }));
  }
  // Llamada HTTP para agregar un lugar
  agregar_lugar(datos) {
    return this.http.post(this.url + "/agregar_lugar", datos).pipe(catchError((error) => {
      console.error("Error al registrar lugar:", error);
      const backendMessage = error?.error?.message || "Error desconocido";
      return of({ status: false, message: backendMessage });
    }));
  }
  // Llamada HTTP para cancelar un evento
  cancelar_evento(datos) {
    return this.http.post(this.url + "/cancelar_eventos", datos).pipe(catchError((error) => {
      console.error("Error al cancelar evento:", error);
      const backendMessage = error?.error?.message || "Error desconocido";
      return of({ status: false, message: backendMessage });
    }));
  }
  // Llamada HTTP para generar un reporte de boletos
  reporte_evento(datos) {
    return this.http.post(this.url + "/reporte_boletos", datos).pipe(catchError((error) => {
      console.error("Error al generar reporte de boletos:", error);
      const backendMessage = error?.error?.message || "Error desconocido";
      return of({ status: false, message: backendMessage });
    }));
  }
  // Llamada HTTP para obtener la lista de artistas
  consultar_artista() {
    return this.http.get(this.url + "/consultar_artista").pipe(catchError((error) => {
      console.error("Error al consultar artista:", error);
      const backendMessage = error?.error?.message || "Error desconocido";
      return of({ status: false, message: backendMessage });
    }));
  }
  // Llamada HTTP para obtener la lista de lugares
  consultar_lugares() {
    return this.http.get(this.url + "/consultar_lugares").pipe(catchError((error) => {
      console.error("Error al consultar lugares:", error);
      const backendMessage = error?.error?.message || "Error desconocido";
      return of({ status: false, message: backendMessage });
    }));
  }
  // Llamada HTTP para registrar un nuevo evento
  agregar_evento(datos) {
    return this.http.post(this.url + "/generar_eventos", datos).pipe(catchError((error) => {
      console.error("Error al registrar evento:", error);
      const backendMessage = error?.error?.message || "Error desconocido";
      return of({ status: false, message: backendMessage });
    }));
  }
};
_AdminService.\u0275fac = function AdminService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AdminService)(\u0275\u0275inject(HttpClient));
};
_AdminService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AdminService, factory: _AdminService.\u0275fac, providedIn: "root" });
var AdminService = _AdminService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  AdminService
};
//# sourceMappingURL=chunk-ZIS3HBWG.js.map
