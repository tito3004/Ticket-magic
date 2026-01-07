import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
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
  AsyncPipe,
  CommonModule,
  Component,
  NgIf,
  Router,
  RouterModule,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
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
import {
  __async
} from "./chunk-QHQP2P2Z.js";

// src/app/components-user/tabs-user/tabs-user.page.ts
function TabsUserPage_ion_fab_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ion-fab", 16)(1, "ion-fab-button", 17);
    \u0275\u0275listener("click", function TabsUserPage_ion_fab_8_Template_ion_fab_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.abrirOpcionesAdmin());
    });
    \u0275\u0275element(2, "ion-icon", 18);
    \u0275\u0275elementEnd()();
  }
}
var _TabsUserPage = class _TabsUserPage {
  constructor(router, auth) {
    this.router = router;
    this.auth = auth;
    this.isAdmin$ = this.auth.isAdmin$;
  }
  // Cierra sesión y regresa a la pantalla de inicio
  cerrarSesion() {
    return __async(this, null, function* () {
      localStorage.removeItem("token");
      localStorage.removeItem("is_admin");
      localStorage.removeItem("usuario");
      this.auth.logout();
      this.router.navigateByUrl("/start");
    });
  }
  // Va a la vista de administrador
  abrirOpcionesAdmin() {
    this.router.navigate(["/tabs-admin"]);
  }
};
_TabsUserPage.\u0275fac = function TabsUserPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TabsUserPage)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(AuthService));
};
_TabsUserPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TabsUserPage, selectors: [["app-tabs-user"]], decls: 31, vars: 3, consts: [[1, "btn-logout", 3, "click"], ["name", "log-out-outline"], ["vertical", "top", "horizontal", "end", "slot", "fixed", 1, "logout-fab"], ["color", "danger", 3, "click"], ["vertical", "top", "horizontal", "start", "slot", "fixed", "class", "admin-fab", 4, "ngIf"], ["slot", "bottom", 1, "tm-tabbar"], ["tab", "explorar", "href", "/tabs-user/explorar"], ["name", "search-outline"], ["tab", "compra", "href", "/tabs-user/compra"], ["name", "cart-outline"], ["tab", "historial", "href", "/tabs-user/historial"], ["name", "ticket-outline"], ["tab", "calendario", "href", "/tabs-user/calendario"], ["name", "calendar-outline"], ["tab", "quejas", "href", "/tabs-user/quejas"], ["name", "chatbubble-ellipses-outline"], ["vertical", "top", "horizontal", "start", "slot", "fixed", 1, "admin-fab"], ["color", "success", 3, "click"], ["name", "settings-outline"]], template: function TabsUserPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ion-router-outlet");
    \u0275\u0275elementStart(1, "ion-tabs")(2, "button", 0);
    \u0275\u0275listener("click", function TabsUserPage_Template_button_click_2_listener() {
      return ctx.cerrarSesion();
    });
    \u0275\u0275text(3, " Cerrar sesi\xF3n");
    \u0275\u0275element(4, "ion-icon", 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "ion-fab", 2)(6, "ion-fab-button", 3);
    \u0275\u0275listener("click", function TabsUserPage_Template_ion_fab_button_click_6_listener() {
      return ctx.cerrarSesion();
    });
    \u0275\u0275element(7, "ion-icon", 1);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, TabsUserPage_ion_fab_8_Template, 3, 0, "ion-fab", 4);
    \u0275\u0275pipe(9, "async");
    \u0275\u0275elementStart(10, "ion-tab-bar", 5)(11, "ion-tab-button", 6);
    \u0275\u0275element(12, "ion-icon", 7);
    \u0275\u0275elementStart(13, "ion-label");
    \u0275\u0275text(14, "Explorar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "ion-tab-button", 8);
    \u0275\u0275element(16, "ion-icon", 9);
    \u0275\u0275elementStart(17, "ion-label");
    \u0275\u0275text(18, "Comprar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "ion-tab-button", 10);
    \u0275\u0275element(20, "ion-icon", 11);
    \u0275\u0275elementStart(21, "ion-label");
    \u0275\u0275text(22, "Mis tickets");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "ion-tab-button", 12);
    \u0275\u0275element(24, "ion-icon", 13);
    \u0275\u0275elementStart(25, "ion-label");
    \u0275\u0275text(26, "Calendario");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "ion-tab-button", 14);
    \u0275\u0275element(28, "ion-icon", 15);
    \u0275\u0275elementStart(29, "ion-label");
    \u0275\u0275text(30, "Quejas");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", \u0275\u0275pipeBind1(9, 1, ctx.isAdmin$) === true);
  }
}, dependencies: [IonicModule, IonFab, IonFabButton, IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs, IonRouterOutlet, RouterModule, CommonModule, NgIf, AsyncPipe], styles: ['\n\n.btn-logout[_ngcontent-%COMP%] {\n  position: fixed;\n  top: calc(env(safe-area-inset-top) + 10px);\n  right: calc(env(safe-area-inset-right) + 10px);\n  z-index: 1000;\n  background: #dc2626;\n  color: #fff;\n  border: none;\n  border-radius: 25px;\n  padding: 0 14px;\n  height: 45px;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);\n  font-weight: 700;\n  letter-spacing: 0.3px;\n  white-space: nowrap;\n}\n.logout-fab[_ngcontent-%COMP%] {\n  margin-top: calc(env(safe-area-inset-top) + 8px);\n  margin-right: calc(env(safe-area-inset-right) + 8px);\n  z-index: 1000;\n}\n.admin-fab[_ngcontent-%COMP%] {\n  --color:white;\n  margin-top: calc(env(safe-area-inset-top) + 8px);\n  margin-right: calc(env(safe-area-inset-right) + 8px);\n  z-index: 1000;\n}\n@media (min-width: 768px) {\n  .logout-fab[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media (max-width: 768px) {\n  .btn-logout[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media (max-width: 480px) {\n  .btn-logout[_ngcontent-%COMP%] {\n    height: 40px;\n    padding: 0 10px;\n    border-radius: 20px;\n    font-size: 0.9rem;\n  }\n  .btn-logout[_ngcontent-%COMP%]::before {\n    content: " ";\n  }\n  .btn-logout[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 1.2rem;\n  }\n  .btn-logout[_ngcontent-%COMP%] {\n    gap: 0;\n  }\n}\n/*# sourceMappingURL=tabs-user.page.css.map */'] });
var TabsUserPage = _TabsUserPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabsUserPage, [{
    type: Component,
    args: [{ selector: "app-tabs-user", standalone: true, imports: [IonicModule, RouterModule, CommonModule], template: '<ion-router-outlet></ion-router-outlet><ion-tabs>\n  <button class="btn-logout" (click)="cerrarSesion()">\n    Cerrar sesi\xF3n<ion-icon name="log-out-outline"></ion-icon>\n  </button>\n  <ion-fab vertical="top" horizontal="end" slot="fixed" class="logout-fab">\n    <ion-fab-button color="danger" (click)="cerrarSesion()">\n      <ion-icon name="log-out-outline"></ion-icon>\n    </ion-fab-button>\n    </ion-fab>\n    <ion-fab vertical="top" horizontal="start" slot="fixed" class="admin-fab"\n           *ngIf="(isAdmin$ | async) === true">\n    <ion-fab-button color="success" (click)="abrirOpcionesAdmin()">\n      <ion-icon name="settings-outline"></ion-icon>\n    </ion-fab-button>\n  </ion-fab>\n  \n  <ion-tab-bar slot="bottom" class="tm-tabbar">\n    <ion-tab-button tab="explorar" href="/tabs-user/explorar">\n      <ion-icon name="search-outline"></ion-icon>\n      <ion-label>Explorar</ion-label>\n    </ion-tab-button>\n    <ion-tab-button tab="compra" href="/tabs-user/compra">\n      <ion-icon name="cart-outline"></ion-icon>\n      <ion-label>Comprar</ion-label>\n    </ion-tab-button>\n    <ion-tab-button tab="historial" href="/tabs-user/historial">\n      <ion-icon name="ticket-outline"></ion-icon>\n      <ion-label>Mis tickets</ion-label>\n    </ion-tab-button>\n    <ion-tab-button tab="calendario" href="/tabs-user/calendario">\n      <ion-icon name="calendar-outline"></ion-icon>\n      <ion-label>Calendario</ion-label>\n    </ion-tab-button>\n    <ion-tab-button tab="quejas" href="/tabs-user/quejas">\n      <ion-icon name="chatbubble-ellipses-outline"></ion-icon>\n      <ion-label>Quejas</ion-label>\n    </ion-tab-button>    \n  </ion-tab-bar>\n</ion-tabs>\n', styles: ['/* src/app/components-user/tabs-user/tabs-user.page.scss */\n.btn-logout {\n  position: fixed;\n  top: calc(env(safe-area-inset-top) + 10px);\n  right: calc(env(safe-area-inset-right) + 10px);\n  z-index: 1000;\n  background: #dc2626;\n  color: #fff;\n  border: none;\n  border-radius: 25px;\n  padding: 0 14px;\n  height: 45px;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);\n  font-weight: 700;\n  letter-spacing: 0.3px;\n  white-space: nowrap;\n}\n.logout-fab {\n  margin-top: calc(env(safe-area-inset-top) + 8px);\n  margin-right: calc(env(safe-area-inset-right) + 8px);\n  z-index: 1000;\n}\n.admin-fab {\n  --color:white;\n  margin-top: calc(env(safe-area-inset-top) + 8px);\n  margin-right: calc(env(safe-area-inset-right) + 8px);\n  z-index: 1000;\n}\n@media (min-width: 768px) {\n  .logout-fab {\n    display: none;\n  }\n}\n@media (max-width: 768px) {\n  .btn-logout {\n    display: none;\n  }\n}\n@media (max-width: 480px) {\n  .btn-logout {\n    height: 40px;\n    padding: 0 10px;\n    border-radius: 20px;\n    font-size: 0.9rem;\n  }\n  .btn-logout::before {\n    content: " ";\n  }\n  .btn-logout ion-icon {\n    font-size: 1.2rem;\n  }\n  .btn-logout {\n    gap: 0;\n  }\n}\n/*# sourceMappingURL=tabs-user.page.css.map */\n'] }]
  }], () => [{ type: Router }, { type: AuthService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TabsUserPage, { className: "TabsUserPage", filePath: "src/app/components-user/tabs-user/tabs-user.page.ts", lineNumber: 15 });
})();
export {
  TabsUserPage
};
//# sourceMappingURL=tabs-user.page-SKXC4MYW.js.map
