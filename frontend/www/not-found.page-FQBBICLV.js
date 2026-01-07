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
  CommonModule,
  Component,
  Router,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
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

// src/app/components-pub/not-found/not-found.page.ts
var _NotFoundPage = class _NotFoundPage {
  constructor(router) {
    this.router = router;
  }
  // Ir al inicio
  goHome() {
    this.router.navigateByUrl("/tabs-user");
  }
};
_NotFoundPage.\u0275fac = function NotFoundPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NotFoundPage)(\u0275\u0275directiveInject(Router));
};
_NotFoundPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotFoundPage, selectors: [["app-not-found"]], decls: 13, vars: 0, consts: [[1, "nf-page"], [1, "nf-wrapper"], [1, "nf-card"], [1, "brand"], [1, "nf-code"], [1, "nf-title"], [1, "nf-msg"], [1, "nf-btn", 3, "click"]], template: function NotFoundPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 0)(1, "div", 1)(2, "div", 2)(3, "h1", 3);
    \u0275\u0275text(4, "TICKETMAGIC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 4);
    \u0275\u0275text(6, "404");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "h2", 5);
    \u0275\u0275text(8, "P\xE1gina no encontrada");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 6);
    \u0275\u0275text(10, " La ruta que intentas abrir no existe o fue movida. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 7);
    \u0275\u0275listener("click", function NotFoundPage_Template_button_click_11_listener() {
      return ctx.goHome();
    });
    \u0275\u0275text(12, "Volver al inicio");
    \u0275\u0275elementEnd()()()();
  }
}, dependencies: [IonicModule, IonContent, CommonModule], styles: ["\n\n[_nghost-%COMP%] {\n  --tm-purple: #7C3AED;\n  --tm-bg-top: #0f0f13;\n  --tm-bg-bottom: #111827;\n  --tm-card: #0b0b0f;\n  --tm-text: #e5e7eb;\n  --tm-text-dim: #9ca3af;\n}\n.nf-page[_ngcontent-%COMP%] {\n  --background: transparent;\n  background:\n    linear-gradient(\n      180deg,\n      var(--tm-bg-top) 0%,\n      var(--tm-bg-bottom) 100%);\n}\n.nf-wrapper[_ngcontent-%COMP%] {\n  min-height: 100dvh;\n  display: grid;\n  place-items: center;\n  padding: 24px;\n}\n.nf-card[_ngcontent-%COMP%] {\n  width: min(520px, 92vw);\n  background: var(--tm-card);\n  border-radius: 22px;\n  padding: 32px 28px 28px;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);\n  text-align: center;\n  color: var(--tm-text);\n}\n.brand[_ngcontent-%COMP%] {\n  margin: 0 0 10px 0;\n  font-size: 24px;\n  letter-spacing: 1px;\n  font-weight: 800;\n}\n.nf-code[_ngcontent-%COMP%] {\n  font-size: clamp(56px, 11vw, 96px);\n  font-weight: 900;\n  letter-spacing: 4px;\n  color: #ffffff;\n  text-shadow: 0 8px 30px rgba(124, 58, 237, 0.35);\n  margin: 4px 0 8px 0;\n}\n.nf-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 20px;\n  font-weight: 700;\n}\n.nf-msg[_ngcontent-%COMP%] {\n  color: var(--tm-text-dim);\n  margin: 8px 0 22px 0;\n  line-height: 1.5;\n}\n.nf-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 0;\n  border-radius: 10px;\n  padding: 14px 16px;\n  font-weight: 800;\n  letter-spacing: 0.5px;\n  background: var(--tm-purple);\n  color: #fff;\n  cursor: pointer;\n  transition: filter 0.15s ease, transform 0.05s ease;\n}\n.nf-btn[_ngcontent-%COMP%]:hover {\n  filter: brightness(1.05);\n}\n.nf-btn[_ngcontent-%COMP%]:active {\n  transform: translateY(1px);\n}\n.nf-links[_ngcontent-%COMP%] {\n  margin-top: 14px;\n  font-size: 14px;\n  color: var(--tm-text-dim);\n}\n.nf-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #b197fc;\n  cursor: pointer;\n  text-decoration: none;\n}\n.nf-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n/*# sourceMappingURL=not-found.page.css.map */"] });
var NotFoundPage = _NotFoundPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotFoundPage, [{
    type: Component,
    args: [{ selector: "app-not-found", standalone: true, imports: [IonicModule, CommonModule], template: '<ion-content class="nf-page">\n  <div class="nf-wrapper">\n    <div class="nf-card">\n      <h1 class="brand">TICKETMAGIC</h1>\n\n      <div class="nf-code">404</div>\n      <h2 class="nf-title">P\xE1gina no encontrada</h2>\n      <p class="nf-msg">\n        La ruta que intentas abrir no existe o fue movida.\n      </p>\n\n      <button class="nf-btn" (click)="goHome()">Volver al inicio</button>\n      \n    </div>\n  </div>\n</ion-content>\n', styles: ["/* src/app/components-pub/not-found/not-found.page.scss */\n:host {\n  --tm-purple: #7C3AED;\n  --tm-bg-top: #0f0f13;\n  --tm-bg-bottom: #111827;\n  --tm-card: #0b0b0f;\n  --tm-text: #e5e7eb;\n  --tm-text-dim: #9ca3af;\n}\n.nf-page {\n  --background: transparent;\n  background:\n    linear-gradient(\n      180deg,\n      var(--tm-bg-top) 0%,\n      var(--tm-bg-bottom) 100%);\n}\n.nf-wrapper {\n  min-height: 100dvh;\n  display: grid;\n  place-items: center;\n  padding: 24px;\n}\n.nf-card {\n  width: min(520px, 92vw);\n  background: var(--tm-card);\n  border-radius: 22px;\n  padding: 32px 28px 28px;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);\n  text-align: center;\n  color: var(--tm-text);\n}\n.brand {\n  margin: 0 0 10px 0;\n  font-size: 24px;\n  letter-spacing: 1px;\n  font-weight: 800;\n}\n.nf-code {\n  font-size: clamp(56px, 11vw, 96px);\n  font-weight: 900;\n  letter-spacing: 4px;\n  color: #ffffff;\n  text-shadow: 0 8px 30px rgba(124, 58, 237, 0.35);\n  margin: 4px 0 8px 0;\n}\n.nf-title {\n  margin: 0;\n  font-size: 20px;\n  font-weight: 700;\n}\n.nf-msg {\n  color: var(--tm-text-dim);\n  margin: 8px 0 22px 0;\n  line-height: 1.5;\n}\n.nf-btn {\n  width: 100%;\n  border: 0;\n  border-radius: 10px;\n  padding: 14px 16px;\n  font-weight: 800;\n  letter-spacing: 0.5px;\n  background: var(--tm-purple);\n  color: #fff;\n  cursor: pointer;\n  transition: filter 0.15s ease, transform 0.05s ease;\n}\n.nf-btn:hover {\n  filter: brightness(1.05);\n}\n.nf-btn:active {\n  transform: translateY(1px);\n}\n.nf-links {\n  margin-top: 14px;\n  font-size: 14px;\n  color: var(--tm-text-dim);\n}\n.nf-links a {\n  color: #b197fc;\n  cursor: pointer;\n  text-decoration: none;\n}\n.nf-links a:hover {\n  text-decoration: underline;\n}\n/*# sourceMappingURL=not-found.page.css.map */\n"] }]
  }], () => [{ type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotFoundPage, { className: "NotFoundPage", filePath: "src/app/components-pub/not-found/not-found.page.ts", lineNumber: 14 });
})();
export {
  NotFoundPage
};
//# sourceMappingURL=not-found.page-FQBBICLV.js.map
