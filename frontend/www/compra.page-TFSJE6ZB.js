import {
  PublicService
} from "./chunk-HBGVP364.js";
import {
  UsersService
} from "./chunk-5NNU3S5F.js";
import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonMinValidator,
  IonSelect,
  IonSelectOption,
  IonicModule,
  NumericValueAccessorDirective,
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
  Router,
  Validators,
  setClassMetadata,
  ɵNgNoValidate,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
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
import "./chunk-QHQP2P2Z.js";

// src/app/components-user/compra/compra.page.ts
function CompraPage_ion_select_option_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-select-option", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r1 = ctx.$implicit;
    \u0275\u0275property("value", e_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", e_r1.nombre, " ");
  }
}
function CompraPage_ion_select_option_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-select-option", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ll_r2 = ctx.$implicit;
    \u0275\u0275property("value", ll_r2.localidad);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ll_r2.localidad, " - ", ll_r2.lugar, " ");
  }
}
function CompraPage_ion_select_option_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-select-option", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r3 = ctx.$implicit;
    \u0275\u0275property("value", f_r3.id_fecha);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", f_r3.fecha, " ");
  }
}
function CompraPage_ion_select_option_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-select-option", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const h_r4 = ctx.$implicit;
    \u0275\u0275property("value", h_r4.id_hora);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", h_r4.hora, " ");
  }
}
var _CompraPage = class _CompraPage {
  constructor(router, fb, usersService, publicService) {
    this.router = router;
    this.fb = fb;
    this.usersService = usersService;
    this.publicService = publicService;
    this.rows = [];
    this.eventos = [];
    this.opcionesLocalidades = [];
    this.opcionesFechas = [];
    this.opcionesHoras = [];
    this.compraForm = this.fb.group({
      id_evento: [null, [Validators.required]],
      localidad: [null, [Validators.required]],
      id_fecha: [null, [Validators.required]],
      id_hora: [null, [Validators.required]],
      cantidad: [1, [Validators.required, Validators.min(1)]]
    });
  }
  ngOnInit() {
    this.publicService.consulta_eventos().subscribe((resp) => {
      const data = (resp?.value ?? []).map((r) => ({
        id_evento: Number(r.id_evento),
        nombre_evento: r.nombre_evento,
        localidad: r.descripcion || void 0,
        id_lugar: r.id_lugar != null ? Number(r.id_lugar) : void 0,
        nombre_lugar: r.nombre_lugar,
        id_fecha: r.id_fecha != null ? Number(r.id_fecha) : void 0,
        fecha: r.fecha,
        id_hora: r.id_hora != null ? Number(r.id_hora) : void 0,
        hora: (r.hora || "").slice(0, 5) || void 0,
        // HH:mm
        precio: r.precio
      }));
      this.rows = data;
      const seen = /* @__PURE__ */ new Set();
      this.eventos = data.filter((r) => {
        const id = Number(r.id_evento);
        if (seen.has(id))
          return false;
        seen.add(id);
        return true;
      }).map((r) => ({ id: Number(r.id_evento), nombre: r.nombre_evento }));
      this.wireCascades();
    });
  }
  /** Encadenado: evento → localidad → fecha → hora */
  wireCascades() {
    this.compraForm.get("id_evento").valueChanges.subscribe((id) => {
      const ide = Number(id || 0);
      this.opcionesLocalidades = ide ? this.getLocalidadesVistaPorEvento(ide) : [];
      this.opcionesFechas = [];
      this.opcionesHoras = [];
      this.compraForm.patchValue({ localidad: null, id_fecha: null, id_hora: null }, { emitEvent: false });
    });
    this.compraForm.get("localidad").valueChanges.subscribe((loc) => {
      const ide = Number(this.compraForm.get("id_evento").value || 0);
      const localidadSel = (loc || "").trim();
      this.opcionesFechas = ide && localidadSel ? this.getFechasPorLocalidad(ide, localidadSel) : [];
      this.opcionesHoras = [];
      this.compraForm.patchValue({ id_fecha: null, id_hora: null }, { emitEvent: false });
    });
    this.compraForm.get("id_fecha").valueChanges.subscribe((id_fecha) => {
      const ide = Number(this.compraForm.get("id_evento").value || 0);
      const localidadSel = (this.compraForm.get("localidad").value || "").trim();
      const idf = Number(id_fecha || 0);
      this.opcionesHoras = ide && localidadSel && idf ? this.getHoras(ide, localidadSel, idf) : [];
      this.compraForm.patchValue({ id_hora: null }, { emitEvent: false });
    });
  }
  /** Helpers de listas únicas */
  getLocalidadesVistaPorEvento(id_evento) {
    const mapa = /* @__PURE__ */ new Map();
    for (const r of this.rows) {
      if (Number(r.id_evento) !== id_evento)
        continue;
      if (!r.localidad || !r.nombre_lugar)
        continue;
      const key = `${r.localidad}__${r.nombre_lugar}`;
      if (!mapa.has(key)) {
        mapa.set(key, { localidad: r.localidad, lugar: r.nombre_lugar });
      }
    }
    const arr = Array.from(mapa.values());
    arr.sort((a, b) => (a.localidad + a.lugar).localeCompare(b.localidad + b.lugar));
    return arr;
  }
  getFechasPorLocalidad(id_evento, localidad) {
    const mapa = /* @__PURE__ */ new Map();
    for (const r of this.rows) {
      if (Number(r.id_evento) !== id_evento)
        continue;
      if ((r.localidad || "").trim() !== localidad)
        continue;
      if (r.id_fecha == null || !r.fecha)
        continue;
      const idf = Number(r.id_fecha);
      if (!mapa.has(idf))
        mapa.set(idf, { id_fecha: idf, fecha: r.fecha });
    }
    return Array.from(mapa.values()).sort((a, b) => a.fecha.localeCompare(b.fecha));
  }
  getHoras(id_evento, localidad, id_fecha) {
    const mapa = /* @__PURE__ */ new Map();
    for (const r of this.rows) {
      if (Number(r.id_evento) !== id_evento)
        continue;
      if ((r.localidad || "").trim() !== localidad)
        continue;
      if (Number(r.id_fecha) !== id_fecha)
        continue;
      if (r.id_hora == null || !r.hora)
        continue;
      const idh = Number(r.id_hora);
      if (!mapa.has(idh))
        mapa.set(idh, { id_hora: idh, hora: r.hora });
    }
    return Array.from(mapa.values()).sort((a, b) => a.hora.localeCompare(b.hora));
  }
  // envía la compra y redirige a PayPal (link del backend)
  Compra() {
    if (this.compraForm.invalid) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }
    const payload = this.compraForm.value;
    this.usersService.comprarBoletos(payload).subscribe({
      next: (resp) => {
        if (resp.status) {
          this.compraForm.reset();
          console.log(resp.link);
          window.location.href = resp.link;
        } else {
          alert(resp.message || "No se pudo completar la compra.");
        }
      },
      error: (err) => {
        console.error("Error al comprar:", err);
        alert("Hubo un problema al procesar la compra.");
      }
    });
  }
};
_CompraPage.\u0275fac = function CompraPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CompraPage)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(UsersService), \u0275\u0275directiveInject(PublicService));
};
_CompraPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CompraPage, selectors: [["app-compra"]], decls: 27, vars: 8, consts: [[1, "compra-container"], [1, "compra-card"], [3, "ngSubmit", "formGroup"], ["formControlName", "id_evento", "placeholder", "Selecciona evento", "interface", "popover"], [3, "value", 4, "ngFor", "ngForOf"], ["formControlName", "localidad", "placeholder", "Selecciona localidad - lugar", "interface", "popover", 3, "disabled"], ["formControlName", "id_fecha", 3, "disabled"], ["formControlName", "id_hora", 3, "disabled"], ["type", "number", "min", "1", "formControlName", "cantidad"], ["expand", "block", "type", "submit", 1, "boton-finalizar"], ["name", "paypal-outline"], [3, "value"]], template: function CompraPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 0)(1, "div", 1)(2, "h2");
    \u0275\u0275text(3, "Finaliza tu compra");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "form", 2);
    \u0275\u0275listener("ngSubmit", function CompraPage_Template_form_ngSubmit_4_listener() {
      return ctx.Compra();
    });
    \u0275\u0275elementStart(5, "label");
    \u0275\u0275text(6, "Selecciona un evento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "ion-select", 3);
    \u0275\u0275template(8, CompraPage_ion_select_option_8_Template, 2, 2, "ion-select-option", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "label");
    \u0275\u0275text(10, "Localidades disponibles");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "ion-select", 5);
    \u0275\u0275template(12, CompraPage_ion_select_option_12_Template, 2, 3, "ion-select-option", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "label");
    \u0275\u0275text(14, "Fechas disponibles");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "ion-select", 6);
    \u0275\u0275template(16, CompraPage_ion_select_option_16_Template, 2, 2, "ion-select-option", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "label");
    \u0275\u0275text(18, "Horas disponibles");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "ion-select", 7);
    \u0275\u0275template(20, CompraPage_ion_select_option_20_Template, 2, 2, "ion-select-option", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "label");
    \u0275\u0275text(22, "Cantidad de entradas");
    \u0275\u0275elementEnd();
    \u0275\u0275element(23, "ion-input", 8);
    \u0275\u0275elementStart(24, "ion-button", 9);
    \u0275\u0275text(25, " Finalizar compra - Via PayPal ");
    \u0275\u0275element(26, "ion-icon", 10);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275property("formGroup", ctx.compraForm);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx.eventos);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", !ctx.opcionesLocalidades.length);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx.opcionesLocalidades);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", !ctx.opcionesFechas.length);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx.opcionesFechas);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", !ctx.opcionesHoras.length);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx.opcionesHoras);
  }
}, dependencies: [CommonModule, NgForOf, FormsModule, \u0275NgNoValidate, NgControlStatus, NgControlStatusGroup, IonicModule, IonButton, IonContent, IonIcon, IonInput, IonSelect, IonSelectOption, NumericValueAccessorDirective, SelectValueAccessorDirective, IonMinValidator, ReactiveFormsModule, FormGroupDirective, FormControlName], styles: ["\n\n.compra-container[_ngcontent-%COMP%] {\n  --background: #0f0f17;\n  color: white;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.compra-card[_ngcontent-%COMP%] {\n  background-color: #1b1c25;\n  padding: 2rem;\n  border-radius: 20px;\n  max-width: 500px;\n  width: 90%;\n  margin: 2rem auto;\n  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);\n}\nh2[_ngcontent-%COMP%] {\n  font-size: 1.8rem;\n  margin-bottom: 1.5rem;\n  text-align: center;\n}\nlabel[_ngcontent-%COMP%] {\n  font-weight: bold;\n  margin-top: 1rem;\n  display: block;\n}\nion-select[_ngcontent-%COMP%], \nion-input[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  margin-bottom: 1rem;\n  background-color: #2c2e3a;\n  --color: white;\n  --placeholder-color: #aaa;\n  border-radius: 10px;\n}\n.fechas[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  margin: 1rem 0;\n}\n.fecha-btn[_ngcontent-%COMP%] {\n  background-color: #2c2e3a;\n  color: white;\n  border: none;\n  border-radius: 15px;\n  padding: 8px 12px;\n  cursor: pointer;\n  transition: background-color 0.3s;\n}\n.fecha-btn.activa[_ngcontent-%COMP%] {\n  background-color: #7C3AED;\n}\n.fecha-btn[_ngcontent-%COMP%]:hover {\n  background-color: #5b2cba;\n}\n.metodos-pago[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  margin: 1.5rem 0;\n}\n.metodos-pago[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100px;\n  height: 50px;\n  object-fit: contain;\n  cursor: pointer;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  border-radius: 8px;\n  padding: 5px;\n}\n.metodos-pago[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]:hover {\n  transform: scale(1.1);\n  box-shadow: 0 0 10px #7C3AED;\n}\n.metodos-pago[_ngcontent-%COMP%]   img.seleccionado[_ngcontent-%COMP%] {\n  border: 2px solid #7C3AED;\n}\n.boton-finalizar[_ngcontent-%COMP%] {\n  --background:\n    linear-gradient(\n      90deg,\n      #7C3AED 0%,\n      #9333EA 100%);\n  --background-activated:\n    linear-gradient(\n      90deg,\n      #6D28D9 0%,\n      #7C3AED 100%);\n  --background-focused:\n    linear-gradient(\n      90deg,\n      #6D28D9 0%,\n      #7C3AED 100%);\n  --background-hover:\n    linear-gradient(\n      90deg,\n      #6D28D9 0%,\n      #7C3AED 100%);\n  --color: white;\n  --border-radius: 12px;\n  font-weight: bold;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  height: 48px;\n  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.6);\n  transition: transform 0.2s ease-in-out;\n}\n.boton-finalizar[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\nion-button.boton-finalizar[disabled][_ngcontent-%COMP%] {\n  opacity: 0.6;\n  background:\n    linear-gradient(\n      90deg,\n      #7C3AED 0%,\n      #9333EA 100%) !important;\n}\n@media (max-width: 768px) {\n  .compra-card[_ngcontent-%COMP%], \n   .register-box[_ngcontent-%COMP%], \n   .login-box[_ngcontent-%COMP%], \n   .start-container[_ngcontent-%COMP%], \n   .eventos-section[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {\n    width: 95% !important;\n    margin: auto;\n    font-size: 14px;\n  }\n  .eventos-section[_ngcontent-%COMP%]   .fila-eventos[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: center;\n  }\n  .eventos-section[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    width: 100% !important;\n    height: auto;\n  }\n  ion-input[_ngcontent-%COMP%], \n   ion-button[_ngcontent-%COMP%], \n   .fecha-btn[_ngcontent-%COMP%], \n   .boton-finalizar[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  h1[_ngcontent-%COMP%], \n   h2[_ngcontent-%COMP%], \n   h3[_ngcontent-%COMP%] {\n    font-size: 18px !important;\n  }\n  .btn-ticket[_ngcontent-%COMP%] {\n    width: 90%;\n    margin: 8px auto;\n    padding: 10px;\n    font-size: 14px;\n  }\n}\n/*# sourceMappingURL=compra.page.css.map */"] });
var CompraPage = _CompraPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CompraPage, [{
    type: Component,
    args: [{ selector: "app-compra", standalone: true, imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule], template: '<ion-content class="compra-container">\n  <div class="compra-card">\n    <h2>Finaliza tu compra</h2>\n\n    <form [formGroup]="compraForm" (ngSubmit)="Compra()">\n      \n      <label>Selecciona un evento</label>\n      <ion-select formControlName="id_evento" placeholder="Selecciona evento" interface="popover">\n        <ion-select-option *ngFor="let e of eventos" [value]="e.id">\n          {{ e.nombre }}\n        </ion-select-option>\n      </ion-select>\n\n      <label>Localidades disponibles</label>\n      <ion-select formControlName="localidad" placeholder="Selecciona localidad - lugar"\n        [disabled]="!opcionesLocalidades.length" interface="popover">\n        <ion-select-option *ngFor="let ll of opcionesLocalidades" [value]="ll.localidad">\n          {{ ll.localidad }} - {{ ll.lugar }}\n        </ion-select-option>\n      </ion-select>\n\n\n\n      <label>Fechas disponibles</label>\n      <ion-select formControlName="id_fecha" [disabled]="!opcionesFechas.length">\n        <ion-select-option *ngFor="let f of opcionesFechas" [value]="f.id_fecha">\n          {{ f.fecha }}\n        </ion-select-option>\n      </ion-select>\n\n      <label>Horas disponibles</label>\n      <ion-select formControlName="id_hora" [disabled]="!opcionesHoras.length">\n        <ion-select-option *ngFor="let h of opcionesHoras" [value]="h.id_hora">\n          {{ h.hora }}\n        </ion-select-option>\n      </ion-select>\n\n\n      <label>Cantidad de entradas</label>\n      <ion-input type="number" min="1" formControlName="cantidad"></ion-input>\n\n      <ion-button expand="block" class="boton-finalizar" type="submit">\n        Finalizar compra - Via PayPal <ion-icon name="paypal-outline"></ion-icon>\n      </ion-button>\n    </form>\n  </div>\n</ion-content>', styles: ["/* src/app/components-user/compra/compra.page.css */\n.compra-container {\n  --background: #0f0f17;\n  color: white;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.compra-card {\n  background-color: #1b1c25;\n  padding: 2rem;\n  border-radius: 20px;\n  max-width: 500px;\n  width: 90%;\n  margin: 2rem auto;\n  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);\n}\nh2 {\n  font-size: 1.8rem;\n  margin-bottom: 1.5rem;\n  text-align: center;\n}\nlabel {\n  font-weight: bold;\n  margin-top: 1rem;\n  display: block;\n}\nion-select,\nion-input {\n  margin-top: 0.5rem;\n  margin-bottom: 1rem;\n  background-color: #2c2e3a;\n  --color: white;\n  --placeholder-color: #aaa;\n  border-radius: 10px;\n}\n.fechas {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  margin: 1rem 0;\n}\n.fecha-btn {\n  background-color: #2c2e3a;\n  color: white;\n  border: none;\n  border-radius: 15px;\n  padding: 8px 12px;\n  cursor: pointer;\n  transition: background-color 0.3s;\n}\n.fecha-btn.activa {\n  background-color: #7C3AED;\n}\n.fecha-btn:hover {\n  background-color: #5b2cba;\n}\n.metodos-pago {\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  margin: 1.5rem 0;\n}\n.metodos-pago img {\n  width: 100px;\n  height: 50px;\n  object-fit: contain;\n  cursor: pointer;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  border-radius: 8px;\n  padding: 5px;\n}\n.metodos-pago img:hover {\n  transform: scale(1.1);\n  box-shadow: 0 0 10px #7C3AED;\n}\n.metodos-pago img.seleccionado {\n  border: 2px solid #7C3AED;\n}\n.boton-finalizar {\n  --background:\n    linear-gradient(\n      90deg,\n      #7C3AED 0%,\n      #9333EA 100%);\n  --background-activated:\n    linear-gradient(\n      90deg,\n      #6D28D9 0%,\n      #7C3AED 100%);\n  --background-focused:\n    linear-gradient(\n      90deg,\n      #6D28D9 0%,\n      #7C3AED 100%);\n  --background-hover:\n    linear-gradient(\n      90deg,\n      #6D28D9 0%,\n      #7C3AED 100%);\n  --color: white;\n  --border-radius: 12px;\n  font-weight: bold;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  height: 48px;\n  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.6);\n  transition: transform 0.2s ease-in-out;\n}\n.boton-finalizar:active {\n  transform: scale(0.97);\n}\nion-button.boton-finalizar[disabled] {\n  opacity: 0.6;\n  background:\n    linear-gradient(\n      90deg,\n      #7C3AED 0%,\n      #9333EA 100%) !important;\n}\n@media (max-width: 768px) {\n  .compra-card,\n  .register-box,\n  .login-box,\n  .start-container,\n  .eventos-section .card {\n    width: 95% !important;\n    margin: auto;\n    font-size: 14px;\n  }\n  .eventos-section .fila-eventos {\n    flex-direction: column;\n    align-items: center;\n  }\n  .eventos-section .card img {\n    width: 100% !important;\n    height: auto;\n  }\n  ion-input,\n  ion-button,\n  .fecha-btn,\n  .boton-finalizar {\n    font-size: 14px;\n  }\n  h1,\n  h2,\n  h3 {\n    font-size: 18px !important;\n  }\n  .btn-ticket {\n    width: 90%;\n    margin: 8px auto;\n    padding: 10px;\n    font-size: 14px;\n  }\n}\n/*# sourceMappingURL=compra.page.css.map */\n"] }]
  }], () => [{ type: Router }, { type: FormBuilder }, { type: UsersService }, { type: PublicService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CompraPage, { className: "CompraPage", filePath: "src/app/components-user/compra/compra.page.ts", lineNumber: 39 });
})();
export {
  CompraPage
};
//# sourceMappingURL=compra.page-TFSJE6ZB.js.map
