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
  AuthService
} from "./chunk-53OPTF36.js";
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

// src/app/components-user/login/login.page.ts
var _LoginPage = class _LoginPage {
  constructor(fb, router, authService) {
    this.fb = fb;
    this.router = router;
    this.authService = authService;
    this.usuariosForm = this.fb.group({
      correo: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.minLength(6),
          Validators.maxLength(254),
          Validators.pattern(/^[a-zA-Z0-9._%+-]{2,64}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        ]
      ],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }
  // intenta iniciar sesión
  login() {
    if (!this.usuariosForm.valid) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }
    this.authService.login(this.usuariosForm.value).subscribe({
      next: (resp) => {
        if (resp?.status !== false && resp?.token) {
          const raw = resp.token;
          const token = Array.isArray(raw) ? raw.join(".") : raw;
          if (!token) {
            alert("Token vac\xEDo o inv\xE1lido.");
            return;
          }
          localStorage.setItem("token", token);
          if (resp.usuario) {
            localStorage.setItem("usuario", JSON.stringify(resp.usuario));
          }
          this.usuariosForm.reset();
          alert("Has iniciado sesi\xF3n correctamente");
          this.router.navigate(["/tabs-user/explorar"]);
        } else {
          alert(resp?.message || "Respuesta inesperada del servidor.");
        }
      },
      error: (err) => {
        console.error("Error al iniciar sesi\xF3n:", err);
        const backendMessage = err?.error?.message || "Error desconocido en el servidor.";
        alert(backendMessage);
      }
    });
  }
  // ir a registro
  irARegistro() {
    this.router.navigate(["/register"]);
  }
};
_LoginPage.\u0275fac = function LoginPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LoginPage)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(AuthService));
};
_LoginPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginPage, selectors: [["app-login"]], decls: 17, vars: 1, consts: [[1, "login-page"], [1, "login-wrapper"], [1, "login-box"], [1, "brand"], [3, "ngSubmit", "formGroup"], ["placeholder", "Correo electr\xF3nico...", "type", "email", "fill", "solid", "formControlName", "correo", 1, "login-input"], ["placeholder", "Contrase\xF1a...", "type", "password", "fill", "solid", "formControlName", "password", 1, "login-input"], ["expand", "block", "type", "submit", 1, "login-button"], [1, "texto-link-recuperar"], ["href", "/recuperar", 1, "texto-link"], [1, "texto-link"], [3, "click"]], template: function LoginPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 0)(1, "div", 1)(2, "div", 2)(3, "h1", 3);
    \u0275\u0275text(4, "TICKETMAGIC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "form", 4);
    \u0275\u0275listener("ngSubmit", function LoginPage_Template_form_ngSubmit_5_listener() {
      return ctx.login();
    });
    \u0275\u0275element(6, "ion-input", 5)(7, "ion-input", 6);
    \u0275\u0275elementStart(8, "ion-button", 7);
    \u0275\u0275text(9, "INICIAR SESI\xD3N");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "p", 8)(11, "a", 9);
    \u0275\u0275text(12, "\xBFOlvidaste tu contrase\xF1a?");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "p", 10);
    \u0275\u0275text(14, " \xBFNo tienes cuenta? ");
    \u0275\u0275elementStart(15, "a", 11);
    \u0275\u0275listener("click", function LoginPage_Template_a_click_15_listener() {
      return ctx.irARegistro();
    });
    \u0275\u0275text(16, "Crear cuenta");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(5);
    \u0275\u0275property("formGroup", ctx.usuariosForm);
  }
}, dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, NgControlStatus, NgControlStatusGroup, IonicModule, IonButton, IonContent, IonInput, TextValueAccessorDirective, ReactiveFormsModule, FormGroupDirective, FormControlName], styles: ['\n\n.login-page[_ngcontent-%COMP%] {\n  --background:\n    linear-gradient(\n      to bottom,\n      #0f0f0f,\n      #141629,\n      #1c1f35);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.login-wrapper[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100%;\n  padding: 2rem 1rem;\n}\n.login-box[_ngcontent-%COMP%] {\n  background: rgba(0, 0, 0, 0.6);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  padding: 2rem;\n  border-radius: 20px;\n  width: 100%;\n  max-width: 400px;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);\n  text-align: center;\n}\n.brand[_ngcontent-%COMP%] {\n  font-size: 1.8rem;\n  font-weight: 700;\n  color: white;\n  margin-bottom: 2rem;\n  letter-spacing: 1px;\n  position: relative;\n}\n.brand[_ngcontent-%COMP%]::before, \n.brand[_ngcontent-%COMP%]::after {\n  content: "";\n  display: block;\n  height: 2px;\n  background: transparent;\n  margin: 0 auto;\n}\n.login-input[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n  --background: rgba(255, 255, 255, 0.1);\n  --color: white;\n  --placeholder-color: #ccc;\n  --border-radius: 12px;\n}\n.login-button[_ngcontent-%COMP%] {\n  --background: #6d28d9;\n  --color: white;\n  font-weight: bold;\n  letter-spacing: 1px;\n  border-radius: 10px;\n  margin-top: 0.5rem;\n}\n.forgot-password[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  display: block;\n  color: #ccc;\n  font-size: 0.85rem;\n  text-decoration: none;\n}\n.forgot-password[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.texto-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #7c3aed;\n  font-weight: bold;\n  cursor: pointer;\n  text-decoration: none;\n}\n.texto-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.texto-link[_ngcontent-%COMP%] {\n  color: white;\n  font-size: 0.9rem;\n  text-align: center;\n  margin-top: 10px;\n}\n.texto-link-recuperar[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: white;\n  font-size: 0.9rem;\n  text-align: center;\n  margin-top: 10px;\n  text-decoration: none;\n}\n.texto-link-recuperar[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n@media (max-width: 768px) {\n  .compra-card[_ngcontent-%COMP%], \n   .register-box[_ngcontent-%COMP%], \n   .login-box[_ngcontent-%COMP%], \n   .start-container[_ngcontent-%COMP%], \n   .eventos-section[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {\n    width: 95% !important;\n    margin: auto;\n    font-size: 14px;\n  }\n  .eventos-section[_ngcontent-%COMP%]   .fila-eventos[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: center;\n  }\n  .eventos-section[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    width: 100% !important;\n    height: auto;\n  }\n  ion-input[_ngcontent-%COMP%], \n   ion-button[_ngcontent-%COMP%], \n   .fecha-btn[_ngcontent-%COMP%], \n   .boton-finalizar[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  h1[_ngcontent-%COMP%], \n   h2[_ngcontent-%COMP%], \n   h3[_ngcontent-%COMP%] {\n    font-size: 18px !important;\n  }\n  .btn-ticket[_ngcontent-%COMP%] {\n    width: 90%;\n    margin: 8px auto;\n    padding: 10px;\n    font-size: 14px;\n  }\n  .texto-link[_ngcontent-%COMP%] {\n    color: white;\n    font-size: 0.9rem;\n    text-align: center;\n    margin-top: 10px;\n  }\n  .texto-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    color: #7c3aed;\n    font-weight: bold;\n    cursor: pointer;\n    text-decoration: none;\n  }\n  .texto-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n    text-decoration: underline;\n  }\n  .texto-link-recuperar[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    color: white;\n    font-size: 0.9rem;\n    text-align: center;\n    margin-top: 10px;\n    text-decoration: none;\n  }\n  .texto-link-recuperar[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n    text-decoration: underline;\n  }\n}\n/*# sourceMappingURL=login.page.css.map */'] });
var LoginPage = _LoginPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginPage, [{
    type: Component,
    args: [{ selector: "app-login", standalone: true, imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule], template: '<ion-content class="login-page">\n  <div class="login-wrapper">\n    <div class="login-box">\n      <h1 class="brand">TICKETMAGIC</h1>\n      <form [formGroup]="usuariosForm" (ngSubmit)="login()">\n      <ion-input\n        class="login-input"\n        placeholder="Correo electr\xF3nico..."\n        type="email"\n        fill="solid"\n        formControlName="correo">\n      </ion-input>\n\n      <ion-input\n        class="login-input"\n        placeholder="Contrase\xF1a..."\n        type="password"\n        fill="solid"\n        formControlName="password">\n      </ion-input>\n      <ion-button expand="block" class="login-button" type="submit">INICIAR SESI\xD3N</ion-button>\n    </form>\n      <p class="texto-link-recuperar"><a class="texto-link" href="/recuperar">\xBFOlvidaste tu contrase\xF1a?</a></p>\n      <p class="texto-link">\n  \xBFNo tienes cuenta?\n  <a (click)="irARegistro()">Crear cuenta</a>\n</p>\n    </div>\n  </div>\n</ion-content>\n', styles: ['/* src/app/components-user/login/login.page.css */\n.login-page {\n  --background:\n    linear-gradient(\n      to bottom,\n      #0f0f0f,\n      #141629,\n      #1c1f35);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.login-wrapper {\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100%;\n  padding: 2rem 1rem;\n}\n.login-box {\n  background: rgba(0, 0, 0, 0.6);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  padding: 2rem;\n  border-radius: 20px;\n  width: 100%;\n  max-width: 400px;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);\n  text-align: center;\n}\n.brand {\n  font-size: 1.8rem;\n  font-weight: 700;\n  color: white;\n  margin-bottom: 2rem;\n  letter-spacing: 1px;\n  position: relative;\n}\n.brand::before,\n.brand::after {\n  content: "";\n  display: block;\n  height: 2px;\n  background: transparent;\n  margin: 0 auto;\n}\n.login-input {\n  margin-bottom: 1rem;\n  --background: rgba(255, 255, 255, 0.1);\n  --color: white;\n  --placeholder-color: #ccc;\n  --border-radius: 12px;\n}\n.login-button {\n  --background: #6d28d9;\n  --color: white;\n  font-weight: bold;\n  letter-spacing: 1px;\n  border-radius: 10px;\n  margin-top: 0.5rem;\n}\n.forgot-password {\n  margin-top: 1rem;\n  display: block;\n  color: #ccc;\n  font-size: 0.85rem;\n  text-decoration: none;\n}\n.forgot-password:hover {\n  text-decoration: underline;\n}\n.texto-link a {\n  color: #7c3aed;\n  font-weight: bold;\n  cursor: pointer;\n  text-decoration: none;\n}\n.texto-link a:hover {\n  text-decoration: underline;\n}\n.texto-link {\n  color: white;\n  font-size: 0.9rem;\n  text-align: center;\n  margin-top: 10px;\n}\n.texto-link-recuperar a {\n  color: white;\n  font-size: 0.9rem;\n  text-align: center;\n  margin-top: 10px;\n  text-decoration: none;\n}\n.texto-link-recuperar a:hover {\n  text-decoration: underline;\n}\n@media (max-width: 768px) {\n  .compra-card,\n  .register-box,\n  .login-box,\n  .start-container,\n  .eventos-section .card {\n    width: 95% !important;\n    margin: auto;\n    font-size: 14px;\n  }\n  .eventos-section .fila-eventos {\n    flex-direction: column;\n    align-items: center;\n  }\n  .eventos-section .card img {\n    width: 100% !important;\n    height: auto;\n  }\n  ion-input,\n  ion-button,\n  .fecha-btn,\n  .boton-finalizar {\n    font-size: 14px;\n  }\n  h1,\n  h2,\n  h3 {\n    font-size: 18px !important;\n  }\n  .btn-ticket {\n    width: 90%;\n    margin: 8px auto;\n    padding: 10px;\n    font-size: 14px;\n  }\n  .texto-link {\n    color: white;\n    font-size: 0.9rem;\n    text-align: center;\n    margin-top: 10px;\n  }\n  .texto-link a {\n    color: #7c3aed;\n    font-weight: bold;\n    cursor: pointer;\n    text-decoration: none;\n  }\n  .texto-link a:hover {\n    text-decoration: underline;\n  }\n  .texto-link-recuperar a {\n    color: white;\n    font-size: 0.9rem;\n    text-align: center;\n    margin-top: 10px;\n    text-decoration: none;\n  }\n  .texto-link-recuperar a:hover {\n    text-decoration: underline;\n  }\n}\n/*# sourceMappingURL=login.page.css.map */\n'] }]
  }], () => [{ type: FormBuilder }, { type: Router }, { type: AuthService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginPage, { className: "LoginPage", filePath: "src/app/components-user/login/login.page.ts", lineNumber: 16 });
})();
export {
  LoginPage
};
//# sourceMappingURL=login.page-GQZ6MLDI.js.map
