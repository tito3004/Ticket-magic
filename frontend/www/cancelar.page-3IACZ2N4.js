import {
  AdminService
} from "./chunk-ZIS3HBWG.js";
import {
  PublicService
} from "./chunk-HBGVP364.js";
import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonicModule,
  SelectValueAccessorDirective
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
import "./chunk-NISRFBUD.js";
import {
  CommonModule,
  Component,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  ReactiveFormsModule,
  RequiredValidator,
  Router,
  Validators,
  setClassMetadata,
  ɵNgNoValidate,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
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

// src/app/components-admin/cancelar/cancelar.page.ts
function CancelarPage_ion_select_option_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-select-option");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const evento_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(evento_r1.nombre_evento);
  }
}
function CancelarPage_ion_select_option_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-select-option");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const evento_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(evento_r2.nombre_evento);
  }
}
var _CancelarPage = class _CancelarPage {
  constructor(fb, AdminService2, router, PublicService2) {
    this.fb = fb;
    this.AdminService = AdminService2;
    this.router = router;
    this.PublicService = PublicService2;
    this.eventos = [];
    this.cancelarForm = this.fb.group({
      nombre_evento: ["", [Validators.required]]
    });
    this.generarForm = this.fb.group({
      nombre_evento: ["", [Validators.required]]
    });
  }
  // cargar eventos (únicos por id_evento)
  ngOnInit() {
    this.cancelarForm.reset();
    this.generarForm.reset();
    this.PublicService.consulta_eventos().subscribe((resp) => {
      const eventos = resp.value;
      const eventosUnicos = eventos.filter((evento, index, self) => index === self.findIndex((e) => e.id_evento === evento.id_evento));
      this.eventos = eventosUnicos;
      localStorage.setItem("Eventos", JSON.stringify(eventosUnicos));
    });
  }
  // cancelar el evento elegido
  cancelarEvento() {
    if (this.cancelarForm.valid) {
      this.AdminService.cancelar_evento(this.cancelarForm.value).subscribe((resp) => {
        if (resp.status) {
          this.cancelarForm.reset();
          alert("Evento cancelado");
          this.router.navigate(["/tabs-admin/calendario"]);
        } else {
          alert(resp.message);
        }
      }, (err) => {
        console.error("Error al registrase:", err);
        alert("Hubo un problema al cancelar evento");
      });
    } else {
      alert("Por favor, completa todos los campos correctamente.");
    }
  }
  // generar reporte del evento elegido (envía por correo)
  reporteEvento() {
    if (this.generarForm.valid) {
      this.AdminService.reporte_evento(this.generarForm.value).subscribe((resp) => {
        if (resp.status) {
          this.generarForm.reset();
          alert("Reporte enviado");
          this.router.navigate(["/tabs-admin/calendario"]);
        } else {
          alert(resp.message);
        }
      }, (err) => {
        console.error("Error al enviar reporte:", err);
        alert("Hubo un problema al generar reporte");
      });
    } else {
      alert("Por favor, completa todos los campos correctamente.");
    }
  }
};
_CancelarPage.\u0275fac = function CancelarPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CancelarPage)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AdminService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(PublicService));
};
_CancelarPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CancelarPage, selectors: [["app-cancelar"]], decls: 26, vars: 5, consts: [[3, "fullscreen"], [1, "titulo", 2, "margin-top", "4vh"], [1, "contenedor-formulario"], [1, "formulario"], [1, "titulo"], [3, "ngSubmit", "formGroup"], ["lines", "none"], ["position", "stacked"], ["formControlName", "nombre_evento", "placeholder", "Selecciona un evento", "required", ""], [4, "ngFor", "ngForOf"], ["expand", "block", "type", "submit"], [1, "cancelar-container"], ["expand", "block", "type", "submit", 1, "button-cancelar"]], template: function CancelarPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 0)(1, "h2", 1);
    \u0275\u0275text(2, "Administraci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 2)(4, "div", 3)(5, "h2", 4);
    \u0275\u0275text(6, "Generar Reporte");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "form", 5);
    \u0275\u0275listener("ngSubmit", function CancelarPage_Template_form_ngSubmit_7_listener() {
      return ctx.reporteEvento();
    });
    \u0275\u0275elementStart(8, "ion-item", 6)(9, "ion-label", 7);
    \u0275\u0275text(10, "Genere reporte de:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "ion-select", 8);
    \u0275\u0275template(12, CancelarPage_ion_select_option_12_Template, 2, 1, "ion-select-option", 9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "ion-button", 10);
    \u0275\u0275text(14, " GENERAR ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(15, "div", 11)(16, "h2");
    \u0275\u0275text(17, "Cancelar Evento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "form", 5);
    \u0275\u0275listener("ngSubmit", function CancelarPage_Template_form_ngSubmit_18_listener() {
      return ctx.cancelarEvento();
    });
    \u0275\u0275elementStart(19, "ion-item", 6)(20, "ion-label", 7);
    \u0275\u0275text(21, "Evento a cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "ion-select", 8);
    \u0275\u0275template(23, CancelarPage_ion_select_option_23_Template, 2, 1, "ion-select-option", 9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "ion-button", 12);
    \u0275\u0275text(25, " Cancelar Evento ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275property("fullscreen", true);
    \u0275\u0275advance(7);
    \u0275\u0275property("formGroup", ctx.generarForm);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx.eventos);
    \u0275\u0275advance(6);
    \u0275\u0275property("formGroup", ctx.cancelarForm);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx.eventos);
  }
}, dependencies: [IonicModule, IonButton, IonContent, IonItem, IonLabel, IonSelect, IonSelectOption, SelectValueAccessorDirective, FormsModule, \u0275NgNoValidate, NgControlStatus, NgControlStatusGroup, RequiredValidator, CommonModule, NgForOf, ReactiveFormsModule, FormGroupDirective, FormControlName], styles: ["\n\n[_nghost-%COMP%]   ion-content[_ngcontent-%COMP%] {\n  --background: #0a0a0a;\n}\n.cancelar-container[_ngcontent-%COMP%] {\n  max-width: 450px;\n  width: 90%;\n  margin: auto;\n  margin-top: 7vh !important;\n  margin-bottom: 7vh !important;\n  padding: 2rem;\n  background-color: #111;\n  border-radius: 20px;\n  box-shadow: 0 0 25px #7c3aed;\n  color: white;\n  text-align: center;\n}\nion-item[_ngcontent-%COMP%] {\n  background-color: #1e1e1e;\n  border-radius: 10px;\n  margin-top: 1rem;\n  --highlight-color-focused: #7c3aed;\n  --color: white;\n}\nion-label[_ngcontent-%COMP%] {\n  color: #ccc;\n}\nion-select[_ngcontent-%COMP%], \nion-textarea[_ngcontent-%COMP%] {\n  color: white;\n}\nion-button[_ngcontent-%COMP%] {\n  margin-top: 2rem;\n  --background: #e11d48;\n  --border-radius: 10px;\n  font-weight: bold;\n}\n@media screen and (max-width: 480px) {\n  .cancelar-container[_ngcontent-%COMP%] {\n    padding: 1rem;\n    margin-top: 1vh;\n  }\n}\n.fondo-oscuro[_ngcontent-%COMP%] {\n  --background: #0a0a0a;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n}\n.contenedor-formulario[_ngcontent-%COMP%] {\n  max-width: 450px;\n  width: 90%;\n  margin: auto;\n  margin-top: 7vh;\n  padding: 2rem;\n  background-color: #111;\n  border-radius: 20px;\n  box-shadow: 0 0 25px #7c3aed;\n  color: white;\n  text-align: center;\n}\n.button-cancelar[_ngcontent-%COMP%] {\n  --background:red;\n  --color:white;\n}\n.formulario[_ngcontent-%COMP%] {\n}\n.titulo[_ngcontent-%COMP%] {\n  color: white;\n  text-align: center;\n  margin-bottom: 1.5rem;\n  font-weight: bold;\n}\nion-input[_ngcontent-%COMP%] {\n  background-color: #1c1c2e;\n  color: white;\n  border-radius: 8px;\n  margin-bottom: 1rem;\n  --padding-start: 1rem;\n}\nion-input[_ngcontent-%COMP%]::part(native-input) {\n  color: white;\n}\nion-button[_ngcontent-%COMP%] {\n  --color:white !important;\n  --background: #7c3aed;\n  --border-radius: 12px;\n  font-weight: bold;\n}\n/*# sourceMappingURL=cancelar.page.css.map */"] });
var CancelarPage = _CancelarPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CancelarPage, [{
    type: Component,
    args: [{ selector: "app-cancelar", standalone: true, imports: [IonicModule, FormsModule, CommonModule, ReactiveFormsModule], template: '<ion-content [fullscreen]="true">\n\n\n  <h2 class="titulo" style="margin-top:4vh;">Administraci\xF3n</h2>\n  <div class="contenedor-formulario">\n    <div class="formulario">\n      <h2 class="titulo">Generar Reporte</h2>\n      <form [formGroup]="generarForm" (ngSubmit)="reporteEvento()">\n      <ion-item lines="none">\n        <ion-label position="stacked">Genere reporte de:</ion-label>\n        <ion-select formControlName="nombre_evento" placeholder="Selecciona un evento" required>\n          <ion-select-option *ngFor="let evento of eventos">{{evento.nombre_evento}}</ion-select-option>\n        </ion-select>\n      </ion-item>\n      <ion-button expand="block" type="submit">\n        GENERAR\n      </ion-button>\n    </form>\n    </div>\n  </div>\n  <div class="cancelar-container">\n    <h2>Cancelar Evento</h2>\n\n    <form [formGroup]="cancelarForm" (ngSubmit)="cancelarEvento()">\n      <ion-item lines="none">\n        <ion-label position="stacked">Evento a cancelar</ion-label>\n        <ion-select formControlName="nombre_evento" placeholder="Selecciona un evento" required>\n          <ion-select-option *ngFor="let evento of eventos">{{evento.nombre_evento}}</ion-select-option>\n        </ion-select>\n      </ion-item>\n\n\n      <ion-button expand="block" type="submit" class="button-cancelar">\n        Cancelar Evento\n      </ion-button>\n    </form>\n  </div>\n\n\n</ion-content>', styles: ["/* src/app/components-admin/cancelar/cancelar.page.css */\n:host ion-content {\n  --background: #0a0a0a;\n}\n.cancelar-container {\n  max-width: 450px;\n  width: 90%;\n  margin: auto;\n  margin-top: 7vh !important;\n  margin-bottom: 7vh !important;\n  padding: 2rem;\n  background-color: #111;\n  border-radius: 20px;\n  box-shadow: 0 0 25px #7c3aed;\n  color: white;\n  text-align: center;\n}\nion-item {\n  background-color: #1e1e1e;\n  border-radius: 10px;\n  margin-top: 1rem;\n  --highlight-color-focused: #7c3aed;\n  --color: white;\n}\nion-label {\n  color: #ccc;\n}\nion-select,\nion-textarea {\n  color: white;\n}\nion-button {\n  margin-top: 2rem;\n  --background: #e11d48;\n  --border-radius: 10px;\n  font-weight: bold;\n}\n@media screen and (max-width: 480px) {\n  .cancelar-container {\n    padding: 1rem;\n    margin-top: 1vh;\n  }\n}\n.fondo-oscuro {\n  --background: #0a0a0a;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n}\n.contenedor-formulario {\n  max-width: 450px;\n  width: 90%;\n  margin: auto;\n  margin-top: 7vh;\n  padding: 2rem;\n  background-color: #111;\n  border-radius: 20px;\n  box-shadow: 0 0 25px #7c3aed;\n  color: white;\n  text-align: center;\n}\n.button-cancelar {\n  --background:red;\n  --color:white;\n}\n.formulario {\n}\n.titulo {\n  color: white;\n  text-align: center;\n  margin-bottom: 1.5rem;\n  font-weight: bold;\n}\nion-input {\n  background-color: #1c1c2e;\n  color: white;\n  border-radius: 8px;\n  margin-bottom: 1rem;\n  --padding-start: 1rem;\n}\nion-input::part(native-input) {\n  color: white;\n}\nion-button {\n  --color:white !important;\n  --background: #7c3aed;\n  --border-radius: 12px;\n  font-weight: bold;\n}\n/*# sourceMappingURL=cancelar.page.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: AdminService }, { type: Router }, { type: PublicService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CancelarPage, { className: "CancelarPage", filePath: "src/app/components-admin/cancelar/cancelar.page.ts", lineNumber: 18 });
})();
export {
  CancelarPage
};
//# sourceMappingURL=cancelar.page-3IACZ2N4.js.map
