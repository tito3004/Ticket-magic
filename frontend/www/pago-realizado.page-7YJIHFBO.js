import {
  UsersService
} from "./chunk-5NNU3S5F.js";
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
  ActivatedRoute,
  CommonModule,
  Component,
  Router,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵtext
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

// src/app/components-user/pago-realizado/pago-realizado.page.ts
var _PagoRealizadoPage = class _PagoRealizadoPage {
  constructor(router, route, UsersService2) {
    this.router = router;
    this.route = route;
    this.UsersService = UsersService2;
  }
  // lee valores de la URL y avisa al backend que el pago fue exitoso
  ngOnInit() {
    const cod_unico_boleto = this.route.snapshot.queryParamMap.get("token");
    const token = this.route.snapshot.queryParamMap.get("token");
    const PayerID = this.route.snapshot.queryParamMap.get("PayerID");
    if (token && cod_unico_boleto && PayerID) {
      this.UsersService.pagorealizado(cod_unico_boleto, PayerID, token).subscribe((resp) => {
      }, (err) => {
      });
    } else {
    }
  }
  // vuelve al historial del usuario
  volverAlInicio() {
    this.router.navigate(["/tabs-user/historial"]);
  }
};
_PagoRealizadoPage.\u0275fac = function PagoRealizadoPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PagoRealizadoPage)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(UsersService));
};
_PagoRealizadoPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PagoRealizadoPage, selectors: [["app-pago-realizado"]], decls: 7, vars: 0, consts: [["fullscreen", "", 1, "pago-container"], [1, "pago-wrapper"], ["src", "assets/images/check.webp", "alt", "Check Icon", 1, "check-icon"], [1, "pago-text"], [1, "boton-volver", 3, "click"]], template: function PagoRealizadoPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 0)(1, "div", 1);
    \u0275\u0275element(2, "img", 2);
    \u0275\u0275elementStart(3, "h1", 3);
    \u0275\u0275text(4, "Pago realizado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 4);
    \u0275\u0275listener("click", function PagoRealizadoPage_Template_button_click_5_listener() {
      return ctx.volverAlInicio();
    });
    \u0275\u0275text(6, "Mira tus tickets");
    \u0275\u0275elementEnd()()();
  }
}, dependencies: [CommonModule, IonicModule, IonContent], styles: ["\n\n.pago-realizado[_ngcontent-%COMP%] {\n  --background: none;\n  background: url(/assets/images/fondo.png) no-repeat center center/cover;\n}\n.pago-wrapper[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  text-align: center;\n  color: white;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n.check-icon[_ngcontent-%COMP%] {\n  width: 100px;\n  height: 100px;\n  margin-bottom: 20px;\n}\n.pago-text[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  margin-bottom: 20px;\n  font-weight: bold;\n  color: white;\n}\n.boton-volver[_ngcontent-%COMP%] {\n  background-color: #7C3AED;\n  color: white;\n  padding: 12px 28px;\n  border-radius: 15px;\n  border: none;\n  font-size: 1rem;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n}\n.boton-volver[_ngcontent-%COMP%]:hover {\n  background-color: #6a25dc;\n}\n@media (max-width: 768px) {\n  .check-icon[_ngcontent-%COMP%] {\n    width: 70px;\n    height: 70px;\n  }\n  .pago-text[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .boton-volver[_ngcontent-%COMP%] {\n    padding: 10px 20px;\n    font-size: 0.95rem;\n  }\n}\n@media (max-width: 480px) {\n  .check-icon[_ngcontent-%COMP%] {\n    width: 60px;\n    height: 60px;\n  }\n  .pago-text[_ngcontent-%COMP%] {\n    font-size: 1.3rem;\n  }\n  .boton-volver[_ngcontent-%COMP%] {\n    padding: 8px 16px;\n    font-size: 0.9rem;\n  }\n}\n/*# sourceMappingURL=pago-realizado.page.css.map */"] });
var PagoRealizadoPage = _PagoRealizadoPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PagoRealizadoPage, [{
    type: Component,
    args: [{ selector: "app-pago-realizado", standalone: true, imports: [CommonModule, IonicModule], template: '<ion-content class="pago-container" fullscreen>\n  <div class="pago-wrapper">\n    <img src="assets/images/check.webp" alt="Check Icon" class="check-icon">\n    <h1 class="pago-text">Pago realizado</h1>\n    <button class="boton-volver" (click)="volverAlInicio()">Mira tus tickets</button>\n  </div>\n</ion-content>\n\n', styles: ["/* src/app/components-user/pago-realizado/pago-realizado.page.css */\n.pago-realizado {\n  --background: none;\n  background: url(/assets/images/fondo.png) no-repeat center center/cover;\n}\n.pago-wrapper {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  text-align: center;\n  color: white;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n.check-icon {\n  width: 100px;\n  height: 100px;\n  margin-bottom: 20px;\n}\n.pago-text {\n  font-size: 2rem;\n  margin-bottom: 20px;\n  font-weight: bold;\n  color: white;\n}\n.boton-volver {\n  background-color: #7C3AED;\n  color: white;\n  padding: 12px 28px;\n  border-radius: 15px;\n  border: none;\n  font-size: 1rem;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n}\n.boton-volver:hover {\n  background-color: #6a25dc;\n}\n@media (max-width: 768px) {\n  .check-icon {\n    width: 70px;\n    height: 70px;\n  }\n  .pago-text {\n    font-size: 1.5rem;\n  }\n  .boton-volver {\n    padding: 10px 20px;\n    font-size: 0.95rem;\n  }\n}\n@media (max-width: 480px) {\n  .check-icon {\n    width: 60px;\n    height: 60px;\n  }\n  .pago-text {\n    font-size: 1.3rem;\n  }\n  .boton-volver {\n    padding: 8px 16px;\n    font-size: 0.9rem;\n  }\n}\n/*# sourceMappingURL=pago-realizado.page.css.map */\n"] }]
  }], () => [{ type: Router }, { type: ActivatedRoute }, { type: UsersService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PagoRealizadoPage, { className: "PagoRealizadoPage", filePath: "src/app/components-user/pago-realizado/pago-realizado.page.ts", lineNumber: 16 });
})();
export {
  PagoRealizadoPage
};
//# sourceMappingURL=pago-realizado.page-7YJIHFBO.js.map
