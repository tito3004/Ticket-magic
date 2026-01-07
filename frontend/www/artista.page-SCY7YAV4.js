import {
  AdminService
} from "./chunk-ZIS3HBWG.js";
import {
  IonButton,
  IonContent,
  IonInput,
  IonTextarea,
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

// src/app/components-admin/artista/artista.page.ts
var _ArtistaPage = class _ArtistaPage {
  constructor(fb, AdminService2, router) {
    this.fb = fb;
    this.AdminService = AdminService2;
    this.router = router;
    this.artistaForm = this.fb.group({
      nombre_artista: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      genero: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      tipo_artista: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(254)]]
    });
  }
  // guarda el artista si el formulario es válido
  guardarArtista() {
    if (this.artistaForm.valid) {
      this.AdminService.agregar_artista(this.artistaForm.value).subscribe((resp) => {
        if (resp.status) {
          this.artistaForm.reset();
          alert("Artista registrado");
          this.router.navigate(["/tabs-admin/calendario"]);
        } else {
          alert(resp.message);
        }
      }, (err) => {
        console.error("Error al registrase:", err);
        alert("Hubo un problema al procesar tu inicio de sesi\xF3n. Int\xE9ntalo nuevamente.");
      });
    } else {
      alert("Por favor, completa todos los campos correctamente.");
    }
  }
};
_ArtistaPage.\u0275fac = function ArtistaPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ArtistaPage)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AdminService), \u0275\u0275directiveInject(Router));
};
_ArtistaPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ArtistaPage, selectors: [["app-artista"]], decls: 11, vars: 1, consts: [[1, "fondo-gradiente"], [1, "formulario-centro"], [1, "form-card"], [1, "titulo"], [3, "ngSubmit", "formGroup"], ["label", "Nombre del artista", "labelPlacement", "floating", "fill", "outline", "formControlName", "nombre_artista"], ["label", "G\xE9nero musical", "labelPlacement", "floating", "fill", "outline", "formControlName", "genero"], ["label", "Descripci\xF3n", "labelPlacement", "floating", "fill", "outline", "autoGrow", "true", "formControlName", "tipo_artista"], ["expand", "block", "type", "submit"]], template: function ArtistaPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 0)(1, "div", 1)(2, "div", 2)(3, "h2", 3);
    \u0275\u0275text(4, "Registrar Artista");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "form", 4);
    \u0275\u0275listener("ngSubmit", function ArtistaPage_Template_form_ngSubmit_5_listener() {
      return ctx.guardarArtista();
    });
    \u0275\u0275element(6, "ion-input", 5)(7, "ion-input", 6)(8, "ion-textarea", 7);
    \u0275\u0275elementStart(9, "ion-button", 8);
    \u0275\u0275text(10, "GUARDAR");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(5);
    \u0275\u0275property("formGroup", ctx.artistaForm);
  }
}, dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, NgControlStatus, NgControlStatusGroup, IonicModule, IonButton, IonContent, IonInput, IonTextarea, TextValueAccessorDirective, ReactiveFormsModule, FormGroupDirective, FormControlName], styles: ["\n\n.fondo-gradiente[_ngcontent-%COMP%] {\n  --background: #0f0f0f;\n  background:\n    linear-gradient(\n      to bottom,\n      #0f0f0f,\n      #111127);\n  height: 100%;\n}\n.formulario-centro[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n  padding: 1rem;\n}\n.form-card[_ngcontent-%COMP%] {\n  background: #0f0f0f;\n  padding: 2rem;\n  border-radius: 1.5rem;\n  box-shadow: 0 0 30px rgba(124, 58, 237, 0.3);\n  width: 100%;\n  max-width: 400px;\n}\n.titulo[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 1.5rem;\n  color: white;\n  margin-bottom: 1.5rem;\n  font-weight: bold;\n}\nion-input[_ngcontent-%COMP%], \nion-textarea[_ngcontent-%COMP%] {\n  --background: #1a1a2e;\n  --color: white;\n  --border-radius: 0.5rem;\n  margin-bottom: 1rem;\n}\nion-button[_ngcontent-%COMP%] {\n  --background: #7c3aed;\n  --border-radius: 0.5rem;\n  --color: white;\n  font-weight: bold;\n}\n@media (max-width: 768px) {\n  .form-card[_ngcontent-%COMP%] {\n    padding: 1.5rem;\n    width: 100%;\n    max-width: 90%;\n  }\n}\n@media (max-width: 480px) {\n  .titulo[_ngcontent-%COMP%] {\n    font-size: 1.3rem;\n  }\n  ion-button[_ngcontent-%COMP%] {\n    font-size: 0.9rem;\n  }\n}\n[_nghost-%COMP%], \nion-app[_ngcontent-%COMP%], \nion-router-outlet[_ngcontent-%COMP%], \nion-page[_ngcontent-%COMP%] {\n  display: block;\n  height: 100%;\n}\nion-content[_ngcontent-%COMP%]::part(scroll) {\n  overflow-y: auto !important;\n  overscroll-behavior: contain;\n  min-height: 100%;\n}\nhtml[_ngcontent-%COMP%], \nbody[_ngcontent-%COMP%] {\n  overflow-y: auto !important;\n}\n.formulario-centro[_ngcontent-%COMP%], \n.form-card[_ngcontent-%COMP%] {\n  max-height: none !important;\n  height: auto !important;\n}\n/*# sourceMappingURL=formulario_base.css.map */"] });
var ArtistaPage = _ArtistaPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ArtistaPage, [{
    type: Component,
    args: [{ selector: "app-artista", standalone: true, imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule], template: '<ion-content class="fondo-gradiente">\n  <div class="formulario-centro">\n    <div class="form-card">\n      <h2 class="titulo">Registrar Artista</h2>\n      <form [formGroup]="artistaForm" (ngSubmit)="guardarArtista()">\n      <ion-input label="Nombre del artista" labelPlacement="floating" fill="outline" formControlName="nombre_artista"></ion-input>\n      <ion-input label="G\xE9nero musical" labelPlacement="floating" fill="outline" formControlName="genero"></ion-input>\n      <ion-textarea label="Descripci\xF3n" labelPlacement="floating" fill="outline" autoGrow="true" formControlName="tipo_artista"></ion-textarea>\n      <ion-button expand="block" type="submit">GUARDAR</ion-button>\n    </form>\n      \n    </div>\n  </div>\n</ion-content>\n', styles: ["/* src/assets/styles/formulario_base.css */\n.fondo-gradiente {\n  --background: #0f0f0f;\n  background:\n    linear-gradient(\n      to bottom,\n      #0f0f0f,\n      #111127);\n  height: 100%;\n}\n.formulario-centro {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n  padding: 1rem;\n}\n.form-card {\n  background: #0f0f0f;\n  padding: 2rem;\n  border-radius: 1.5rem;\n  box-shadow: 0 0 30px rgba(124, 58, 237, 0.3);\n  width: 100%;\n  max-width: 400px;\n}\n.titulo {\n  text-align: center;\n  font-size: 1.5rem;\n  color: white;\n  margin-bottom: 1.5rem;\n  font-weight: bold;\n}\nion-input,\nion-textarea {\n  --background: #1a1a2e;\n  --color: white;\n  --border-radius: 0.5rem;\n  margin-bottom: 1rem;\n}\nion-button {\n  --background: #7c3aed;\n  --border-radius: 0.5rem;\n  --color: white;\n  font-weight: bold;\n}\n@media (max-width: 768px) {\n  .form-card {\n    padding: 1.5rem;\n    width: 100%;\n    max-width: 90%;\n  }\n}\n@media (max-width: 480px) {\n  .titulo {\n    font-size: 1.3rem;\n  }\n  ion-button {\n    font-size: 0.9rem;\n  }\n}\n:host,\nion-app,\nion-router-outlet,\nion-page {\n  display: block;\n  height: 100%;\n}\nion-content::part(scroll) {\n  overflow-y: auto !important;\n  overscroll-behavior: contain;\n  min-height: 100%;\n}\nhtml,\nbody {\n  overflow-y: auto !important;\n}\n.formulario-centro,\n.form-card {\n  max-height: none !important;\n  height: auto !important;\n}\n/*# sourceMappingURL=formulario_base.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: AdminService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ArtistaPage, { className: "ArtistaPage", filePath: "src/app/components-admin/artista/artista.page.ts", lineNumber: 17 });
})();
export {
  ArtistaPage
};
//# sourceMappingURL=artista.page-SCY7YAV4.js.map
