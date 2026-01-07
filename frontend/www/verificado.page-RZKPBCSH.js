import {
  IonContent,
  IonicModule
} from "./chunk-7Q6J42YH.js";
import "./chunk-J2FZPFF7.js";
import "./chunk-W7NNY2EY.js";
import "./chunk-HETOVSU4.js";
import "./chunk-CIYTNQZO.js";
import "./chunk-Y4AGYHZX.js";
import "./chunk-H2EMZF45.js";
import "./chunk-6722MX6X.js";
import "./chunk-PG7GITTN.js";
import "./chunk-XQK2O555.js";
import "./chunk-QH3EFBOB.js";
import "./chunk-NJ7A7SL3.js";
import "./chunk-I7CJSXCM.js";
import "./chunk-F3JJ4YWB.js";
import "./chunk-QOQL43QQ.js";
import "./chunk-LJZPNKDW.js";
import "./chunk-IVBL4Y7V.js";
import "./chunk-F3V4ZIT6.js";
import {
  AuthService
} from "./chunk-53OPTF36.js";
import "./chunk-NISRFBUD.js";
import {
  ActivatedRoute,
  CommonModule,
  Component,
  HttpClientModule,
  Router,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-STY3AUPG.js";
import "./chunk-WLQLEYHL.js";
import "./chunk-ZMYRL6MC.js";
import "./chunk-W4U5NYAB.js";
import "./chunk-2BQZEK2L.js";
import "./chunk-ELTLXXM6.js";
import "./chunk-CEAAMTO4.js";
import "./chunk-GZ5BDCOT.js";
import "./chunk-HUY7ESWV.js";
import "./chunk-GXFEW35R.js";
import "./chunk-QHQP2P2Z.js";

// src/app/components-user/verificado/verificado.page.ts
var _VerificadoPage = class _VerificadoPage {
  constructor(route, authService, router) {
    this.route = route;
    this.authService = authService;
    this.router = router;
    this.mensaje = "Verificando...";
    this.verificacionExitosa = false;
  }
  // lee el token de la URL y pregunta al backend si es válido
  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get("token");
    if (token) {
      this.authService.verificarToken(token).subscribe((res) => {
        if (res?.message === "Tu cuenta ha sido verificada correctamente") {
          this.verificacionExitosa = true;
        } else {
          this.verificacionExitosa = false;
        }
      }, () => {
        this.verificacionExitosa = false;
      });
    } else {
      this.verificacionExitosa = false;
    }
  }
};
_VerificadoPage.\u0275fac = function VerificadoPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _VerificadoPage)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
};
_VerificadoPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _VerificadoPage, selectors: [["app-verificado"]], decls: 9, vars: 2, consts: [[1, "custom-alert-overlay"], [1, "custom-alert-box"], [1, "custom-alert-message"], [1, "descripcion-alerta"], [1, "custom-alert-button"], ["href", "/login"]], template: function VerificadoPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 0)(1, "div", 1)(2, "h2", 2);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 3);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 4)(7, "a", 5);
    \u0275\u0275text(8, "IR AL LOGIN");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx.verificacionExitosa ? "Cuenta verificada con \xE9xito" : "Error de verificaci\xF3n", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.verificacionExitosa ? "Ahora puedes iniciar sesi\xF3n con tu cuenta." : "Hubo un problema al verificar tu cuenta. Intenta de nuevo o contacta soporte.", " ");
  }
}, dependencies: [CommonModule, IonicModule, IonContent, HttpClientModule], styles: ["\n\n.custom-alert-overlay[_ngcontent-%COMP%] {\n  --background: #0e0e0e;\n  height: 100vh;\n  width: 100vw;\n  display: flex !important;\n  justify-content: center !important;\n  align-items: center !important;\n  padding: 200px;\n  margin: 200px;\n}\n.custom-alert-box[_ngcontent-%COMP%] {\n  background: rgba(30, 30, 30, 0.9);\n  padding: 28px 24px;\n  border-radius: 16px;\n  max-width: 90%;\n  width: 360px;\n  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);\n  text-align: center;\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  animation: _ngcontent-%COMP%_scaleIn 0.3s ease-out;\n  margin: auto;\n  position: relative;\n}\n.custom-alert-message[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n  color: white;\n  margin-bottom: 16px;\n}\n.descripcion-alerta[_ngcontent-%COMP%] {\n  font-size: 15px;\n  color: #ccc;\n  margin-bottom: 24px;\n  line-height: 1.5;\n}\n.custom-alert-button[_ngcontent-%COMP%] {\n  background-color: #7c3aed;\n  color: white;\n  border: none;\n  padding: 12px 20px;\n  border-radius: 12px;\n  font-size: 16px;\n  font-weight: 600;\n  cursor: pointer;\n  width: 100%;\n  transition: background-color 0.2s ease, transform 0.2s ease;\n}\n.custom-alert-button[_ngcontent-%COMP%]:hover {\n  background-color: #5f2ac6;\n  transform: translateY(-1px);\n}\n@keyframes _ngcontent-%COMP%_scaleIn {\n  from {\n    transform: scale(0.85);\n    opacity: 0;\n  }\n  to {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\na[_ngcontent-%COMP%] {\n  text-decoration: none;\n  color: white;\n}\n/*# sourceMappingURL=verificado.page.css.map */"] });
var VerificadoPage = _VerificadoPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VerificadoPage, [{
    type: Component,
    args: [{ selector: "app-verificado", standalone: true, imports: [CommonModule, IonicModule, HttpClientModule], template: `<ion-content class="custom-alert-overlay">
  <div class="custom-alert-box">
    <h2 class="custom-alert-message">
      {{ verificacionExitosa ? 'Cuenta verificada con \xE9xito' : 'Error de verificaci\xF3n' }}
    </h2>

    <p class="descripcion-alerta">
      {{
      verificacionExitosa
      ? 'Ahora puedes iniciar sesi\xF3n con tu cuenta.'
      : 'Hubo un problema al verificar tu cuenta. Intenta de nuevo o contacta soporte.'
      }}
    </p>

    <button class="custom-alert-button">
      <a href="/login">IR AL LOGIN</a>
    </button>
  </div>
</ion-content>`, styles: ["/* src/app/components-user/verificado/verificado.page.css */\n.custom-alert-overlay {\n  --background: #0e0e0e;\n  height: 100vh;\n  width: 100vw;\n  display: flex !important;\n  justify-content: center !important;\n  align-items: center !important;\n  padding: 200px;\n  margin: 200px;\n}\n.custom-alert-box {\n  background: rgba(30, 30, 30, 0.9);\n  padding: 28px 24px;\n  border-radius: 16px;\n  max-width: 90%;\n  width: 360px;\n  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);\n  text-align: center;\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  animation: scaleIn 0.3s ease-out;\n  margin: auto;\n  position: relative;\n}\n.custom-alert-message {\n  font-size: 22px;\n  font-weight: 700;\n  color: white;\n  margin-bottom: 16px;\n}\n.descripcion-alerta {\n  font-size: 15px;\n  color: #ccc;\n  margin-bottom: 24px;\n  line-height: 1.5;\n}\n.custom-alert-button {\n  background-color: #7c3aed;\n  color: white;\n  border: none;\n  padding: 12px 20px;\n  border-radius: 12px;\n  font-size: 16px;\n  font-weight: 600;\n  cursor: pointer;\n  width: 100%;\n  transition: background-color 0.2s ease, transform 0.2s ease;\n}\n.custom-alert-button:hover {\n  background-color: #5f2ac6;\n  transform: translateY(-1px);\n}\n@keyframes scaleIn {\n  from {\n    transform: scale(0.85);\n    opacity: 0;\n  }\n  to {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\na {\n  text-decoration: none;\n  color: white;\n}\n/*# sourceMappingURL=verificado.page.css.map */\n"] }]
  }], () => [{ type: ActivatedRoute }, { type: AuthService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(VerificadoPage, { className: "VerificadoPage", filePath: "src/app/components-user/verificado/verificado.page.ts", lineNumber: 17 });
})();
export {
  VerificadoPage
};
//# sourceMappingURL=verificado.page-RZKPBCSH.js.map
