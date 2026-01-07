import {
  AdminService
} from "./chunk-ZIS3HBWG.js";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonicModule,
  SelectValueAccessorDirective,
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
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
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

// src/app/components-admin/evento/evento.page.ts
function EventoPage_ion_select_option_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-select-option", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const a_r1 = ctx.$implicit;
    \u0275\u0275property("value", a_r1.nombre_artista);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", a_r1.nombre_artista, " ");
  }
}
function EventoPage_ion_select_option_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-select-option", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const l_r2 = ctx.$implicit;
    \u0275\u0275property("value", l_r2.nombre_lugar);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", l_r2.nombre_lugar, " ");
  }
}
function EventoPage_div_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small");
    \u0275\u0275text(2, "Sin imagen seleccionada");
    \u0275\u0275elementEnd()();
  }
}
function EventoPage_div_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "small");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Imagen: ", ctx_r2.imagenFile == null ? null : ctx_r2.imagenFile.name);
  }
}
var _EventoPage = class _EventoPage {
  constructor(fb, admin, router) {
    this.fb = fb;
    this.admin = admin;
    this.router = router;
    this.json_fechas = [];
    this.json_horas = [];
    this.json_lugar = [];
    this.lugaresDisponibles = [];
    this.artistasDisponibles = [];
    this.imagenFile = null;
    this.redirectAfterSave = "/tabs-admin/evento";
    this.saving = false;
    this.eventoForm = this.fb.group({
      nombre_evento: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      tipo_evento: ["", [Validators.required]],
      artista_sel: [null, [Validators.required]],
      descripcion: ["", [Validators.maxLength(800)]],
      lugares_sel: [[], [Validators.required]]
    });
    this.fechaForm = this.fb.group({
      inicio: ["", [Validators.required]],
      fin: ["", [Validators.required]]
    });
    this.horaForm = this.fb.group({
      hora: ["", [Validators.required]]
    });
  }
  // cargar catálogos
  ngOnInit() {
    this.admin.consultar_lugares().subscribe({
      next: (resp) => {
        this.lugaresDisponibles = resp?.value ?? [];
      },
      error: (e) => console.error("Error lugares:", e)
    });
    this.admin.consultar_artista().subscribe({
      next: (resp) => {
        this.artistasDisponibles = resp?.value ?? [];
      },
      error: (e) => console.error("Error artistas:", e)
    });
  }
  /* ===== Fechas ===== */
  // genera fechas entre inicio y fin (sin duplicados)
  agregarFechasDeRango() {
    if (this.fechaForm.invalid)
      return;
    const { inicio, fin } = this.fechaForm.value;
    const start = new Date(inicio);
    const end = new Date(fin);
    if (start > end) {
      alert("Rango de fechas inv\xE1lido");
      return;
    }
    const acc = [];
    const d = new Date(start);
    while (d <= end) {
      const iso = d.toISOString().slice(0, 10);
      if (!this.json_fechas.some((f) => f.fecha === iso))
        acc.push({ fecha: iso });
      d.setDate(d.getDate() + 1);
    }
    this.json_fechas.push(...acc);
    this.json_fechas.sort((a, b) => a.fecha.localeCompare(b.fecha));
    this.fechaForm.reset();
  }
  // limpia todas las fechas
  limpiarFechas() {
    this.json_fechas = [];
  }
  /* ===== Horas ===== */
  // agrega una hora (HH:mm) evitando duplicados
  agregarHora() {
    if (this.horaForm.invalid)
      return;
    const { hora } = this.horaForm.value;
    if (!this.json_horas.some((h) => h.hora === hora))
      this.json_horas.push({ hora });
    this.json_horas.sort((a, b) => a.hora.localeCompare(b.hora));
    this.horaForm.reset();
  }
  // limpia todas las horas
  limpiarHoras() {
    this.json_horas = [];
  }
  /* ===== Lugares ===== */
  // actualiza json_lugar según los seleccionados en el form
  onLugaresChange(nombres) {
    const set = new Set((nombres ?? []).map((v) => v.trim().toLowerCase()));
    this.json_lugar = this.lugaresDisponibles.filter((l) => set.has(l.nombre_lugar.trim().toLowerCase()));
  }
  /* ===== Imagen ===== */
  // toma el archivo seleccionado
  onFileChange(ev) {
    const input = ev.target;
    this.imagenFile = input.files?.[0] ?? null;
  }
  /* ===== Guardar ===== */
  // valida todo y envía el FormData al backend
  guardarEvento() {
    const sel = this.eventoForm.get("lugares_sel")?.value ?? [];
    this.onLugaresChange(sel);
    if (this.eventoForm.invalid || !this.json_fechas.length || !this.json_horas.length || !this.json_lugar.length || !this.imagenFile) {
      this.eventoForm.markAllAsTouched();
      alert("Completa todos los campos y agrega al menos una fecha, hora y lugar.");
      return;
    }
    if (this.saving)
      return;
    this.saving = true;
    const { nombre_evento, tipo_evento, artista_sel, descripcion } = this.eventoForm.value;
    const fd = new FormData();
    fd.append("nombre_evento", nombre_evento);
    fd.append("tipo_evento", tipo_evento);
    fd.append("nombre_artista", artista_sel);
    fd.append("descripcion", descripcion || "");
    fd.append("json_fechas", JSON.stringify(this.json_fechas.map((f) => f.fecha)));
    fd.append("json_horas", JSON.stringify(this.json_horas.map((h) => h.hora)));
    fd.append("json_lugar", JSON.stringify(this.json_lugar));
    fd.append("imagen", this.imagenFile, this.imagenFile.name);
    this.admin.agregar_evento(fd).subscribe({
      next: (resp) => {
        if (resp.status) {
          this.resetAll();
          alert("Evento registrado");
          this.router.navigate(["/tabs-admin/calendario"]);
        } else {
          alert(resp.message || "Error al registrar evento");
        }
      },
      error: (err) => {
        console.error("Error al registrar evento:", err);
        alert("Ocurri\xF3 un problema. Int\xE9ntalo nuevamente.");
      },
      complete: () => this.saving = false
    });
  }
  // contadores útiles para la UI
  get totalFechas() {
    return this.json_fechas.length;
  }
  get totalHoras() {
    return this.json_horas.length;
  }
  get totalLugares() {
    return this.json_lugar.length;
  }
  // resetea todo el estado del formulario
  resetAll() {
    this.eventoForm.reset({
      nombre_evento: "",
      tipo_evento: "",
      artista_sel: null,
      descripcion: "",
      lugares_sel: []
    });
    this.eventoForm.markAsPristine();
    this.eventoForm.markAsUntouched();
    this.fechaForm.reset();
    this.horaForm.reset();
    this.json_fechas = [];
    this.json_horas = [];
    this.json_lugar = [];
    this.imagenFile = null;
    window?.scrollTo?.({ top: 0, behavior: "smooth" });
  }
};
_EventoPage.\u0275fac = function EventoPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EventoPage)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AdminService), \u0275\u0275directiveInject(Router));
};
_EventoPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EventoPage, selectors: [["app-evento"]], decls: 57, vars: 16, consts: [[1, "fondo-gradiente"], [1, "formulario-centro"], [1, "form-card"], [1, "titulo"], [3, "formGroup"], ["label", "Nombre del evento", "labelPlacement", "floating", "fill", "outline", "formControlName", "nombre_evento", 1, "field"], ["label", "Tipo de evento", "labelPlacement", "floating", "fill", "outline", "formControlName", "tipo_evento", 1, "field"], ["label", "Artista", "labelPlacement", "floating", "fill", "outline", "formControlName", "artista_sel", 1, "field"], [3, "value", 4, "ngFor", "ngForOf"], ["label", "Lugar(es)", "labelPlacement", "floating", "fill", "outline", "formControlName", "lugares_sel", 1, "field", 3, "ionChange", "multiple"], ["label", "Descripci\xF3n", "labelPlacement", "floating", "fill", "outline", "autoGrow", "true", "formControlName", "descripcion", 1, "field"], [1, "grid-localidad", 3, "formGroup"], ["type", "date", "label", "Inicio", "labelPlacement", "stacked", "fill", "outline", "formControlName", "inicio"], ["type", "date", "label", "Fin", "labelPlacement", "stacked", "fill", "outline", "formControlName", "fin"], ["expand", "block", 3, "click", "disabled"], ["type", "time", "label", "Hora", "labelPlacement", "stacked", "fill", "outline", "formControlName", "hora"], ["type", "file", "accept", "image/*", 3, "change"], [1, "totales"], [4, "ngIf"], ["color", "medium", "fill", "outline", 3, "click", "disabled"], ["color", "medium", "fill", "outline", 2, "margin-left", "8px", 3, "click", "disabled"], [3, "value"]], template: function EventoPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 0)(1, "div", 1)(2, "div", 2)(3, "h2", 3);
    \u0275\u0275text(4, "Registrar Evento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "form", 4);
    \u0275\u0275element(6, "ion-input", 5)(7, "ion-input", 6);
    \u0275\u0275elementStart(8, "ion-select", 7);
    \u0275\u0275template(9, EventoPage_ion_select_option_9_Template, 2, 2, "ion-select-option", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "br");
    \u0275\u0275elementStart(11, "ion-select", 9);
    \u0275\u0275listener("ionChange", function EventoPage_Template_ion_select_ionChange_11_listener($event) {
      return ctx.onLugaresChange($event.detail.value);
    });
    \u0275\u0275template(12, EventoPage_ion_select_option_12_Template, 2, 2, "ion-select-option", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "br")(14, "ion-textarea", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "h2", 3);
    \u0275\u0275text(16, "Agregar fechas:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "form", 11);
    \u0275\u0275element(18, "ion-input", 12)(19, "ion-input", 13);
    \u0275\u0275elementStart(20, "ion-button", 14);
    \u0275\u0275listener("click", function EventoPage_Template_ion_button_click_20_listener() {
      return ctx.agregarFechasDeRango();
    });
    \u0275\u0275text(21, " Agregar fechas del rango ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "h2", 3);
    \u0275\u0275text(23, "Agregar horas:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "form", 11);
    \u0275\u0275element(25, "ion-input", 15);
    \u0275\u0275elementStart(26, "ion-button", 14);
    \u0275\u0275listener("click", function EventoPage_Template_ion_button_click_26_listener() {
      return ctx.agregarHora();
    });
    \u0275\u0275text(27, " Agregar hora ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "h2", 3);
    \u0275\u0275text(29, "Imagen del evento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "input", 16);
    \u0275\u0275listener("change", function EventoPage_Template_input_change_30_listener($event) {
      return ctx.onFileChange($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "ion-card")(32, "ion-card-header")(33, "ion-card-title");
    \u0275\u0275text(34, "Resumen");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "ion-card-content")(36, "div", 17)(37, "div");
    \u0275\u0275text(38, "Fechas: ");
    \u0275\u0275elementStart(39, "strong");
    \u0275\u0275text(40);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div");
    \u0275\u0275text(42, "Horas: ");
    \u0275\u0275elementStart(43, "strong");
    \u0275\u0275text(44);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div");
    \u0275\u0275text(46, "Lugares: ");
    \u0275\u0275elementStart(47, "strong");
    \u0275\u0275text(48);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(49, EventoPage_div_49_Template, 3, 0, "div", 18)(50, EventoPage_div_50_Template, 3, 1, "div", 18);
    \u0275\u0275elementStart(51, "ion-button", 19);
    \u0275\u0275listener("click", function EventoPage_Template_ion_button_click_51_listener() {
      return ctx.limpiarFechas();
    });
    \u0275\u0275text(52, " Limpiar fechas ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "ion-button", 20);
    \u0275\u0275listener("click", function EventoPage_Template_ion_button_click_53_listener() {
      return ctx.limpiarHoras();
    });
    \u0275\u0275text(54, " Limpiar horas ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(55, "ion-button", 14);
    \u0275\u0275listener("click", function EventoPage_Template_ion_button_click_55_listener() {
      return ctx.guardarEvento();
    });
    \u0275\u0275text(56, " GUARDAR ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(5);
    \u0275\u0275property("formGroup", ctx.eventoForm);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx.artistasDisponibles);
    \u0275\u0275advance(2);
    \u0275\u0275property("multiple", true);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx.lugaresDisponibles);
    \u0275\u0275advance(5);
    \u0275\u0275property("formGroup", ctx.fechaForm);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx.fechaForm.invalid);
    \u0275\u0275advance(4);
    \u0275\u0275property("formGroup", ctx.horaForm);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx.horaForm.invalid);
    \u0275\u0275advance(14);
    \u0275\u0275textInterpolate(ctx.totalFechas);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.totalHoras);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.totalLugares);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.imagenFile);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.imagenFile);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx.json_fechas.length);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx.json_horas.length);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx.saving || ctx.eventoForm.invalid || !ctx.json_fechas.length || !ctx.json_horas.length || !ctx.json_lugar.length || !ctx.imagenFile);
  }
}, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, \u0275NgNoValidate, NgControlStatus, NgControlStatusGroup, IonicModule, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonInput, IonSelect, IonSelectOption, IonTextarea, SelectValueAccessorDirective, TextValueAccessorDirective, ReactiveFormsModule, FormGroupDirective, FormControlName], styles: ["\n\n.fondo-gradiente[_ngcontent-%COMP%] {\n  --background: #0f0f0f;\n  background:\n    linear-gradient(\n      to bottom,\n      #0f0f0f,\n      #111127);\n  height: 100%;\n}\n.formulario-centro[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n  padding: 1rem;\n}\n.form-card[_ngcontent-%COMP%] {\n  background: #0f0f0f;\n  padding: 2rem;\n  border-radius: 1.5rem;\n  box-shadow: 0 0 30px rgba(124, 58, 237, 0.3);\n  width: 100%;\n  max-width: 400px;\n}\n.titulo[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 1.5rem;\n  color: white;\n  margin-bottom: 1.5rem;\n  font-weight: bold;\n}\nion-input[_ngcontent-%COMP%], \nion-textarea[_ngcontent-%COMP%] {\n  --background: #1a1a2e;\n  --color: white;\n  --border-radius: 0.5rem;\n  margin-bottom: 1rem;\n}\nion-button[_ngcontent-%COMP%] {\n  --background: #7c3aed;\n  --border-radius: 0.5rem;\n  --color: white;\n  font-weight: bold;\n}\n@media (max-width: 768px) {\n  .form-card[_ngcontent-%COMP%] {\n    padding: 1.5rem;\n    width: 100%;\n    max-width: 90%;\n  }\n}\n@media (max-width: 480px) {\n  .titulo[_ngcontent-%COMP%] {\n    font-size: 1.3rem;\n  }\n  ion-button[_ngcontent-%COMP%] {\n    font-size: 0.9rem;\n  }\n}\n[_nghost-%COMP%], \nion-app[_ngcontent-%COMP%], \nion-router-outlet[_ngcontent-%COMP%], \nion-page[_ngcontent-%COMP%] {\n  display: block;\n  height: 100%;\n}\nion-content[_ngcontent-%COMP%]::part(scroll) {\n  overflow-y: auto !important;\n  overscroll-behavior: contain;\n  min-height: 100%;\n}\nhtml[_ngcontent-%COMP%], \nbody[_ngcontent-%COMP%] {\n  overflow-y: auto !important;\n}\n.formulario-centro[_ngcontent-%COMP%], \n.form-card[_ngcontent-%COMP%] {\n  max-height: none !important;\n  height: auto !important;\n}\n/*# sourceMappingURL=formulario_base.css.map */"] });
var EventoPage = _EventoPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EventoPage, [{
    type: Component,
    args: [{ selector: "app-evento", standalone: true, imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule], template: '<ion-content class="fondo-gradiente">\n  <div class="formulario-centro">\n    <div class="form-card">\n      <h2 class="titulo">Registrar Evento</h2>\n\n      <form [formGroup]="eventoForm">\n        <ion-input label="Nombre del evento" labelPlacement="floating" fill="outline"\n          formControlName="nombre_evento" class="field"></ion-input>\n\n        <ion-input label="Tipo de evento" labelPlacement="floating" fill="outline"\n          formControlName="tipo_evento" class="field"></ion-input>\n\n        <ion-select label="Artista" labelPlacement="floating" fill="outline"\n          formControlName="artista_sel" class="field">\n          <ion-select-option *ngFor="let a of artistasDisponibles" [value]="a.nombre_artista">\n            {{ a.nombre_artista }}\n          </ion-select-option>\n        </ion-select>\n        <br>\n        <ion-select label="Lugar(es)" labelPlacement="floating" fill="outline" [multiple]="true"\n          formControlName="lugares_sel" (ionChange)="onLugaresChange($event.detail.value)" class="field">\n          <ion-select-option *ngFor="let l of lugaresDisponibles" [value]="l.nombre_lugar">\n            {{ l.nombre_lugar }}\n          </ion-select-option>\n        </ion-select>\n        <br>\n        <ion-textarea label="Descripci\xF3n" labelPlacement="floating" fill="outline" autoGrow="true"\n          formControlName="descripcion" class="field"></ion-textarea>\n      </form>\n\n      <h2 class="titulo">Agregar fechas:</h2>\n      <form [formGroup]="fechaForm" class="grid-localidad">\n        <ion-input type="date" label="Inicio" labelPlacement="stacked" fill="outline"\n          formControlName="inicio"></ion-input>\n        <ion-input type="date" label="Fin" labelPlacement="stacked" fill="outline" formControlName="fin"></ion-input>\n        <ion-button expand="block" (click)="agregarFechasDeRango()" [disabled]="fechaForm.invalid">\n          Agregar fechas del rango\n        </ion-button>\n      </form>\n\n      <h2 class="titulo">Agregar horas:</h2>\n      <form [formGroup]="horaForm" class="grid-localidad">\n        <ion-input type="time" label="Hora" labelPlacement="stacked" fill="outline" formControlName="hora"></ion-input>\n        <ion-button expand="block" (click)="agregarHora()" [disabled]="horaForm.invalid">\n          Agregar hora\n        </ion-button>\n      </form>\n\n      <h2 class="titulo">Imagen del evento</h2>\n      <input type="file" accept="image/*" (change)="onFileChange($event)" />\n\n      <ion-card>\n        <ion-card-header>\n          <ion-card-title>Resumen</ion-card-title>\n        </ion-card-header>\n        <ion-card-content>\n          <div class="totales">\n            <div>Fechas: <strong>{{ totalFechas }}</strong></div>\n            <div>Horas: <strong>{{ totalHoras }}</strong></div>\n            <div>Lugares: <strong>{{ totalLugares }}</strong></div>\n          </div>\n          <div *ngIf="!imagenFile"><small>Sin imagen seleccionada</small></div>\n          <div *ngIf="imagenFile"><small>Imagen: {{ imagenFile?.name }}</small></div>\n\n          <ion-button color="medium" fill="outline" (click)="limpiarFechas()" [disabled]="!json_fechas.length">\n            Limpiar fechas\n          </ion-button>\n          <ion-button color="medium" fill="outline" (click)="limpiarHoras()" [disabled]="!json_horas.length"\n            style="margin-left:8px">\n            Limpiar horas\n          </ion-button>\n        </ion-card-content>\n      </ion-card>\n\n      <ion-button expand="block" (click)="guardarEvento()"\n        [disabled]="saving || eventoForm.invalid || !json_fechas.length || !json_horas.length || !json_lugar.length || !imagenFile">\n        GUARDAR\n      </ion-button>\n    </div>\n  </div>\n</ion-content>\n', styles: ["/* src/assets/styles/formulario_base.css */\n.fondo-gradiente {\n  --background: #0f0f0f;\n  background:\n    linear-gradient(\n      to bottom,\n      #0f0f0f,\n      #111127);\n  height: 100%;\n}\n.formulario-centro {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n  padding: 1rem;\n}\n.form-card {\n  background: #0f0f0f;\n  padding: 2rem;\n  border-radius: 1.5rem;\n  box-shadow: 0 0 30px rgba(124, 58, 237, 0.3);\n  width: 100%;\n  max-width: 400px;\n}\n.titulo {\n  text-align: center;\n  font-size: 1.5rem;\n  color: white;\n  margin-bottom: 1.5rem;\n  font-weight: bold;\n}\nion-input,\nion-textarea {\n  --background: #1a1a2e;\n  --color: white;\n  --border-radius: 0.5rem;\n  margin-bottom: 1rem;\n}\nion-button {\n  --background: #7c3aed;\n  --border-radius: 0.5rem;\n  --color: white;\n  font-weight: bold;\n}\n@media (max-width: 768px) {\n  .form-card {\n    padding: 1.5rem;\n    width: 100%;\n    max-width: 90%;\n  }\n}\n@media (max-width: 480px) {\n  .titulo {\n    font-size: 1.3rem;\n  }\n  ion-button {\n    font-size: 0.9rem;\n  }\n}\n:host,\nion-app,\nion-router-outlet,\nion-page {\n  display: block;\n  height: 100%;\n}\nion-content::part(scroll) {\n  overflow-y: auto !important;\n  overscroll-behavior: contain;\n  min-height: 100%;\n}\nhtml,\nbody {\n  overflow-y: auto !important;\n}\n.formulario-centro,\n.form-card {\n  max-height: none !important;\n  height: auto !important;\n}\n/*# sourceMappingURL=formulario_base.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: AdminService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EventoPage, { className: "EventoPage", filePath: "src/app/components-admin/evento/evento.page.ts", lineNumber: 21 });
})();
export {
  EventoPage
};
//# sourceMappingURL=evento.page-5M4MZRX7.js.map
