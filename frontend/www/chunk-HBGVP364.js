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

// src/app/services/public.service.ts
var _PublicService = class _PublicService {
  constructor(http) {
    this.http = http;
    this.headers = new HttpHeaders({ "Content-Type": "application/json; charset=utf-8" });
    this.url = `${environment.apiurl}public`;
  }
  // Llamada HTTP: obtener lista de eventos públicos
  consulta_eventos() {
    return this.http.get(`${this.url}/consulta_eventos`, { headers: this.headers }).pipe(catchError((error) => {
      console.error("Error al obtener los eventos:", error);
      return of({ status: false, message: "Hubo un problema al procesar la solicitud." });
    }));
  }
};
_PublicService.\u0275fac = function PublicService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PublicService)(\u0275\u0275inject(HttpClient));
};
_PublicService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PublicService, factory: _PublicService.\u0275fac, providedIn: "root" });
var PublicService = _PublicService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PublicService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  PublicService
};
//# sourceMappingURL=chunk-HBGVP364.js.map
