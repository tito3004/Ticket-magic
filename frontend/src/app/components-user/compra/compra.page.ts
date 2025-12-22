// Compra de boletos: selects encadenados (evento → localidad → fecha → hora) y envío a pago
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { PublicService } from '../../services/public.service';

type RowEvento = {
  id_evento: number | string;
  nombre_evento: string;

  localidad?: string;
  id_lugar?: number | string;
  nombre_lugar?: string;

  id_fecha?: number | string;
  fecha: string;

  id_hora?: number | string;
  hora?: string;

  precio?: any;
};

type OpcionEvento = { id: number; nombre: string };
type OpcionLocalidadVista = { localidad: string; lugar: string };
type OpcionFecha = { id_fecha: number; fecha: string };
type OpcionHora  = { id_hora: number; hora: string };

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  templateUrl: './compra.page.html',
  styleUrls: ['./compra.page.css']
})
export class CompraPage {
  compraForm: FormGroup;

  // datos crudos del backend
  private rows: RowEvento[] = [];

  // catálogos raíz
  eventos: OpcionEvento[] = [];

  // opciones visibles
  opcionesLocalidades: OpcionLocalidadVista[] = [];
  opcionesFechas: OpcionFecha[] = [];
  opcionesHoras:  OpcionHora[]  = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usersService: UsersService,
    private publicService: PublicService
  ) {
    // formulario con validaciones mínimas
    this.compraForm = this.fb.group({
      id_evento: [null, [Validators.required]],
      localidad: [null, [Validators.required]],
      id_fecha:  [null, [Validators.required]],
      id_hora:   [null, [Validators.required]],
      cantidad:  [1,   [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {
    // cargar eventos
    this.publicService.consulta_eventos().subscribe((resp) => {
      const data: RowEvento[] = (resp?.value ?? []).map((r: any) => ({
        id_evento: Number(r.id_evento),
        nombre_evento: r.nombre_evento,

        localidad: r.descripcion || undefined,
        id_lugar: r.id_lugar != null ? Number(r.id_lugar) : undefined,
        nombre_lugar: r.nombre_lugar,

        id_fecha: r.id_fecha != null ? Number(r.id_fecha) : undefined,
        fecha: r.fecha,

        id_hora: r.id_hora != null ? Number(r.id_hora) : undefined,
        hora: (r.hora || '').slice(0, 5) || undefined, // HH:mm

        precio: r.precio
      }));

      this.rows = data;

      // eventos únicos
      const seen = new Set<number>();
      this.eventos = data
        .filter(r => {
          const id = Number(r.id_evento);
          if (seen.has(id)) return false;
          seen.add(id);
          return true;
        })
        .map(r => ({ id: Number(r.id_evento), nombre: r.nombre_evento }));

      this.wireCascades(); // encadenar selects
    });
  }

  /** Encadenado: evento → localidad → fecha → hora */
  private wireCascades() {
    // evento → localidades
    this.compraForm.get('id_evento')!.valueChanges.subscribe((id: number | null) => {
      const ide = Number(id || 0);
      this.opcionesLocalidades = ide ? this.getLocalidadesVistaPorEvento(ide) : [];
      this.opcionesFechas = [];
      this.opcionesHoras  = [];
      this.compraForm.patchValue({ localidad: null, id_fecha: null, id_hora: null }, { emitEvent: false });
    });

    // localidad → fechas
    this.compraForm.get('localidad')!.valueChanges.subscribe((loc: string | null) => {
      const ide = Number(this.compraForm.get('id_evento')!.value || 0);
      const localidadSel = (loc || '').trim();
      this.opcionesFechas = (ide && localidadSel) ? this.getFechasPorLocalidad(ide, localidadSel) : [];
      this.opcionesHoras  = [];
      this.compraForm.patchValue({ id_fecha: null, id_hora: null }, { emitEvent: false });
    });

    // fecha → horas
    this.compraForm.get('id_fecha')!.valueChanges.subscribe((id_fecha: number | null) => {
      const ide = Number(this.compraForm.get('id_evento')!.value || 0);
      const localidadSel = (this.compraForm.get('localidad')!.value || '').trim();
      const idf = Number(id_fecha || 0);
      this.opcionesHoras = (ide && localidadSel && idf) ? this.getHoras(ide, localidadSel, idf) : [];
      this.compraForm.patchValue({ id_hora: null }, { emitEvent: false });
    });
  }

  /** Helpers de listas únicas */
  private getLocalidadesVistaPorEvento(id_evento: number): OpcionLocalidadVista[] {
    const mapa = new Map<string, OpcionLocalidadVista>();
    for (const r of this.rows) {
      if (Number(r.id_evento) !== id_evento) continue;
      if (!r.localidad || !r.nombre_lugar) continue;
      const key = `${r.localidad}__${r.nombre_lugar}`;
      if (!mapa.has(key)) {
        mapa.set(key, { localidad: r.localidad, lugar: r.nombre_lugar });
      }
    }
    const arr = Array.from(mapa.values());
    arr.sort((a, b) => (a.localidad + a.lugar).localeCompare(b.localidad + b.lugar));
    return arr;
  }

  private getFechasPorLocalidad(id_evento: number, localidad: string): OpcionFecha[] {
    const mapa = new Map<number, OpcionFecha>();
    for (const r of this.rows) {
      if (Number(r.id_evento) !== id_evento) continue;
      if ((r.localidad || '').trim() !== localidad) continue;
      if (r.id_fecha == null || !r.fecha) continue;
      const idf = Number(r.id_fecha);
      if (!mapa.has(idf)) mapa.set(idf, { id_fecha: idf, fecha: r.fecha });
    }
    return Array.from(mapa.values()).sort((a, b) => a.fecha.localeCompare(b.fecha));
  }

  private getHoras(id_evento: number, localidad: string, id_fecha: number): OpcionHora[] {
    const mapa = new Map<number, OpcionHora>();
    for (const r of this.rows) {
      if (Number(r.id_evento) !== id_evento) continue;
      if ((r.localidad || '').trim() !== localidad) continue;
      if (Number(r.id_fecha) !== id_fecha) continue;
      if (r.id_hora == null || !r.hora) continue;
      const idh = Number(r.id_hora);
      if (!mapa.has(idh)) mapa.set(idh, { id_hora: idh, hora: r.hora! });
    }
    return Array.from(mapa.values()).sort((a, b) => a.hora.localeCompare(b.hora));
  }

  // envía la compra y redirige a PayPal (link del backend)
  Compra() {
    if (this.compraForm.invalid) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    const payload = this.compraForm.value as {
      id_evento: number;
      localidad: string;
      id_fecha: number;
      id_hora: number;
      cantidad: number;
    };

    this.usersService.comprarBoletos(payload).subscribe({
      next: (resp) => {
        if (resp.status) {
          this.compraForm.reset();
          console.log(resp.link);
          window.location.href = resp.link; // redirección a pago
        } else {
          alert(resp.message || 'No se pudo completar la compra.');
        }
      },
      error: (err) => {
        console.error('Error al comprar:', err);
        alert('Hubo un problema al procesar la compra.');
      }
    });
  }
}
