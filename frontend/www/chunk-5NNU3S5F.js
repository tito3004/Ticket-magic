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

// src/app/services/users.service.ts
var _UsersService = class _UsersService {
  constructor(http) {
    this.http = http;
    this.url = "http://localhost:3000/sistema_reserva/usuario";
    this.jsonHeaders = new HttpHeaders({ "Content-Type": "application/json; charset=utf-8" });
  }
  // Llamada HTTP: registrar usuario
  register(datos) {
    return this.http.post(`${this.url}/registro`, datos, { headers: this.jsonHeaders }).pipe(catchError((error) => {
      console.error("Error al registrar usuario:", error);
      const backendMessage = error?.error?.message || "Error desconocido";
      return of({ status: false, message: backendMessage });
    }));
  }
  // Llamada HTTP: solicitar restauración de cuenta (envío de mail con link)
  recuperar(datos) {
    return this.http.post(`${this.url}/restaurar_cuenta`, datos, { headers: this.jsonHeaders }).pipe(catchError((error) => {
      console.error("Error al restaurar cuenta:", error);
      const backendMessage = error?.error?.message || "Error desconocido";
      return of({ status: false, message: backendMessage });
    }));
  }
  // Llamada HTTP: confirmar pago exitoso (PayPal) y registrar compra
  pagorealizado(cod_unico_boleto, payerid, token) {
    return this.http.get(`${this.url}/consulta_boleto/?cod_unico_boleto=${cod_unico_boleto}&token=${token}&PayerID=${payerid}`, { headers: this.jsonHeaders }).pipe(catchError((error) => {
      console.error("Error al verificar el token:", error);
      const backendMessage = error?.error?.message || "Error desconocido";
      return of({ status: false, message: backendMessage });
    }));
  }
  // Llamada HTTP: cancelar compra tras pago cancelado (eliminar boletos)
  pagocancelado(cod_unico_boleto) {
    return this.http.get(`${this.url}/eliminar_boletos/?cod_unico_boleto=${cod_unico_boleto}`, { headers: this.jsonHeaders }).pipe(catchError((error) => {
      console.error("Error al verificar el token:", error);
      const backendMessage = error?.error?.message || "Error desconocido";
      return of({ status: false, message: backendMessage });
    }));
  }
  // Llamada HTTP: enviar formulario de inconvenientes
  formularioInconvenientes(datos) {
    return this.http.post(`${this.url}/formulario_incovenientes`, datos, { headers: this.jsonHeaders }).pipe(catchError((error) => {
      console.error("Error al enviar formulario:", error);
      const backendMessage = error?.error?.message || "Hubo un problema al procesar la solicitud.";
      return of({ status: false, message: backendMessage });
    }));
  }
  // Llamada HTTP: iniciar proceso de compra (devuelve link de pago y código)
  comprarBoletos(datos) {
    return this.http.post(`${this.url}/compra_boletos`, datos, { headers: this.jsonHeaders }).pipe(catchError((error) => {
      console.error("Error al comprar boletos:", error);
      const backendMessage = error?.error?.message || "Hubo un problema al procesar la solicitud.";
      return of({ status: false, message: backendMessage });
    }));
  }
  // Llamada HTTP: resumen por código único (para QR / admin comprobar)
  getResumenPorCodigo(codUnicoBoleto) {
    return this.http.get(`${this.url}/consulta_boletos_qr/?cod_unico_boleto=${codUnicoBoleto}`).pipe(catchError((err) => {
      const msg = err?.error?.message || "No se pudo consultar el QR";
      return of({ status: false, message: msg });
    }));
  }
  // Llamada HTTP: compras del usuario autenticado (agrupadas por código único)
  getResumenPorUsuario() {
    return this.http.get(`${this.url}/consulta_boletos_por_usuario`, { headers: this.jsonHeaders }).pipe(catchError((err) => {
      const msg = err?.error?.message || "No se pudo consultar las compras del usuario";
      return of({ status: false, message: msg });
    }));
  }
};
_UsersService.\u0275fac = function UsersService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _UsersService)(\u0275\u0275inject(HttpClient));
};
_UsersService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UsersService, factory: _UsersService.\u0275fac, providedIn: "any" });
var UsersService = _UsersService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UsersService, [{
    type: Injectable,
    args: [{ providedIn: "any" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  UsersService
};
//# sourceMappingURL=chunk-5NNU3S5F.js.map
