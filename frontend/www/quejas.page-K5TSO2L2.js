import {
  UsersService
} from "./chunk-5NNU3S5F.js";
import {
  IonButton,
  IonContent,
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
  DefaultValueAccessor,
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

// src/app/components-user/quejas/quejas.page.ts
var _QuejasPage = class _QuejasPage {
  constructor(fb, usersService, router) {
    this.fb = fb;
    this.usersService = usersService;
    this.router = router;
    this.inconvenientesForm = this.fb.group({
      nombre_inconveniente: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      descripcion: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(500)]]
    });
  }
  // envía la queja al backend
  notificar() {
    if (this.inconvenientesForm.invalid) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }
    this.usersService.formularioInconvenientes(this.inconvenientesForm.value).subscribe({
      next: (resp) => {
        if (resp.status) {
          this.inconvenientesForm.reset();
          this.router.navigate(["/tabs-user/explorar"]);
          alert("Se ha notificado al administrador");
        } else {
          alert(resp.message || "No se pudo enviar tu inconveniente.");
        }
      },
      error: (err) => {
        console.error("Error al enviar:", err);
        alert("Hubo un problema al enviar el inconveniente");
      }
    });
  }
};
_QuejasPage.\u0275fac = function QuejasPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _QuejasPage)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(UsersService), \u0275\u0275directiveInject(Router));
};
_QuejasPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _QuejasPage, selectors: [["app-quejas"]], decls: 11, vars: 2, consts: [[1, "ion-padding", 3, "fullscreen"], [1, "form-container"], [3, "ngSubmit", "formGroup"], [1, "input-group"], ["type", "text", "formControlName", "nombre_inconveniente", "placeholder", "Asunto", 1, "input"], ["formControlName", "descripcion", "placeholder", "Descripci\xF3n del problema...", 1, "textarea"], ["expand", "block", "type", "submit"]], template: function QuejasPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 0)(1, "div", 1)(2, "h1");
    \u0275\u0275text(3, "Reportar un problema");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "form", 2);
    \u0275\u0275listener("ngSubmit", function QuejasPage_Template_form_ngSubmit_4_listener() {
      return ctx.notificar();
    });
    \u0275\u0275elementStart(5, "div", 3);
    \u0275\u0275element(6, "input", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 3);
    \u0275\u0275element(8, "textarea", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "ion-button", 6);
    \u0275\u0275text(10, "Enviar queja");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275property("fullscreen", true);
    \u0275\u0275advance(4);
    \u0275\u0275property("formGroup", ctx.inconvenientesForm);
  }
}, dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, IonicModule, IonButton, IonContent, ReactiveFormsModule, FormGroupDirective, FormControlName], styles: ["\n\nion-content[_ngcontent-%COMP%] {\n  --background:\n    linear-gradient(\n      to bottom,\n      #0f0f1a,\n      #1a1a2e);\n}\nion-toolbar[_ngcontent-%COMP%] {\n  --background: #0f0f1a;\n  --color: #ffffff;\n}\nion-title[_ngcontent-%COMP%] {\n  color: #ffffff;\n  font-weight: bold;\n}\n.form-container[_ngcontent-%COMP%] {\n  background-color: #1e1e2e;\n  padding: 28px;\n  border-radius: 16px;\n  max-width: 400px;\n  margin: 60px auto;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);\n}\n.form-container[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #ffffff;\n  margin-bottom: 32px;\n  font-size: 22px;\n}\n.input-group[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.input[_ngcontent-%COMP%], \n.textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  background-color: #2a2a3d;\n  border: none;\n  border-radius: 10px;\n  padding: 14px;\n  font-size: 15px;\n  color: #ffffff;\n  outline: none;\n}\n.input[_ngcontent-%COMP%]::placeholder, \n.textarea[_ngcontent-%COMP%]::placeholder {\n  color: #aaaaaa;\n}\nion-button[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  --background: #7C3AED;\n  --border-radius: 12px;\n  height: 44px;\n  font-weight: 600;\n}\n/*# sourceMappingURL=quejas.page.css.map */"] });
var QuejasPage = _QuejasPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QuejasPage, [{
    type: Component,
    args: [{ selector: "app-quejas", standalone: true, imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule], template: '\n\n<ion-content [fullscreen]="true" class="ion-padding">\n  <div class="form-container">\n    <h1>Reportar un problema</h1>\n    <form [formGroup]="inconvenientesForm" (ngSubmit)="notificar()">\n    <div class="input-group">\n      <input type="text" formControlName="nombre_inconveniente" placeholder="Asunto" class="input" />\n    </div>\n\n    <div class="input-group">\n      <textarea formControlName="descripcion" placeholder="Descripci\xF3n del problema..." class="textarea"></textarea>\n    </div>\n\n    <ion-button expand="block" type="submit">Enviar queja</ion-button>\n  </form>\n  </div>\n\n</ion-content>\n', styles: ["/* src/app/components-user/quejas/quejas.page.css */\nion-content {\n  --background:\n    linear-gradient(\n      to bottom,\n      #0f0f1a,\n      #1a1a2e);\n}\nion-toolbar {\n  --background: #0f0f1a;\n  --color: #ffffff;\n}\nion-title {\n  color: #ffffff;\n  font-weight: bold;\n}\n.form-container {\n  background-color: #1e1e2e;\n  padding: 28px;\n  border-radius: 16px;\n  max-width: 400px;\n  margin: 60px auto;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);\n}\n.form-container h1 {\n  text-align: center;\n  color: #ffffff;\n  margin-bottom: 32px;\n  font-size: 22px;\n}\n.input-group {\n  margin-bottom: 20px;\n}\n.input,\n.textarea {\n  width: 100%;\n  background-color: #2a2a3d;\n  border: none;\n  border-radius: 10px;\n  padding: 14px;\n  font-size: 15px;\n  color: #ffffff;\n  outline: none;\n}\n.input::placeholder,\n.textarea::placeholder {\n  color: #aaaaaa;\n}\nion-button {\n  margin-top: 10px;\n  --background: #7C3AED;\n  --border-radius: 12px;\n  height: 44px;\n  font-weight: 600;\n}\n/*# sourceMappingURL=quejas.page.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: UsersService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(QuejasPage, { className: "QuejasPage", filePath: "src/app/components-user/quejas/quejas.page.ts", lineNumber: 16 });
})();
export {
  QuejasPage
};
//# sourceMappingURL=quejas.page-K5TSO2L2.js.map
