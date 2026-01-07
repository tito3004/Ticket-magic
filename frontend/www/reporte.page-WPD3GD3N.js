import {
  UsersService
} from "./chunk-5NNU3S5F.js";
import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonicModule,
  TextValueAccessorDirective
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
  FormsModule,
  NgControlStatus,
  NgModel,
  Router,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵtext,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
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

// src/app/components-admin/reporte/reporte.page.ts
var _ReportePage = class _ReportePage {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.usersSvc = inject(UsersService);
    this.codigo = "";
    this.loading = false;
  }
  // si viene ?cod-unico-boleto=... en la URL, lo procesa
  ngOnInit() {
    this.route.queryParamMap.subscribe((qp) => {
      const cod = qp.get("cod-unico-boleto");
      if (cod && cod.trim()) {
        this.codigo = cod.trim();
        this.verificarYAlertar(this.codigo);
      }
    });
  }
  // botón "comprobar": valida y refresca la URL con el código
  comprobarCodigo() {
    if (!this.codigo?.trim()) {
      alert("C\xF3digo requerido\nIngresa un c\xF3digo para comprobar.");
      return;
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { "cod-unico-boleto": this.codigo.trim() },
      queryParamsHandling: "merge"
    });
  }
  // consulta a la API y muestra el resultado en un alert()
  verificarYAlertar(cod) {
    if (this.loading)
      return;
    this.loading = true;
    this.usersSvc.getResumenPorCodigo(cod).subscribe({
      next: (resp) => {
        this.loading = false;
        if (!resp?.status) {
          alert(`No encontrado
${resp?.message || "No se encontr\xF3 informaci\xF3n para ese c\xF3digo."}`);
          return;
        }
        const rows = resp.data ?? [];
        if (!rows.length) {
          alert("Sin datos\nNo hay registros para ese c\xF3digo.");
          return;
        }
        const r = rows[0];
        const horaFormateada = r.hora ? r.hora.toString().slice(0, 5) : "";
        const msg = `Evento: ${r.nombre_evento}
Fecha: ${r.fecha}
Hora: ${horaFormateada}
Cantidad: ${r.cantidad}
C\xF3digo: ${r.cod_unico_boleto}`;
        alert(msg);
      },
      error: () => {
        this.loading = false;
        alert("Error\nNo se pudo verificar el c\xF3digo.");
      }
    });
  }
  // placeholder del escáner (por integrar)
  abrirCamara() {
    alert("Integraci\xF3n de esc\xE1ner pendiente.");
  }
};
_ReportePage.\u0275fac = function ReportePage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ReportePage)();
};
_ReportePage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReportePage, selectors: [["app-reporte"]], decls: 11, vars: 1, consts: [[1, "fondo-oscuro"], [1, "contenedor-formulario"], [1, "formulario"], [1, "titulo"], ["fill", "outline", "lines", "none", 1, "qr-item"], ["placeholder", "C\xF3digo", 3, "ngModelChange", "keyup.enter", "ngModel"], ["slot", "end", "fill", "clear", "aria-label", "Abrir c\xE1mara", 1, "qr-camera", 3, "click"], ["name", "camera-outline"], ["expand", "block", 3, "click"]], template: function ReportePage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 0)(1, "div", 1)(2, "div", 2)(3, "h2", 3);
    \u0275\u0275text(4, "Compruebe su c\xF3digo QR");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "ion-item", 4)(6, "ion-input", 5);
    \u0275\u0275twoWayListener("ngModelChange", function ReportePage_Template_ion_input_ngModelChange_6_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.codigo, $event) || (ctx.codigo = $event);
      return $event;
    });
    \u0275\u0275listener("keyup.enter", function ReportePage_Template_ion_input_keyup_enter_6_listener() {
      return ctx.comprobarCodigo();
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "ion-button", 6);
    \u0275\u0275listener("click", function ReportePage_Template_ion_button_click_7_listener() {
      return ctx.abrirCamara();
    });
    \u0275\u0275element(8, "ion-icon", 7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "ion-button", 8);
    \u0275\u0275listener("click", function ReportePage_Template_ion_button_click_9_listener() {
      return ctx.comprobarCodigo();
    });
    \u0275\u0275text(10, "COMPROBAR");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx.codigo);
  }
}, dependencies: [CommonModule, FormsModule, NgControlStatus, NgModel, IonicModule, IonButton, IonContent, IonIcon, IonInput, IonItem, TextValueAccessorDirective], styles: ["\n\n.fondo-oscuro[_ngcontent-%COMP%] {\n  --background: #0a0a0a;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n}\n.contenedor-formulario[_ngcontent-%COMP%] {\n  max-width: 450px;\n  width: 90%;\n  margin: auto;\n  margin-top: 20vh;\n  padding: 2rem;\n  background-color: #111;\n  border-radius: 20px;\n  box-shadow: 0 0 25px #7c3aed;\n  color: white;\n  text-align: center;\n}\n.qr-item[_ngcontent-%COMP%] {\n  --background: #1a1a22;\n  --color: #e5e7eb;\n  --highlight-color-focused: #7C3AED;\n  --padding-start: 12px;\n  --padding-end: 6px;\n  border-radius: 12px;\n  margin-bottom: 14px;\n}\nion-button.qr-camera[_ngcontent-%COMP%] {\n  --padding-start: 6px;\n  --padding-end: 6px;\n  --background: #1a1a22;\n  --box-shadow: none;\n  --border-radius: 50%;\n  --min-width: auto;\n  min-width: 0;\n}\nion-button.qr-camera[_ngcontent-%COMP%]::part(native) {\n  white-space: nowrap;\n}\nion-button.qr-camera[_ngcontent-%COMP%]:hover {\n  --background: #1a1a22;\n}\n.qr-item[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: white;\n}\n.qr-item[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]:hover {\n  --color: #7c3aed;\n  --color-select: #7c3aed;\n}\n.formulario[_ngcontent-%COMP%] {\n}\n.titulo[_ngcontent-%COMP%] {\n  color: white;\n  text-align: center;\n  margin-bottom: 1.5rem;\n  font-weight: bold;\n}\nion-input[_ngcontent-%COMP%] {\n  background-color: #1c1c2e;\n  color: white;\n  border-radius: 8px;\n  margin-bottom: 1rem;\n  --padding-start: 1rem;\n}\nion-input[_ngcontent-%COMP%]::part(native-input) {\n  color: white;\n}\nion-button[_ngcontent-%COMP%] {\n  --color:white !important;\n  --background: #7c3aed;\n  --border-radius: 12px;\n  font-weight: bold;\n}\n/*# sourceMappingURL=reporte.page.css.map */"] });
var ReportePage = _ReportePage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReportePage, [{
    type: Component,
    args: [{ selector: "app-reporte", standalone: true, imports: [CommonModule, FormsModule, IonicModule], template: '<ion-content class="fondo-oscuro">\n  <div class="contenedor-formulario">\n    <div class="formulario">\n      <h2 class="titulo">Compruebe su c\xF3digo QR</h2>\n\n      <ion-item class="qr-item" fill="outline" lines="none">\n        <ion-input\n          placeholder="C\xF3digo"\n          [(ngModel)]="codigo"\n          (keyup.enter)="comprobarCodigo()">\n        </ion-input>\n\n        <!-- Bot\xF3n de c\xE1mara (placeholder por ahora) -->\n        <ion-button slot="end" class="qr-camera" fill="clear" aria-label="Abrir c\xE1mara" (click)="abrirCamara()">\n          <ion-icon name="camera-outline"></ion-icon>\n        </ion-button>\n      </ion-item>\n\n      <ion-button expand="block" (click)="comprobarCodigo()">COMPROBAR</ion-button>\n    </div>\n  </div>\n</ion-content>\n', styles: ["/* src/app/components-admin/reporte/reporte.page.css */\n.fondo-oscuro {\n  --background: #0a0a0a;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n}\n.contenedor-formulario {\n  max-width: 450px;\n  width: 90%;\n  margin: auto;\n  margin-top: 20vh;\n  padding: 2rem;\n  background-color: #111;\n  border-radius: 20px;\n  box-shadow: 0 0 25px #7c3aed;\n  color: white;\n  text-align: center;\n}\n.qr-item {\n  --background: #1a1a22;\n  --color: #e5e7eb;\n  --highlight-color-focused: #7C3AED;\n  --padding-start: 12px;\n  --padding-end: 6px;\n  border-radius: 12px;\n  margin-bottom: 14px;\n}\nion-button.qr-camera {\n  --padding-start: 6px;\n  --padding-end: 6px;\n  --background: #1a1a22;\n  --box-shadow: none;\n  --border-radius: 50%;\n  --min-width: auto;\n  min-width: 0;\n}\nion-button.qr-camera::part(native) {\n  white-space: nowrap;\n}\nion-button.qr-camera:hover {\n  --background: #1a1a22;\n}\n.qr-item ion-icon {\n  font-size: 20px;\n  color: white;\n}\n.qr-item ion-icon:hover {\n  --color: #7c3aed;\n  --color-select: #7c3aed;\n}\n.formulario {\n}\n.titulo {\n  color: white;\n  text-align: center;\n  margin-bottom: 1.5rem;\n  font-weight: bold;\n}\nion-input {\n  background-color: #1c1c2e;\n  color: white;\n  border-radius: 8px;\n  margin-bottom: 1rem;\n  --padding-start: 1rem;\n}\nion-input::part(native-input) {\n  color: white;\n}\nion-button {\n  --color:white !important;\n  --background: #7c3aed;\n  --border-radius: 12px;\n  font-weight: bold;\n}\n/*# sourceMappingURL=reporte.page.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReportePage, { className: "ReportePage", filePath: "src/app/components-admin/reporte/reporte.page.ts", lineNumber: 16 });
})();
export {
  ReportePage
};
//# sourceMappingURL=reporte.page-WPD3GD3N.js.map
