import {
  UsersService
} from "./chunk-5NNU3S5F.js";
import {
  IonButton,
  IonContent,
  IonInput,
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
  CommonModule,
  Component,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  HttpClientModule,
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

// src/app/components-user/register/register.page.ts
var _RegisterPage = class _RegisterPage {
  constructor(fb, UsersService2, router) {
    this.fb = fb;
    this.UsersService = UsersService2;
    this.router = router;
    this.usuariosForm = this.fb.group({
      nombres: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)]],
      apellidos: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)]],
      correo: ["", [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(254), Validators.pattern(/^[a-zA-Z0-9._%+-]{2,64}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      cedula: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]{10}$/)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmarpassword: ["", [Validators.required, Validators.minLength(6)]]
    });
  }
  // envía el registro si todo está OK
  registrarUsuario() {
    if (this.usuariosForm.get("confirmarpassword")?.value != this.usuariosForm.get("password")?.value) {
      alert("Las contrase\xF1as tienen que coincidir");
    } else if (this.usuariosForm.valid) {
      this.UsersService.register(this.usuariosForm.value).subscribe((resp) => {
        if (resp.status) {
          this.usuariosForm.reset();
          alert("Usuario registrado");
          this.router.navigate(["/", "login"]);
        } else {
          alert(resp.message);
        }
      }, (err) => {
        console.error("Error al registrase:", err);
        alert("Hubo un problema al procesar tu inicio de sesi\xF3n. Por favor, int\xE9ntalo nuevamente.");
      });
    } else {
      alert("Por favor, completa todos los campos correctamente.");
    }
  }
};
_RegisterPage.\u0275fac = function RegisterPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _RegisterPage)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(UsersService), \u0275\u0275directiveInject(Router));
};
_RegisterPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegisterPage, selectors: [["app-register"]], decls: 18, vars: 1, consts: [[1, "register-page"], [1, "register-wrapper"], [1, "register-box"], [1, "brand"], [1, "register-form", 3, "ngSubmit", "formGroup"], ["placeholder", "Nombres completos", "type", "text", "fill", "solid", "formControlName", "nombres", 1, "register-input"], ["placeholder", "Apellidos completos", "type", "text", "fill", "solid", "formControlName", "apellidos", 1, "register-input"], ["placeholder", "Correo electr\xF3nico", "type", "email", "fill", "solid", "formControlName", "correo", 1, "register-input"], ["placeholder", "C\xE9dula", "type", "text", "fill", "solid", "formControlName", "cedula", 1, "register-input"], ["placeholder", "Contrase\xF1a", "type", "password", "fill", "solid", "formControlName", "password", 1, "register-input"], ["placeholder", "Confirmar contrase\xF1a", "type", "password", "fill", "solid", "formControlName", "confirmarpassword", "name", "confirmarpassword", 1, "register-input"], ["expand", "block", "type", "submit", 1, "register-button"], [1, "texto-link"], ["href", "/login", 1, "texto-link"]], template: function RegisterPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 0)(1, "div", 1)(2, "div", 2)(3, "h1", 3);
    \u0275\u0275text(4, "REGISTRO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "form", 4);
    \u0275\u0275listener("ngSubmit", function RegisterPage_Template_form_ngSubmit_5_listener() {
      return ctx.registrarUsuario();
    });
    \u0275\u0275element(6, "ion-input", 5)(7, "ion-input", 6)(8, "ion-input", 7)(9, "ion-input", 8)(10, "ion-input", 9)(11, "ion-input", 10);
    \u0275\u0275elementStart(12, "ion-button", 11);
    \u0275\u0275text(13, "Registrarse");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "p", 12);
    \u0275\u0275text(15, "\xBFYa tienes una cuenta? ");
    \u0275\u0275elementStart(16, "a", 13);
    \u0275\u0275text(17, " Inicia sesi\xF3n");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(5);
    \u0275\u0275property("formGroup", ctx.usuariosForm);
  }
}, dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, NgControlStatus, NgControlStatusGroup, IonicModule, IonButton, IonContent, IonInput, TextValueAccessorDirective, ReactiveFormsModule, FormGroupDirective, FormControlName, HttpClientModule], styles: ["\n\n.register-page[_ngcontent-%COMP%] {\n  --background:\n    linear-gradient(\n      to bottom,\n      #0f0f0f,\n      #141629,\n      #1c1f35);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.register-wrapper[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100%;\n  padding: 2rem 1rem;\n}\n.register-box[_ngcontent-%COMP%] {\n  background: rgba(0, 0, 0, 0.6);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  padding: 2rem;\n  border-radius: 20px;\n  width: 100%;\n  max-width: 400px;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);\n  text-align: center;\n}\n.brand[_ngcontent-%COMP%] {\n  font-size: 1.8rem;\n  font-weight: 700;\n  color: white;\n  margin-bottom: 2rem;\n  letter-spacing: 1px;\n  position: relative;\n}\n.register-input[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n  --background: rgba(255, 255, 255, 0.1);\n  --color: white;\n  --placeholder-color: #ccc;\n  --border-radius: 12px;\n}\n.register-button[_ngcontent-%COMP%] {\n  --background: #6d28d9;\n  --color: white;\n  font-weight: bold;\n  letter-spacing: 1px;\n  border-radius: 10px;\n  margin-top: 0.5rem;\n}\n.texto-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #7c3aed;\n  font-weight: bold;\n  cursor: pointer;\n  text-decoration: none;\n}\n.texto-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.texto-link[_ngcontent-%COMP%] {\n  color: white;\n  font-size: 0.9rem;\n  text-align: center;\n  margin-top: 10px;\n}\n@media (max-width: 768px) {\n  .compra-card[_ngcontent-%COMP%], \n   .register-box[_ngcontent-%COMP%], \n   .login-box[_ngcontent-%COMP%], \n   .start-container[_ngcontent-%COMP%], \n   .eventos-section[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {\n    width: 95% !important;\n    margin: auto;\n    font-size: 14px;\n  }\n  .eventos-section[_ngcontent-%COMP%]   .fila-eventos[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: center;\n  }\n  .eventos-section[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    width: 100% !important;\n    height: auto;\n  }\n  ion-input[_ngcontent-%COMP%], \n   ion-button[_ngcontent-%COMP%], \n   .fecha-btn[_ngcontent-%COMP%], \n   .boton-finalizar[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  h1[_ngcontent-%COMP%], \n   h2[_ngcontent-%COMP%], \n   h3[_ngcontent-%COMP%] {\n    font-size: 18px !important;\n  }\n  .btn-ticket[_ngcontent-%COMP%] {\n    width: 90%;\n    margin: 8px auto;\n    padding: 10px;\n    font-size: 14px;\n  }\n}\n/*# sourceMappingURL=register.page.css.map */"] });
var RegisterPage = _RegisterPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RegisterPage, [{
    type: Component,
    args: [{ selector: "app-register", standalone: true, imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule, HttpClientModule], template: '<ion-content class="register-page">\n  <div class="register-wrapper">\n    <div class="register-box">\n      <h1 class="brand">REGISTRO</h1>\n      <form [formGroup]="usuariosForm" (ngSubmit)="registrarUsuario()" class="register-form">\n        <ion-input class="register-input" placeholder="Nombres completos" type="text" fill="solid"\n          formControlName="nombres"></ion-input>\n        <ion-input class="register-input" placeholder="Apellidos completos" type="text" fill="solid"\n          formControlName="apellidos"></ion-input>\n        <ion-input class="register-input" placeholder="Correo electr\xF3nico" type="email" fill="solid"\n          formControlName="correo"></ion-input>\n        <ion-input class="register-input" placeholder="C\xE9dula" type="text" fill="solid"\n          formControlName="cedula"></ion-input>\n        <ion-input class="register-input" placeholder="Contrase\xF1a" type="password" fill="solid"\n          formControlName="password"></ion-input>\n\n        <ion-input class="register-input" placeholder="Confirmar contrase\xF1a" type="password" fill="solid"\n          formControlName="confirmarpassword" name="confirmarpassword"></ion-input>\n\n        <ion-button expand="block" class="register-button" type="submit">Registrarse</ion-button>\n      </form>\n      <p class="texto-link">\xBFYa tienes una cuenta?\n        <a class="texto-link" href="/login"> Inicia sesi\xF3n</a>\n      </p>\n    </div>\n  </div>\n</ion-content>', styles: ["/* src/app/components-user/register/register.page.css */\n.register-page {\n  --background:\n    linear-gradient(\n      to bottom,\n      #0f0f0f,\n      #141629,\n      #1c1f35);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.register-wrapper {\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100%;\n  padding: 2rem 1rem;\n}\n.register-box {\n  background: rgba(0, 0, 0, 0.6);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  padding: 2rem;\n  border-radius: 20px;\n  width: 100%;\n  max-width: 400px;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);\n  text-align: center;\n}\n.brand {\n  font-size: 1.8rem;\n  font-weight: 700;\n  color: white;\n  margin-bottom: 2rem;\n  letter-spacing: 1px;\n  position: relative;\n}\n.register-input {\n  margin-bottom: 1rem;\n  --background: rgba(255, 255, 255, 0.1);\n  --color: white;\n  --placeholder-color: #ccc;\n  --border-radius: 12px;\n}\n.register-button {\n  --background: #6d28d9;\n  --color: white;\n  font-weight: bold;\n  letter-spacing: 1px;\n  border-radius: 10px;\n  margin-top: 0.5rem;\n}\n.texto-link a {\n  color: #7c3aed;\n  font-weight: bold;\n  cursor: pointer;\n  text-decoration: none;\n}\n.texto-link a:hover {\n  text-decoration: underline;\n}\n.texto-link {\n  color: white;\n  font-size: 0.9rem;\n  text-align: center;\n  margin-top: 10px;\n}\n@media (max-width: 768px) {\n  .compra-card,\n  .register-box,\n  .login-box,\n  .start-container,\n  .eventos-section .card {\n    width: 95% !important;\n    margin: auto;\n    font-size: 14px;\n  }\n  .eventos-section .fila-eventos {\n    flex-direction: column;\n    align-items: center;\n  }\n  .eventos-section .card img {\n    width: 100% !important;\n    height: auto;\n  }\n  ion-input,\n  ion-button,\n  .fecha-btn,\n  .boton-finalizar {\n    font-size: 14px;\n  }\n  h1,\n  h2,\n  h3 {\n    font-size: 18px !important;\n  }\n  .btn-ticket {\n    width: 90%;\n    margin: 8px auto;\n    padding: 10px;\n    font-size: 14px;\n  }\n}\n/*# sourceMappingURL=register.page.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: UsersService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegisterPage, { className: "RegisterPage", filePath: "src/app/components-user/register/register.page.ts", lineNumber: 18 });
})();
export {
  RegisterPage
};
//# sourceMappingURL=register.page-BMUFICYR.js.map
