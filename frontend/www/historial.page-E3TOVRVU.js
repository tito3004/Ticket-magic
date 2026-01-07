import {
  UsersService
} from "./chunk-5NNU3S5F.js";
import {
  IonContent,
  IonHeader,
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
  environment
} from "./chunk-NISRFBUD.js";
import {
  ActivatedRoute,
  CommonModule,
  Component,
  NgForOf,
  Router,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
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

// src/app/components-user/historial/historial.page.ts
function HistorialPage_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 5)(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 6);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "img", 7);
    \u0275\u0275elementStart(7, "p", 8);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const boleto_r1 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(boleto_r1.evento);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", boleto_r1.fecha, " \u2022 ", boleto_r1.hora);
    \u0275\u0275advance();
    \u0275\u0275property("src", boleto_r1.qr, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("ID: ", boleto_r1.id);
  }
}
var _HistorialPage = class _HistorialPage {
  constructor(router, route, UsersService2) {
    this.router = router;
    this.route = route;
    this.UsersService = UsersService2;
    this.boletos = [];
    this.loading = false;
    this.appBaseUrl = environment.webAppBaseUrl ?? window.location.origin;
  }
  ngOnInit() {
    this.cargar();
  }
  cargar(event) {
    this.loading = true;
    this.UsersService.getResumenPorUsuario().subscribe({
      next: (resp) => __async(this, null, function* () {
        this.loading = false;
        event?.target?.complete?.();
        if (!resp.status) {
          alert();
          return;
        }
        const rows = resp.data ?? [];
        this.boletos = rows.map((r) => {
          const link = `${this.appBaseUrl}/tabs-admin/comprobar?cod-unico-boleto=${encodeURIComponent(r.cod_unico_boleto)}`;
          const qr = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(link)}`;
          return {
            evento: r.nombre_evento,
            fecha: String(r.fecha),
            hora: String(r.hora),
            id: r.cod_unico_boleto,
            cantidad: r.cantidad,
            link,
            qr
          };
        });
      }),
      error: () => __async(this, null, function* () {
        this.loading = false;
        event?.target?.complete?.();
        alert("Error al cargar el historial");
      })
    });
  }
  trackByCod(_, b) {
    return b.id;
  }
};
_HistorialPage.\u0275fac = function HistorialPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _HistorialPage)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(UsersService));
};
_HistorialPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HistorialPage, selectors: [["app-historial"]], decls: 7, vars: 2, consts: [[1, "ion-padding", 3, "fullscreen"], [1, "historial-title"], [1, "tarjetas-container"], ["class", "tarjeta-boleto", 4, "ngFor", "ngForOf"], [1, "tarjeta-boleto"], [1, "contenido-boleto"], [1, "fecha"], ["alt", "C\xF3digo QR", 1, "qr-img", 3, "src"], [1, "id"]], template: function HistorialPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ion-header");
    \u0275\u0275elementStart(1, "ion-content", 0)(2, "div", 1)(3, "h1");
    \u0275\u0275text(4, "Historial de boletos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 2);
    \u0275\u0275template(6, HistorialPage_div_6_Template, 9, 5, "div", 3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("fullscreen", true);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx.boletos);
  }
}, dependencies: [CommonModule, NgForOf, IonicModule, IonContent, IonHeader], styles: ["\n\nion-content[_ngcontent-%COMP%] {\n  --background:\n    linear-gradient(\n      to bottom,\n      #0f0f1a,\n      #1a1a2e);\n}\n.historial-title[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 16px;\n  margin-bottom: 24px;\n}\n.historial-title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 26px;\n  font-weight: bold;\n  color: #ffffff;\n  align-content: center;\n}\n.tarjetas-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  gap: 16px;\n}\n.tarjeta-boleto[_ngcontent-%COMP%] {\n  background-color: #1e1e2e;\n  border-radius: 16px;\n  padding: 16px;\n  width: 260px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);\n  text-align: center;\n  transition: transform 0.2s;\n}\n.tarjeta-boleto[_ngcontent-%COMP%]:hover {\n  transform: scale(1.03);\n}\n.tarjeta-boleto[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #ffffff;\n  margin-bottom: 6px;\n}\n.tarjeta-boleto[_ngcontent-%COMP%]   .fecha[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #cccccc;\n  margin-bottom: 12px;\n}\n.qr-img[_ngcontent-%COMP%] {\n  width: 100px;\n  height: 100px;\n  margin-bottom: 10px;\n  border: 2px solid #7C3AED;\n  border-radius: 8px;\n}\n.id[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #bbbbbb;\n}\n.id[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%] {\n  --background: #0f0f1a;\n  --color: #ffffff;\n}\n.id[_ngcontent-%COMP%]   ion-title[_ngcontent-%COMP%] {\n  color: #ffffff;\n  font-weight: bold;\n}\n/*# sourceMappingURL=historial.page.css.map */"] });
var HistorialPage = _HistorialPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HistorialPage, [{
    type: Component,
    args: [{ selector: "app-historial", standalone: true, imports: [CommonModule, IonicModule], template: '<ion-header>\n\n</ion-header>\n\n<ion-content [fullscreen]="true" class="ion-padding">\n  <div  class="historial-title">\n    <h1>Historial de boletos</h1>\n  </div>\n\n  <div class="tarjetas-container">\n    <div class="tarjeta-boleto" *ngFor="let boleto of boletos">\n      <div class="contenido-boleto">\n        <h2>{{ boleto.evento }}</h2>\n        <p class="fecha">{{ boleto.fecha }} \u2022 {{ boleto.hora }}</p>\n        <img [src]="boleto.qr" alt="C\xF3digo QR" class="qr-img" />\n        <p class="id">ID: {{ boleto.id }}</p>\n      </div>\n    </div>\n  </div>\n</ion-content>\n', styles: ["/* src/app/components-user/historial/historial.page.css */\nion-content {\n  --background:\n    linear-gradient(\n      to bottom,\n      #0f0f1a,\n      #1a1a2e);\n}\n.historial-title {\n  text-align: center;\n  margin-top: 16px;\n  margin-bottom: 24px;\n}\n.historial-title h1 {\n  font-size: 26px;\n  font-weight: bold;\n  color: #ffffff;\n  align-content: center;\n}\n.tarjetas-container {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  gap: 16px;\n}\n.tarjeta-boleto {\n  background-color: #1e1e2e;\n  border-radius: 16px;\n  padding: 16px;\n  width: 260px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);\n  text-align: center;\n  transition: transform 0.2s;\n}\n.tarjeta-boleto:hover {\n  transform: scale(1.03);\n}\n.tarjeta-boleto h2 {\n  font-size: 18px;\n  color: #ffffff;\n  margin-bottom: 6px;\n}\n.tarjeta-boleto .fecha {\n  font-size: 14px;\n  color: #cccccc;\n  margin-bottom: 12px;\n}\n.qr-img {\n  width: 100px;\n  height: 100px;\n  margin-bottom: 10px;\n  border: 2px solid #7C3AED;\n  border-radius: 8px;\n}\n.id {\n  font-size: 13px;\n  color: #bbbbbb;\n}\n.id ion-toolbar {\n  --background: #0f0f1a;\n  --color: #ffffff;\n}\n.id ion-title {\n  color: #ffffff;\n  font-weight: bold;\n}\n/*# sourceMappingURL=historial.page.css.map */\n"] }]
  }], () => [{ type: Router }, { type: ActivatedRoute }, { type: UsersService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HistorialPage, { className: "HistorialPage", filePath: "src/app/components-user/historial/historial.page.ts", lineNumber: 26 });
})();
export {
  HistorialPage
};
//# sourceMappingURL=historial.page-E3TOVRVU.js.map
