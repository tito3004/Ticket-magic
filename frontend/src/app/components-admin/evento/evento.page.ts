// Página para crear un evento (fechas, horas, lugares e imagen)
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

type Fecha = { fecha: string };
type Hora  = { hora: string };
type Lugar = { nombre_lugar: string };
type Artista = { nombre_artista: string };

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  templateUrl: './evento.page.html',
  styleUrls: ['../../../assets/styles/formulario_base.css']
})
export class EventoPage implements OnInit {
  // forms
  eventoForm: FormGroup;
  fechaForm: FormGroup;
  horaForm: FormGroup;

  // colecciones que viajan al backend
  json_fechas: Fecha[] = [];
  json_horas:  Hora[]  = [];
  json_lugar:  Lugar[] = [];

  // catálogos
  lugaresDisponibles: Lugar[] = [];
  artistasDisponibles: Artista[] = [];

  // archivo a subir
  imagenFile: File | null = null;

  private redirectAfterSave = '/tabs-admin/evento';
  saving = false;

  constructor(
    private fb: FormBuilder,
    private admin: AdminService,
    private router: Router
  ) {
    // form principal del evento
    this.eventoForm = this.fb.group({
      nombre_evento: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      tipo_evento:   ['', [Validators.required]],
      artista_sel:   [null, [Validators.required]],
      descripcion:   ['', [Validators.maxLength(800)]],
      lugares_sel:   [[],  [Validators.required]],
    });

    // rango de fechas a generar
    this.fechaForm = this.fb.group({
      inicio: ['', [Validators.required]],
      fin:    ['', [Validators.required]],
    });

    // horas individuales
    this.horaForm = this.fb.group({
      hora: ['', [Validators.required]],
    });
  }

  // cargar catálogos
  ngOnInit(): void {
    this.admin.consultar_lugares().subscribe({
      next: (resp) => { this.lugaresDisponibles = resp?.value ?? []; },
      error: (e) => console.error('Error lugares:', e)
    });

    this.admin.consultar_artista().subscribe({
      next: (resp) => { this.artistasDisponibles = resp?.value ?? []; },
      error: (e) => console.error('Error artistas:', e)
    });
  }

  /* ===== Fechas ===== */
  // genera fechas entre inicio y fin (sin duplicados)
  agregarFechasDeRango(): void {
    if (this.fechaForm.invalid) return;
    const { inicio, fin } = this.fechaForm.value;
    const start = new Date(inicio);
    const end   = new Date(fin);
    if (start > end) { alert('Rango de fechas inválido'); return; }

    const acc: Fecha[] = [];
    const d = new Date(start);
    while (d <= end) {
      const iso = d.toISOString().slice(0, 10); // YYYY-MM-DD
      if (!this.json_fechas.some(f => f.fecha === iso)) acc.push({ fecha: iso });
      d.setDate(d.getDate() + 1);
    }
    this.json_fechas.push(...acc);
    this.json_fechas.sort((a,b)=>a.fecha.localeCompare(b.fecha));
    this.fechaForm.reset();
  }
  // limpia todas las fechas
  limpiarFechas(): void { this.json_fechas = []; }

  /* ===== Horas ===== */
  // agrega una hora (HH:mm) evitando duplicados
  agregarHora(): void {
    if (this.horaForm.invalid) return;
    const { hora } = this.horaForm.value;
    if (!this.json_horas.some(h => h.hora === hora)) this.json_horas.push({ hora });
    this.json_horas.sort((a,b)=>a.hora.localeCompare(b.hora));
    this.horaForm.reset();
  }
  // limpia todas las horas
  limpiarHoras(): void { this.json_horas = []; }

  /* ===== Lugares ===== */
  // actualiza json_lugar según los seleccionados en el form
  onLugaresChange(nombres: string[]): void {
    const set = new Set((nombres ?? []).map(v => v.trim().toLowerCase()));
    this.json_lugar = this.lugaresDisponibles
      .filter(l => set.has(l.nombre_lugar.trim().toLowerCase()));
  }

  /* ===== Imagen ===== */
  // toma el archivo seleccionado
  onFileChange(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    this.imagenFile = input.files?.[0] ?? null;
  }

  /* ===== Guardar ===== */
  // valida todo y envía el FormData al backend
  guardarEvento(): void {
    const sel = this.eventoForm.get('lugares_sel')?.value ?? [];
    this.onLugaresChange(sel);

    if (this.eventoForm.invalid || !this.json_fechas.length || !this.json_horas.length || !this.json_lugar.length || !this.imagenFile) {
      this.eventoForm.markAllAsTouched();
      alert('Completa todos los campos y agrega al menos una fecha, hora y lugar.');
      return;
    }
    if (this.saving) return;
    this.saving = true;

    const { nombre_evento, tipo_evento, artista_sel, descripcion } = this.eventoForm.value;

    // armar payload multipart
    const fd = new FormData();
    fd.append('nombre_evento',  nombre_evento);
    fd.append('tipo_evento',    tipo_evento);
    fd.append('nombre_artista', artista_sel);
    fd.append('descripcion',    descripcion || '');
    fd.append('json_fechas', JSON.stringify(this.json_fechas.map(f => f.fecha)));
    fd.append('json_horas',  JSON.stringify(this.json_horas.map(h => h.hora)));
    fd.append('json_lugar',  JSON.stringify(this.json_lugar));
    fd.append('imagen', this.imagenFile!, this.imagenFile!.name);

    this.admin.agregar_evento(fd).subscribe({
      next: (resp) => {
        if (resp.status) {
          this.resetAll();
          alert('Evento registrado');
          this.router.navigate(['/tabs-admin/calendario']);
        } else {
          alert(resp.message || 'Error al registrar evento');
        }
      },
      error: (err) => {
        console.error('Error al registrar evento:', err);
        alert('Ocurrió un problema. Inténtalo nuevamente.');
      },
      complete: () => this.saving = false
    });
  }

  // contadores útiles para la UI
  get totalFechas(): number { return this.json_fechas.length; }
  get totalHoras():  number { return this.json_horas.length;  }
  get totalLugares():number { return this.json_lugar.length;  }

  // resetea todo el estado del formulario
  private resetAll(): void {
    this.eventoForm.reset({
      nombre_evento: '',
      tipo_evento: '',
      artista_sel: null,
      descripcion: '',
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
    window?.scrollTo?.({ top: 0, behavior: 'smooth' });
  }
}
