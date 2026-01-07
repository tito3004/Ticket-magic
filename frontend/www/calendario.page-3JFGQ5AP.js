import {
  FullCalendarComponent,
  FullCalendarModule,
  index
} from "./chunk-4EMPXOOC.js";
import {
  UsersService
} from "./chunk-5NNU3S5F.js";
import {
  IonContent,
  IonHeader,
  IonToolbar,
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
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
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
  __spreadProps,
  __spreadValues
} from "./chunk-QHQP2P2Z.js";

// src/app/components-user/calendario/calendario.page.ts
var _CalendarioPage = class _CalendarioPage {
  constructor() {
    this.usersSvc = inject(UsersService);
    this.loading = false;
    this.calendarOptions = {
      plugins: [index],
      initialView: "dayGridMonth",
      events: [],
      contentHeight: "auto",
      headerToolbar: { left: "prev,next today", center: "title", right: "" },
      eventTimeFormat: { hour: "2-digit", minute: "2-digit", hour12: false }
    };
  }
  ngOnInit() {
    this.cargarEventos();
  }
  // pide compras del usuario y las mapea a eventos únicos
  cargarEventos() {
    this.loading = true;
    this.usersSvc.getResumenPorUsuario().subscribe({
      next: (resp) => {
        this.loading = false;
        if (!resp?.status) {
          alert(resp?.message || "No se pudo cargar tus eventos");
          return;
        }
        const rows = resp.data ?? [];
        const uniq = /* @__PURE__ */ new Map();
        for (const r of rows) {
          const fecha = String(r.fecha);
          const hora = String(r.hora).substring(0, 5);
          const key = `${r.nombre_evento}|${fecha}|${hora}`;
          if (!uniq.has(key)) {
            uniq.set(key, {
              title: r.nombre_evento,
              start: `${fecha}T${hora}`
            });
          }
        }
        const events = Array.from(uniq.values());
        this.calendarOptions = __spreadProps(__spreadValues({}, this.calendarOptions), { events });
      },
      error: () => {
        this.loading = false;
        alert("Error al cargar tus eventos");
      }
    });
  }
};
_CalendarioPage.\u0275fac = function CalendarioPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarioPage)();
};
_CalendarioPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CalendarioPage, selectors: [["app-calendario"]], decls: 8, vars: 2, consts: [["color", "white"], [1, "ion-padding", 3, "fullscreen"], [1, "historial-title"], [1, "calendar-container"], [3, "options"]], template: function CalendarioPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-header");
    \u0275\u0275element(1, "ion-toolbar", 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "ion-content", 1)(3, "div", 2)(4, "h1");
    \u0275\u0275text(5, "Tus eventos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 3);
    \u0275\u0275element(7, "full-calendar", 4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275property("fullscreen", true);
    \u0275\u0275advance(5);
    \u0275\u0275property("options", ctx.calendarOptions);
  }
}, dependencies: [CommonModule, IonicModule, IonContent, IonHeader, IonToolbar, FullCalendarModule, FullCalendarComponent], styles: ["\n\nion-content[_ngcontent-%COMP%] {\n  --background:\n    linear-gradient(\n      to bottom,\n      #0f0f1a,\n      #1a1a2e);\n}\nion-toolbar[_ngcontent-%COMP%] {\n  --background: #0f0f1a;\n  --color: #ffffff;\n}\nion-title[_ngcontent-%COMP%] {\n  color: #ffffff;\n  font-weight: bold;\n}\n.historial-title[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 16px;\n  margin-bottom: 24px;\n}\n.historial-title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 26px;\n  font-weight: bold;\n  color: #ffffff;\n  align-content: center;\n}\n.calendar-container[_ngcontent-%COMP%] {\n  background-color: #1e1e2e;\n  padding: 20px;\n  border-radius: 16px;\n  max-width: 800px;\n  margin: 30px auto;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);\n  color: #ffffff;\n}\n.fc[_ngcontent-%COMP%] {\n  background-color: transparent;\n  color: #ffffff;\n}\n.fc[_ngcontent-%COMP%]   .fc-toolbar-title[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.fc[_ngcontent-%COMP%]   .fc-daygrid-day-number[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.fc-event[_ngcontent-%COMP%] {\n  background-color: #7C3AED;\n  border: none;\n  border-radius: 6px;\n  padding: 2px 4px;\n  font-size: 12px;\n}\n/*# sourceMappingURL=calendario.page.css.map */"] });
var CalendarioPage = _CalendarioPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarioPage, [{
    type: Component,
    args: [{ selector: "app-calendario", standalone: true, imports: [CommonModule, IonicModule, FullCalendarModule], template: '<ion-header>\n  <ion-toolbar color="white">\n    \n  </ion-toolbar>\n</ion-header>\n\n<ion-content [fullscreen]="true" class="ion-padding">\n\n  <div  class="historial-title">\n    <h1>Tus eventos</h1>\n  </div>\n  <div class="calendar-container">\n    <full-calendar [options]="calendarOptions"></full-calendar>\n  </div>\n</ion-content>\n', styles: ["/* src/app/components-user/calendario/calendario.page.css */\nion-content {\n  --background:\n    linear-gradient(\n      to bottom,\n      #0f0f1a,\n      #1a1a2e);\n}\nion-toolbar {\n  --background: #0f0f1a;\n  --color: #ffffff;\n}\nion-title {\n  color: #ffffff;\n  font-weight: bold;\n}\n.historial-title {\n  text-align: center;\n  margin-top: 16px;\n  margin-bottom: 24px;\n}\n.historial-title h1 {\n  font-size: 26px;\n  font-weight: bold;\n  color: #ffffff;\n  align-content: center;\n}\n.calendar-container {\n  background-color: #1e1e2e;\n  padding: 20px;\n  border-radius: 16px;\n  max-width: 800px;\n  margin: 30px auto;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);\n  color: #ffffff;\n}\n.fc {\n  background-color: transparent;\n  color: #ffffff;\n}\n.fc .fc-toolbar-title {\n  color: #ffffff;\n}\n.fc .fc-daygrid-day-number {\n  color: #ffffff;\n}\n.fc-event {\n  background-color: #7C3AED;\n  border: none;\n  border-radius: 6px;\n  padding: 2px 4px;\n  font-size: 12px;\n}\n/*# sourceMappingURL=calendario.page.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CalendarioPage, { className: "CalendarioPage", filePath: "src/app/components-user/calendario/calendario.page.ts", lineNumber: 17 });
})();
export {
  CalendarioPage
};
//# sourceMappingURL=calendario.page-3JFGQ5AP.js.map
