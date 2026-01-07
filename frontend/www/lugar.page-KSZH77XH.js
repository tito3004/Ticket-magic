import {
  AdminService
} from "./chunk-ZIS3HBWG.js";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonicModule,
  NumericValueAccessorDirective,
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
import "./chunk-NISRFBUD.js";
import {
  CommonModule,
  Component,
  CurrencyPipe,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgIf,
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
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind4,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate4
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

// src/app/components-admin/lugar/lugar.page.ts
function LugarPage_ion_card_19_ion_item_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-item")(1, "ion-label")(2, "div")(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 21)(9, "div")(10, "strong");
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "small");
    \u0275\u0275text(14, "Subtotal");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const r_r2 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(r_r2.descripcion);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate4(" N\xFAmeros: #", r_r2.desde, " \u2013 #", r_r2.hasta, " \xB7 Cant: ", r_r2.cantidad, " \xB7 Precio: ", \u0275\u0275pipeBind4(7, 6, r_r2.precio, "USD", "symbol", "1.2-2"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(12, 11, r_r2.subtotal, "USD", "symbol", "1.2-2"));
  }
}
function LugarPage_ion_card_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ion-card")(1, "ion-card-header")(2, "ion-card-title");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ion-card-subtitle");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "ion-card-content")(7, "ion-list", 17);
    \u0275\u0275template(8, LugarPage_ion_card_19_ion_item_8_Template, 15, 16, "ion-item", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 19)(10, "div");
    \u0275\u0275text(11, "Total asientos: ");
    \u0275\u0275elementStart(12, "strong");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div");
    \u0275\u0275text(15, "Total estimado: ");
    \u0275\u0275elementStart(16, "strong");
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "currency");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "ion-button", 20);
    \u0275\u0275listener("click", function LugarPage_ion_card_19_Template_ion_button_click_19_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.limpiarAsientos());
    });
    \u0275\u0275text(20, " Limpiar lista ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Resumen de asientos (", ctx_r2.json_asientos.length, ")");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Pr\xF3ximo n\xFAmero: ", ctx_r2.siguienteNumeroPreview);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r2.resumenAsientos);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.json_asientos.length);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(18, 5, ctx_r2.totalEstimado, "USD", "symbol", "1.2-2"));
  }
}
var _LugarPage = class _LugarPage {
  constructor(fb, adminService, router) {
    this.fb = fb;
    this.adminService = adminService;
    this.router = router;
    this.json_asientos = [];
    this.redirectAfterSave = "/tabs-admin/evento";
    this.saving = false;
    this.lugarForm = this.fb.group({
      nombre_lugar: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      capacidad: [0, [Validators.required, Validators.min(0)]],
      nombre_pais: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      nombre_ciudad: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(80)]]
    });
    this.localidadForm = this.fb.group({
      descripcion: ["", [Validators.required, Validators.maxLength(120)]],
      cantidad: [null, [Validators.required, Validators.min(1), Validators.max(5e3)]],
      precio: [null, [Validators.required, Validators.min(0)]]
    });
  }
  // agrega una tanda de asientos consecutivos
  agregarLocalidad() {
    if (this.localidadForm.invalid)
      return;
    const { descripcion, cantidad, precio } = this.localidadForm.value;
    const start = this.siguienteNumero();
    const pad = this.padWidth;
    for (let i = 0; i < Number(cantidad); i++) {
      const numero = this.pad(start + i, pad);
      this.json_asientos.push({ numero, descripcion, precio: Number(precio) });
    }
    const capActual = Number(this.lugarForm.get("capacidad")?.value || 0);
    this.lugarForm.get("capacidad")?.setValue(capActual + Number(cantidad));
    this.localidadForm.reset();
    this.localidadForm.markAsPristine();
    this.localidadForm.markAsUntouched();
  }
  // quita un asiento
  eliminarAsiento(index) {
    this.json_asientos.splice(index, 1);
  }
  // limpia todos los asientos
  limpiarAsientos() {
    this.json_asientos = [];
  }
  // guarda el lugar con sus asientos
  guardarlugar() {
    if (this.lugarForm.invalid || !this.json_asientos.length || this.saving) {
      if (!this.json_asientos.length)
        alert("Genera al menos un asiento.");
      return;
    }
    this.saving = true;
    const payload = __spreadProps(__spreadValues({}, this.lugarForm.value), {
      json_asientos: this.json_asientos
    });
    this.adminService.agregar_lugar(payload).subscribe({
      next: (resp) => {
        if (resp.status) {
          this.resetFormularioCompleto();
          alert("Lugar registrado");
          this.router.navigate(["/tabs-admin/calendario"]);
        } else {
          alert(resp.message || "Error al agregar lugar");
        }
      },
      error: (err) => {
        console.error("Error al registrar lugar:", err);
        alert("Hubo un problema. Int\xE9ntalo nuevamente.");
      },
      complete: () => this.saving = false
    });
  }
  // resumen agrupado por (descripcion, precio)
  get resumenAsientos() {
    const grupos = /* @__PURE__ */ new Map();
    for (const a of this.json_asientos) {
      const key = `${a.descripcion}__${a.precio}`;
      const num = parseInt(a.numero, 10) || 0;
      if (!grupos.has(key)) {
        grupos.set(key, { descripcion: a.descripcion, precio: a.precio, cantidad: 0, nums: [] });
      }
      const g = grupos.get(key);
      g.cantidad += 1;
      g.nums.push(num);
    }
    const res = [];
    grupos.forEach((g) => {
      g.nums.sort((x, y) => x - y);
      const desde = g.nums[0] ?? 0;
      const hasta = g.nums[g.nums.length - 1] ?? 0;
      res.push({
        descripcion: g.descripcion,
        precio: g.precio,
        cantidad: g.cantidad,
        subtotal: g.cantidad * Number(g.precio),
        desde: this.pad(desde, this.padWidth),
        hasta: this.pad(hasta, this.padWidth)
      });
    });
    res.sort((a, b) => a.descripcion.localeCompare(b.descripcion));
    return res;
  }
  // deja todo limpio
  resetFormularioCompleto() {
    this.lugarForm.reset({
      nombre_lugar: "",
      capacidad: 0,
      nombre_pais: "",
      nombre_ciudad: ""
    });
    this.lugarForm.markAsPristine();
    this.lugarForm.markAsUntouched();
    this.localidadForm.reset();
    this.localidadForm.markAsPristine();
    this.localidadForm.markAsUntouched();
    this.json_asientos = [];
    try {
      window?.scrollTo?.({ top: 0, behavior: "smooth" });
    } catch {
    }
  }
  // calcula el siguiente número de asiento
  siguienteNumero() {
    if (!this.json_asientos.length)
      return 1;
    const max = Math.max(...this.json_asientos.map((a) => parseInt(a.numero, 10) || 0));
    return max + 1;
  }
  // ancho de padding para numeración (02, 03, 100, etc.)
  get padWidth() {
    const n = Math.max(this.json_asientos.length + 1, 99);
    return n >= 100 ? 3 : 2;
  }
  // agrega ceros a la izquierda
  pad(n, width = 2) {
    const s = String(n);
    return s.length >= width ? s : "0".repeat(width - s.length) + s;
  }
  // preview del próximo número
  get siguienteNumeroPreview() {
    return this.pad(this.siguienteNumero(), this.padWidth);
  }
  // suma de precios de todos los asientos
  get totalEstimado() {
    return this.json_asientos.reduce((acc, a) => acc + (Number(a.precio) || 0), 0);
  }
};
_LugarPage.\u0275fac = function LugarPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LugarPage)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AdminService), \u0275\u0275directiveInject(Router));
};
_LugarPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LugarPage, selectors: [["app-lugar"]], decls: 22, vars: 6, consts: [["scroll-y", "true", 1, "fondo-gradiente", 3, "fullscreen"], [1, "formulario-centro"], [1, "form-card"], [1, "titulo"], ["name", "location-outline", 2, "vertical-align", "middle", "margin-right", "8px"], [3, "ngSubmit", "formGroup"], ["label", "Nombre del lugar", "labelPlacement", "floating", "fill", "outline", "formControlName", "nombre_lugar"], ["label", "Capacidad total", "labelPlacement", "floating", "fill", "outline", "type", "number", "formControlName", "capacidad"], ["label", "Nombre del pa\xEDs", "labelPlacement", "floating", "fill", "outline", "formControlName", "nombre_pais"], ["label", "Nombre de la ciudad", "labelPlacement", "floating", "fill", "outline", "formControlName", "nombre_ciudad"], [1, "grid-localidad", 3, "formGroup"], ["label", "Descripci\xF3n (ej. Localidad VIP)", "labelPlacement", "floating", "fill", "outline", "formControlName", "descripcion"], ["label", "Cantidad", "labelPlacement", "floating", "fill", "outline", "type", "number", "formControlName", "cantidad"], ["label", "Precio", "labelPlacement", "floating", "fill", "outline", "type", "number", "formControlName", "precio"], ["expand", "block", 3, "click", "disabled"], [4, "ngIf"], ["expand", "block", "type", "submit", 3, "disabled"], ["lines", "full"], [4, "ngFor", "ngForOf"], [1, "totales"], ["color", "medium", "fill", "outline", "expand", "block", 3, "click"], ["slot", "end", 2, "text-align", "right"]], template: function LugarPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 0)(1, "div", 1)(2, "div", 2)(3, "h2", 3);
    \u0275\u0275element(4, "ion-icon", 4);
    \u0275\u0275text(5, " Registrar lugar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "form", 5);
    \u0275\u0275listener("ngSubmit", function LugarPage_Template_form_ngSubmit_6_listener() {
      return ctx.guardarlugar();
    });
    \u0275\u0275element(7, "ion-input", 6)(8, "ion-input", 7)(9, "ion-input", 8)(10, "ion-input", 9);
    \u0275\u0275elementStart(11, "h2", 3);
    \u0275\u0275text(12, " Agregar asientos ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 10);
    \u0275\u0275element(14, "ion-input", 11)(15, "ion-input", 12)(16, "ion-input", 13);
    \u0275\u0275elementStart(17, "ion-button", 14);
    \u0275\u0275listener("click", function LugarPage_Template_ion_button_click_17_listener() {
      return ctx.agregarLocalidad();
    });
    \u0275\u0275text(18, " Agregar asientos ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(19, LugarPage_ion_card_19_Template, 21, 10, "ion-card", 15);
    \u0275\u0275elementStart(20, "ion-button", 16);
    \u0275\u0275text(21, " GUARDAR ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    \u0275\u0275property("fullscreen", true);
    \u0275\u0275advance(6);
    \u0275\u0275property("formGroup", ctx.lugarForm);
    \u0275\u0275advance(7);
    \u0275\u0275property("formGroup", ctx.localidadForm);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx.localidadForm.invalid);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx.json_asientos.length);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.lugarForm.invalid || !ctx.json_asientos.length);
  }
}, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, \u0275NgNoValidate, NgControlStatus, NgControlStatusGroup, IonicModule, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, NumericValueAccessorDirective, TextValueAccessorDirective, ReactiveFormsModule, FormGroupDirective, FormControlName, CurrencyPipe], styles: ["\n\n.fondo-gradiente[_ngcontent-%COMP%] {\n  --background: #0f0f0f;\n  background:\n    linear-gradient(\n      to bottom,\n      #0f0f0f,\n      #111127);\n  height: 100%;\n}\n.formulario-centro[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n  padding: 1rem;\n}\n.form-card[_ngcontent-%COMP%] {\n  background: #0f0f0f;\n  padding: 2rem;\n  border-radius: 1.5rem;\n  box-shadow: 0 0 30px rgba(124, 58, 237, 0.3);\n  width: 100%;\n  max-width: 400px;\n}\n.titulo[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 1.5rem;\n  color: white;\n  margin-bottom: 1.5rem;\n  font-weight: bold;\n}\nion-input[_ngcontent-%COMP%], \nion-textarea[_ngcontent-%COMP%] {\n  --background: #1a1a2e;\n  --color: white;\n  --border-radius: 0.5rem;\n  margin-bottom: 1rem;\n}\nion-button[_ngcontent-%COMP%] {\n  --background: #7c3aed;\n  --border-radius: 0.5rem;\n  --color: white;\n  font-weight: bold;\n}\n@media (max-width: 768px) {\n  .form-card[_ngcontent-%COMP%] {\n    padding: 1.5rem;\n    width: 100%;\n    max-width: 90%;\n  }\n}\n@media (max-width: 480px) {\n  .titulo[_ngcontent-%COMP%] {\n    font-size: 1.3rem;\n  }\n  ion-button[_ngcontent-%COMP%] {\n    font-size: 0.9rem;\n  }\n}\n[_nghost-%COMP%], \nion-app[_ngcontent-%COMP%], \nion-router-outlet[_ngcontent-%COMP%], \nion-page[_ngcontent-%COMP%] {\n  display: block;\n  height: 100%;\n}\nion-content[_ngcontent-%COMP%]::part(scroll) {\n  overflow-y: auto !important;\n  overscroll-behavior: contain;\n  min-height: 100%;\n}\nhtml[_ngcontent-%COMP%], \nbody[_ngcontent-%COMP%] {\n  overflow-y: auto !important;\n}\n.formulario-centro[_ngcontent-%COMP%], \n.form-card[_ngcontent-%COMP%] {\n  max-height: none !important;\n  height: auto !important;\n}\n/*# sourceMappingURL=formulario_base.css.map */"] });
var LugarPage = _LugarPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LugarPage, [{
    type: Component,
    args: [{ selector: "app-lugar", standalone: true, imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule], template: `

<ion-content [fullscreen]="true" scroll-y="true"class="fondo-gradiente">
  <div class="formulario-centro">
    <div class="form-card">
      <h2 class="titulo">
        <ion-icon name="location-outline" style="vertical-align:middle; margin-right:8px;"></ion-icon>
        Registrar lugar
      </h2>

      <form [formGroup]="lugarForm" (ngSubmit)="guardarlugar()">

        <!-- Datos del lugar -->
        <ion-input label="Nombre del lugar" labelPlacement="floating" fill="outline"
          formControlName="nombre_lugar"></ion-input>

        <ion-input label="Capacidad total" labelPlacement="floating" fill="outline" type="number"
          formControlName="capacidad"></ion-input>

        <ion-input label="Nombre del pa\xEDs" labelPlacement="floating" fill="outline"
          formControlName="nombre_pais"></ion-input>

        <ion-input label="Nombre de la ciudad" labelPlacement="floating" fill="outline"
          formControlName="nombre_ciudad"></ion-input>

        <!-- Generador de asientos -->
        <h2 class="titulo">

          Agregar asientos
        </h2>

        <div [formGroup]="localidadForm" class="grid-localidad">
          <ion-input label="Descripci\xF3n (ej. Localidad VIP)" labelPlacement="floating" fill="outline"
            formControlName="descripcion"></ion-input>

          <ion-input label="Cantidad" labelPlacement="floating" fill="outline" type="number"
            formControlName="cantidad"></ion-input>

          <ion-input label="Precio" labelPlacement="floating" fill="outline" type="number"
            formControlName="precio"></ion-input>

          <ion-button expand="block" (click)="agregarLocalidad()" [disabled]="localidadForm.invalid">
            Agregar asientos
          </ion-button>
        </div>

        <!-- Resumen generado -->
        <ion-card *ngIf="json_asientos.length">
          <ion-card-header>
            <ion-card-title>Resumen de asientos ({{ json_asientos.length }})</ion-card-title>
            <ion-card-subtitle>Pr\xF3ximo n\xFAmero: {{ siguienteNumeroPreview }}</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            <ion-list lines="full">
              <ion-item *ngFor="let r of resumenAsientos">
                <ion-label>
                  <div><strong>{{ r.descripcion }}</strong></div>
                  <small>
                    N\xFAmeros: #{{ r.desde }} \u2013 #{{ r.hasta }} \xB7
                    Cant: {{ r.cantidad }} \xB7
                    Precio: {{ r.precio | currency:'USD':'symbol':'1.2-2' }}
                  </small>
                </ion-label>
                <div slot="end" style="text-align:right;">
                  <div><strong>{{ r.subtotal | currency:'USD':'symbol':'1.2-2' }}</strong></div>
                  <small>Subtotal</small>
                </div>
              </ion-item>
            </ion-list>

            <div class="totales">
              <div>Total asientos: <strong>{{ json_asientos.length }}</strong></div>
              <div>Total estimado: <strong>{{ totalEstimado | currency:'USD':'symbol':'1.2-2' }}</strong></div>
            </div>

            <ion-button color="medium" fill="outline" (click)="limpiarAsientos()" expand="block">
              Limpiar lista
            </ion-button>
          </ion-card-content>
        </ion-card>

        <ion-button expand="block" type="submit" [disabled]="lugarForm.invalid || !json_asientos.length">
          GUARDAR
        </ion-button>
      </form>
    </div>
  </div>
</ion-content>`, styles: ["/* src/assets/styles/formulario_base.css */\n.fondo-gradiente {\n  --background: #0f0f0f;\n  background:\n    linear-gradient(\n      to bottom,\n      #0f0f0f,\n      #111127);\n  height: 100%;\n}\n.formulario-centro {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n  padding: 1rem;\n}\n.form-card {\n  background: #0f0f0f;\n  padding: 2rem;\n  border-radius: 1.5rem;\n  box-shadow: 0 0 30px rgba(124, 58, 237, 0.3);\n  width: 100%;\n  max-width: 400px;\n}\n.titulo {\n  text-align: center;\n  font-size: 1.5rem;\n  color: white;\n  margin-bottom: 1.5rem;\n  font-weight: bold;\n}\nion-input,\nion-textarea {\n  --background: #1a1a2e;\n  --color: white;\n  --border-radius: 0.5rem;\n  margin-bottom: 1rem;\n}\nion-button {\n  --background: #7c3aed;\n  --border-radius: 0.5rem;\n  --color: white;\n  font-weight: bold;\n}\n@media (max-width: 768px) {\n  .form-card {\n    padding: 1.5rem;\n    width: 100%;\n    max-width: 90%;\n  }\n}\n@media (max-width: 480px) {\n  .titulo {\n    font-size: 1.3rem;\n  }\n  ion-button {\n    font-size: 0.9rem;\n  }\n}\n:host,\nion-app,\nion-router-outlet,\nion-page {\n  display: block;\n  height: 100%;\n}\nion-content::part(scroll) {\n  overflow-y: auto !important;\n  overscroll-behavior: contain;\n  min-height: 100%;\n}\nhtml,\nbody {\n  overflow-y: auto !important;\n}\n.formulario-centro,\n.form-card {\n  max-height: none !important;\n  height: auto !important;\n}\n/*# sourceMappingURL=formulario_base.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: AdminService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LugarPage, { className: "LugarPage", filePath: "src/app/components-admin/lugar/lugar.page.ts", lineNumber: 18 });
})();
export {
  LugarPage
};
//# sourceMappingURL=lugar.page-KSZH77XH.js.map
