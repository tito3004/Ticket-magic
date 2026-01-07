import {
  IonButton,
  IonContent,
  IonicModule,
  RouterLinkDelegateDirective
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
  RouterLink,
  RouterModule,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
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

// src/app/components-pub/start/start.page.ts
var _StartPage = class _StartPage {
};
_StartPage.\u0275fac = function StartPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _StartPage)();
};
_StartPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StartPage, selectors: [["app-start"]], decls: 11, vars: 0, consts: [[1, "start-content"], [1, "poster-container"], ["src", "assets/images/kinos.jpg", "alt", "Evento 1"], ["src", "assets/images/la_velada.jpg", "alt", "Evento 2"], ["src", "assets/images/ufc.jpg", "alt", "Evento 3"], [1, "button-wrapper"], [1, "button-group"], ["expand", "block", "routerLink", "/login", 1, "start-button"], ["expand", "block", "routerLink", "/register", 1, "start-button", "outline"]], template: function StartPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 0)(1, "div", 1);
    \u0275\u0275element(2, "img", 2)(3, "img", 3)(4, "img", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 5)(6, "div", 6)(7, "ion-button", 7);
    \u0275\u0275text(8, "Iniciar sesi\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "ion-button", 8);
    \u0275\u0275text(10, "Registrarse");
    \u0275\u0275elementEnd()()()();
  }
}, dependencies: [IonicModule, IonButton, IonContent, RouterLinkDelegateDirective, CommonModule, RouterModule, RouterLink], styles: ["\n\n.start-page[_ngcontent-%COMP%] {\n  --background:\n    linear-gradient(\n      to bottom,\n      #0f0f0f,\n      #141629,\n      #1c1f35);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.start-wrapper[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 400px;\n  margin: auto;\n  text-align: center;\n  padding: 2rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  justify-content: center;\n  align-items: center;\n}\n.start-content[_ngcontent-%COMP%] {\n  --background:\n    linear-gradient(\n      to bottom,\n      #0f0f0f,\n      #1c1c2e);\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0;\n  text-align: center;\n}\n.poster-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  gap: 20px;\n  padding-top: 40px;\n  flex-wrap: wrap;\n}\n.poster-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 450px;\n  height: auto;\n  object-fit: cover;\n  border-radius: 12px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);\n}\n.button-wrapper[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  margin-top: 50px;\n  margin-bottom: 60px;\n}\n.button-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  gap: 15px;\n}\n.start-button[_ngcontent-%COMP%] {\n  width: 150px;\n  height: 48px;\n  font-weight: bold;\n  font-size: 14px;\n  border-radius: 8px;\n  --background: #7C3AED;\n  --color: white;\n}\n.start-button.outline[_ngcontent-%COMP%] {\n  --background: transparent;\n  --border-color: #7C3AED;\n  --color: #7C3AED;\n  border: 2px solid #7C3AED;\n}\n.brand[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 800;\n  color: white;\n  letter-spacing: 1px;\n}\n.slogan[_ngcontent-%COMP%] {\n  color: #ccc;\n  font-size: 0.95rem;\n  margin-bottom: 2rem;\n}\n.start-button[_ngcontent-%COMP%] {\n  --border-radius: 12px;\n  font-weight: bold;\n  letter-spacing: 1px;\n}\n.start-button.login[_ngcontent-%COMP%] {\n  --background: #7C3AED;\n  --color: white;\n}\n.start-button.register[_ngcontent-%COMP%] {\n  --background: transparent;\n  border: 1px solid #7C3AED;\n  color: #7C3AED;\n}\n@media (max-width: 768px) {\n  .compra-card[_ngcontent-%COMP%], \n   .register-box[_ngcontent-%COMP%], \n   .login-box[_ngcontent-%COMP%], \n   .start-container[_ngcontent-%COMP%], \n   .eventos-section[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {\n    width: 95% !important;\n    margin: auto;\n    font-size: 14px;\n  }\n  .eventos-section[_ngcontent-%COMP%]   .fila-eventos[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: center;\n  }\n  .eventos-section[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    width: 100% !important;\n    height: auto;\n  }\n  ion-input[_ngcontent-%COMP%], \n   ion-button[_ngcontent-%COMP%], \n   .fecha-btn[_ngcontent-%COMP%], \n   .boton-finalizar[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  h1[_ngcontent-%COMP%], \n   h2[_ngcontent-%COMP%], \n   h3[_ngcontent-%COMP%] {\n    font-size: 18px !important;\n  }\n  .btn-ticket[_ngcontent-%COMP%] {\n    width: 90%;\n    margin: 8px auto;\n    padding: 10px;\n    font-size: 14px;\n  }\n}\n/*# sourceMappingURL=start.page.css.map */"] });
var StartPage = _StartPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StartPage, [{
    type: Component,
    args: [{ selector: "app-start", standalone: true, imports: [IonicModule, CommonModule, RouterModule], template: '<ion-content class="start-content">\n  <div class="poster-container">\n    <img src="assets/images/kinos.jpg" alt="Evento 1">\n    <img src="assets/images/la_velada.jpg" alt="Evento 2">\n    <img src="assets/images/ufc.jpg" alt="Evento 3">\n  </div>\n\n  <div class="button-wrapper">\n    <div class="button-group">\n      <ion-button expand="block" routerLink="/login" class="start-button">Iniciar sesi\xF3n</ion-button>\n      <ion-button expand="block" routerLink="/register" class="start-button outline">Registrarse</ion-button>\n    </div>\n  </div>\n</ion-content>\n\n\n', styles: ["/* src/app/components-pub/start/start.page.css */\n.start-page {\n  --background:\n    linear-gradient(\n      to bottom,\n      #0f0f0f,\n      #141629,\n      #1c1f35);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.start-wrapper {\n  width: 100%;\n  max-width: 400px;\n  margin: auto;\n  text-align: center;\n  padding: 2rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  justify-content: center;\n  align-items: center;\n}\n.start-content {\n  --background:\n    linear-gradient(\n      to bottom,\n      #0f0f0f,\n      #1c1c2e);\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0;\n  text-align: center;\n}\n.poster-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  gap: 20px;\n  padding-top: 40px;\n  flex-wrap: wrap;\n}\n.poster-container img {\n  width: 450px;\n  height: auto;\n  object-fit: cover;\n  border-radius: 12px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);\n}\n.button-wrapper {\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  margin-top: 50px;\n  margin-bottom: 60px;\n}\n.button-group {\n  display: flex;\n  flex-direction: row;\n  gap: 15px;\n}\n.start-button {\n  width: 150px;\n  height: 48px;\n  font-weight: bold;\n  font-size: 14px;\n  border-radius: 8px;\n  --background: #7C3AED;\n  --color: white;\n}\n.start-button.outline {\n  --background: transparent;\n  --border-color: #7C3AED;\n  --color: #7C3AED;\n  border: 2px solid #7C3AED;\n}\n.brand {\n  font-size: 2rem;\n  font-weight: 800;\n  color: white;\n  letter-spacing: 1px;\n}\n.slogan {\n  color: #ccc;\n  font-size: 0.95rem;\n  margin-bottom: 2rem;\n}\n.start-button {\n  --border-radius: 12px;\n  font-weight: bold;\n  letter-spacing: 1px;\n}\n.start-button.login {\n  --background: #7C3AED;\n  --color: white;\n}\n.start-button.register {\n  --background: transparent;\n  border: 1px solid #7C3AED;\n  color: #7C3AED;\n}\n@media (max-width: 768px) {\n  .compra-card,\n  .register-box,\n  .login-box,\n  .start-container,\n  .eventos-section .card {\n    width: 95% !important;\n    margin: auto;\n    font-size: 14px;\n  }\n  .eventos-section .fila-eventos {\n    flex-direction: column;\n    align-items: center;\n  }\n  .eventos-section .card img {\n    width: 100% !important;\n    height: auto;\n  }\n  ion-input,\n  ion-button,\n  .fecha-btn,\n  .boton-finalizar {\n    font-size: 14px;\n  }\n  h1,\n  h2,\n  h3 {\n    font-size: 18px !important;\n  }\n  .btn-ticket {\n    width: 90%;\n    margin: 8px auto;\n    padding: 10px;\n    font-size: 14px;\n  }\n}\n/*# sourceMappingURL=start.page.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StartPage, { className: "StartPage", filePath: "src/app/components-pub/start/start.page.ts", lineNumber: 13 });
})();
export {
  StartPage
};
//# sourceMappingURL=start.page-ZVZIGFQZ.js.map
