import {
  PublicService
} from "./chunk-HBGVP364.js";
import {
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
import "./chunk-NISRFBUD.js";
import {
  CommonModule,
  Component,
  FormsModule,
  NgForOf,
  NgIf,
  Router,
  setClassMetadata,
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
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
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

// src/app/components-user/explorar/explorar.page.ts
function ExplorarPage_div_7_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 13);
  }
}
function ExplorarPage_div_7_h3_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const lugar_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(lugar_r3);
  }
}
function ExplorarPage_div_7_p_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, " Fechas disponibles: ");
    \u0275\u0275elementEnd();
  }
}
function ExplorarPage_div_7_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const fecha_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", fecha_r4, " ");
  }
}
function ExplorarPage_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 7)(2, "img", 8);
    \u0275\u0275listener("error", function ExplorarPage_div_7_Template_img_error_2_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onImageError($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "div", 9)(4, "h3");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "br");
    \u0275\u0275template(7, ExplorarPage_div_7_div_7_Template, 1, 0, "div", 10)(8, ExplorarPage_div_7_h3_8_Template, 2, 1, "h3", 11);
    \u0275\u0275element(9, "br");
    \u0275\u0275template(10, ExplorarPage_div_7_p_10_Template, 2, 0, "p", 12);
    \u0275\u0275elementStart(11, "div", 13);
    \u0275\u0275template(12, ExplorarPage_div_7_div_12_Template, 2, 1, "div", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 14);
    \u0275\u0275listener("click", function ExplorarPage_div_7_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.irACompra());
    });
    \u0275\u0275text(14, "COMPRAR TICKET");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const evento_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("src", "http://localhost:3000/sistema_reserva/public/images/" + evento_r5.imagen_nombre, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(evento_r5.nombre_evento);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.lugarPorEvento[evento_r5.id_evento] == null ? null : ctx_r1.lugarPorEvento[evento_r5.id_evento].length);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.lugarPorEvento[evento_r5.id_evento]);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.fechasPorEvento[evento_r5.id_evento] == null ? null : ctx_r1.fechasPorEvento[evento_r5.id_evento].length);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.fechasPorEvento[evento_r5.id_evento]);
  }
}
var _ExplorarPage = class _ExplorarPage {
  constructor(router, PublicService2) {
    this.router = router;
    this.PublicService = PublicService2;
    this.eventos = [];
    this.fechasPorEvento = {};
    this.lugarPorEvento = {};
  }
  ngOnInit() {
    this.PublicService.consulta_eventos().subscribe((resp) => {
      const eventos = resp.value;
      const eventosUnicos = eventos.filter((evento, index, self) => index === self.findIndex((e) => e.id_evento === evento.id_evento));
      localStorage.setItem("Eventos", JSON.stringify(eventosUnicos));
      const fechasPorEvento = {};
      const lugarPorEvento = {};
      eventos.forEach((evento) => {
        const id = evento.id_evento;
        const fecha = evento.fecha;
        const lugar = evento.nombre_lugar;
        if (!fechasPorEvento[id])
          fechasPorEvento[id] = [];
        if (!lugarPorEvento[id])
          lugarPorEvento[id] = [];
        if (!fechasPorEvento[id].includes(fecha))
          fechasPorEvento[id].push(fecha);
        if (!lugarPorEvento[id].includes(lugar))
          lugarPorEvento[id].push(lugar);
      });
      this.eventos = eventosUnicos;
      this.fechasPorEvento = fechasPorEvento;
      this.lugarPorEvento = lugarPorEvento;
    });
  }
  // Imagen por defecto si falla la original
  onImageError(event) {
    event.target.src = "assets/images/error.jpg";
  }
  // Ir a página de compra
  irACompra() {
    this.router.navigate(["/tabs-user/compra"]);
  }
};
_ExplorarPage.\u0275fac = function ExplorarPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ExplorarPage)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(PublicService));
};
_ExplorarPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ExplorarPage, selectors: [["app-explorar"]], decls: 8, vars: 1, consts: [[1, "main-content"], [1, "titulo"], [1, "eventos-section"], [1, "section-title"], [1, "fila-eventos"], ["class", "card", 4, "ngFor", "ngForOf"], [1, "card"], [1, "imagen-container"], ["alt", "Imagen del evento", 3, "error", "src"], [1, "info"], ["class", "fechas-lista", 4, "ngIf"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "fechas-lista"], [1, "btn-ticket", 3, "click"]], template: function ExplorarPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 0)(1, "h1", 1);
    \u0275\u0275text(2, "TICKETMAGIC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "section", 2)(4, "h2", 3);
    \u0275\u0275text(5, "Eventos disponibles");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 4);
    \u0275\u0275template(7, ExplorarPage_div_7_Template, 15, 6, "div", 5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(7);
    \u0275\u0275property("ngForOf", ctx.eventos);
  }
}, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, IonicModule, IonContent], styles: ["\n\n.main-content[_ngcontent-%COMP%] {\n  --background: #0f0f17;\n  color: white;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.titulo[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: bold;\n  text-align: center;\n  color: white;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  margin: 20px 0;\n  text-align: center;\n  color: white;\n}\n.fila-eventos[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 20px;\n  justify-content: center;\n}\n.card[_ngcontent-%COMP%] {\n  background-color: #ffffff0a;\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  border-radius: 16px;\n  padding: 15px;\n  width: 250px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);\n  text-align: center;\n  color: white;\n}\n.card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 200px;\n  object-fit: contain;\n  background-color: #1e1e1e;\n  border-radius: 10px 10px 0 0;\n}\n.imagen-container[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 200px;\n  overflow: hidden;\n  border-radius: 10px 10px 0 0;\n}\n.card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  margin: 10px 0 5px;\n  font-weight: bold;\n  word-wrap: break-word;\n}\n.card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  margin: 2px 0;\n}\n.btn-ticket[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  padding: 10px 20px;\n  background-color: #7C3AED;\n  color: white;\n  border: none;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 0.9rem;\n  transition: background-color 0.3s ease;\n}\n.btn-ticket[_ngcontent-%COMP%]:hover {\n  background-color: #5c27d1;\n}\n.fechas-lista[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n@media (max-width: 768px) {\n  .card[_ngcontent-%COMP%] {\n    width: 45%;\n  }\n  .titulo[_ngcontent-%COMP%] {\n    font-size: 1.6rem;\n  }\n  .section-title[_ngcontent-%COMP%] {\n    font-size: 1.2rem;\n  }\n}\n@media (max-width: 480px) {\n  .card[_ngcontent-%COMP%] {\n    width: 90%;\n  }\n  .titulo[_ngcontent-%COMP%] {\n    font-size: 1.4rem;\n  }\n  .section-title[_ngcontent-%COMP%] {\n    font-size: 1.1rem;\n  }\n  .btn-ticket[_ngcontent-%COMP%] {\n    padding: 8px 16px;\n    font-size: 0.85rem;\n  }\n  .card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 0.95rem;\n  }\n  .card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 0.85rem;\n  }\n  .auth-buttons[_ngcontent-%COMP%] {\n    position: absolute;\n    bottom: 15px;\n    width: 100%;\n    display: flex;\n    justify-content: center;\n    gap: 10px;\n  }\n  .auth-btn[_ngcontent-%COMP%] {\n    background-color: #7C3AED;\n    border: none;\n    padding: 10px 20px;\n    border-radius: 12px;\n    color: white;\n    font-weight: bold;\n    cursor: pointer;\n  }\n  .auth-btn[_ngcontent-%COMP%]:hover {\n    background-color: #5c27d1;\n  }\n  .user-icon[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 15px;\n    right: 15px;\n    background-color: #7C3AED;\n    color: white;\n    font-weight: bold;\n    border-radius: 50%;\n    width: 40px;\n    height: 40px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n  }\n  .user-menu[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 60px;\n    right: 15px;\n    background-color: #1e1e2e;\n    border-radius: 12px;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);\n    z-index: 100;\n    display: flex;\n    flex-direction: column;\n  }\n  .user-menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    background: none;\n    border: none;\n    color: white;\n    padding: 10px 20px;\n    text-align: left;\n    cursor: pointer;\n  }\n  .user-menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n    background-color: #7C3AED;\n  }\n}\n/*# sourceMappingURL=explorar.page.css.map */"] });
var ExplorarPage = _ExplorarPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExplorarPage, [{
    type: Component,
    args: [{ selector: "app-explorar", standalone: true, imports: [CommonModule, FormsModule, IonicModule], template: `<ion-content class="main-content">
  <h1 class="titulo">TICKETMAGIC</h1>

  <section class="eventos-section">
    <h2 class="section-title">Eventos disponibles</h2>

    <div class="fila-eventos">
      <div class="card" *ngFor="let evento of eventos">
        <div class="imagen-container">
          <img [src]="'http://localhost:3000/sistema_reserva/public/images/' + evento.imagen_nombre"
            (error)="onImageError($event)" alt="Imagen del evento" />
        </div>


        <div class="info">
          <h3>{{ evento.nombre_evento }}</h3><br>
          <div class="fechas-lista"*ngIf="lugarPorEvento[evento.id_evento]?.length"></div>
          <h3 *ngFor="let lugar of lugarPorEvento[evento.id_evento]">{{ lugar }}</h3><br>
          <!-- Fechas agrupadas por evento -->
          <p *ngIf="fechasPorEvento[evento.id_evento]?.length">
            Fechas disponibles:
          </p>
          <div class="fechas-lista">
            <div *ngFor="let fecha of fechasPorEvento[evento.id_evento]">
              {{ fecha }}
            </div>
          </div>


          <button class="btn-ticket" (click)="irACompra()">COMPRAR TICKET</button>
        </div>
      </div>
    </div>
  </section>

</ion-content>`, styles: ["/* src/app/components-user/explorar/explorar.page.css */\n.main-content {\n  --background: #0f0f17;\n  color: white;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.titulo {\n  font-size: 2rem;\n  font-weight: bold;\n  text-align: center;\n  color: white;\n}\n.section-title {\n  font-size: 1.5rem;\n  margin: 20px 0;\n  text-align: center;\n  color: white;\n}\n.fila-eventos {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 20px;\n  justify-content: center;\n}\n.card {\n  background-color: #ffffff0a;\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  border-radius: 16px;\n  padding: 15px;\n  width: 250px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);\n  text-align: center;\n  color: white;\n}\n.card img {\n  width: 100%;\n  height: 200px;\n  object-fit: contain;\n  background-color: #1e1e1e;\n  border-radius: 10px 10px 0 0;\n}\n.imagen-container {\n  width: 100%;\n  height: 200px;\n  overflow: hidden;\n  border-radius: 10px 10px 0 0;\n}\n.card h3 {\n  font-size: 1rem;\n  margin: 10px 0 5px;\n  font-weight: bold;\n  word-wrap: break-word;\n}\n.card p {\n  font-size: 0.9rem;\n  margin: 2px 0;\n}\n.btn-ticket {\n  margin-top: 10px;\n  padding: 10px 20px;\n  background-color: #7C3AED;\n  color: white;\n  border: none;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 0.9rem;\n  transition: background-color 0.3s ease;\n}\n.btn-ticket:hover {\n  background-color: #5c27d1;\n}\n.fechas-lista {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n@media (max-width: 768px) {\n  .card {\n    width: 45%;\n  }\n  .titulo {\n    font-size: 1.6rem;\n  }\n  .section-title {\n    font-size: 1.2rem;\n  }\n}\n@media (max-width: 480px) {\n  .card {\n    width: 90%;\n  }\n  .titulo {\n    font-size: 1.4rem;\n  }\n  .section-title {\n    font-size: 1.1rem;\n  }\n  .btn-ticket {\n    padding: 8px 16px;\n    font-size: 0.85rem;\n  }\n  .card h3 {\n    font-size: 0.95rem;\n  }\n  .card p {\n    font-size: 0.85rem;\n  }\n  .auth-buttons {\n    position: absolute;\n    bottom: 15px;\n    width: 100%;\n    display: flex;\n    justify-content: center;\n    gap: 10px;\n  }\n  .auth-btn {\n    background-color: #7C3AED;\n    border: none;\n    padding: 10px 20px;\n    border-radius: 12px;\n    color: white;\n    font-weight: bold;\n    cursor: pointer;\n  }\n  .auth-btn:hover {\n    background-color: #5c27d1;\n  }\n  .user-icon {\n    position: absolute;\n    top: 15px;\n    right: 15px;\n    background-color: #7C3AED;\n    color: white;\n    font-weight: bold;\n    border-radius: 50%;\n    width: 40px;\n    height: 40px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n  }\n  .user-menu {\n    position: absolute;\n    top: 60px;\n    right: 15px;\n    background-color: #1e1e2e;\n    border-radius: 12px;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);\n    z-index: 100;\n    display: flex;\n    flex-direction: column;\n  }\n  .user-menu button {\n    background: none;\n    border: none;\n    color: white;\n    padding: 10px 20px;\n    text-align: left;\n    cursor: pointer;\n  }\n  .user-menu button:hover {\n    background-color: #7C3AED;\n  }\n}\n/*# sourceMappingURL=explorar.page.css.map */\n"] }]
  }], () => [{ type: Router }, { type: PublicService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ExplorarPage, { className: "ExplorarPage", filePath: "src/app/components-user/explorar/explorar.page.ts", lineNumber: 16 });
})();
export {
  ExplorarPage
};
//# sourceMappingURL=explorar.page-HYTOCRNZ.js.map
