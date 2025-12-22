// Página para crear un lugar y generar sus localidades/asientos
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

type Asiento = { numero: string; descripcion: string; precio: number };

@Component({
  selector: 'app-lugar',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  templateUrl: './lugar.page.html',
  styleUrls: ['../../../assets/styles/formulario_base.css']
})
export class LugarPage {
  lugarForm: FormGroup;       // datos del lugar
  localidadForm: FormGroup;   // define una localidad/lote de asientos
  json_asientos: Asiento[] = []; // asientos generados

  private redirectAfterSave = '/tabs-admin/evento';
  saving = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {
    // formulario del lugar
    this.lugarForm = this.fb.group({
      nombre_lugar: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      capacidad: [0, [Validators.required, Validators.min(0)]],
      nombre_pais: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      nombre_ciudad: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    });

    // formulario para agregar localidades (asientos)
    this.localidadForm = this.fb.group({
      descripcion: ['', [Validators.required, Validators.maxLength(120)]],
      cantidad: [null, [Validators.required, Validators.min(1), Validators.max(5000)]],
      precio: [null, [Validators.required, Validators.min(0)]],
    });
  }

  // agrega una tanda de asientos consecutivos
  agregarLocalidad(): void {
    if (this.localidadForm.invalid) return;

    const { descripcion, cantidad, precio } = this.localidadForm.value;
    const start = this.siguienteNumero();
    const pad = this.padWidth;

    for (let i = 0; i < Number(cantidad); i++) {
      const numero = this.pad(start + i, pad);
      this.json_asientos.push({ numero, descripcion, precio: Number(precio) });
    }

    // actualiza capacidad con lo generado
    const capActual = Number(this.lugarForm.get('capacidad')?.value || 0);
    this.lugarForm.get('capacidad')?.setValue(capActual + Number(cantidad));

    // limpia el subform
    this.localidadForm.reset();
    this.localidadForm.markAsPristine();
    this.localidadForm.markAsUntouched();
  }

  // quita un asiento
  eliminarAsiento(index: number): void {
    this.json_asientos.splice(index, 1);
  }

  // limpia todos los asientos
  limpiarAsientos(): void {
    this.json_asientos = [];
  }

  // guarda el lugar con sus asientos
  guardarlugar(): void {
    if (this.lugarForm.invalid || !this.json_asientos.length || this.saving) {
      if (!this.json_asientos.length) alert('Genera al menos un asiento.');
      return;
    }

    this.saving = true;

    const payload = {
      ...this.lugarForm.value,
      json_asientos: this.json_asientos
    };

    this.adminService.agregar_lugar(payload).subscribe({
      next: (resp) => {
        if (resp.status) {
          this.resetFormularioCompleto();
          alert('Lugar registrado');
          this.router.navigate(['/tabs-admin/calendario']);
        } else {
          alert(resp.message || 'Error al agregar lugar');
        }
      },
      error: (err) => {
        console.error('Error al registrar lugar:', err);
        alert('Hubo un problema. Inténtalo nuevamente.');
      },
      complete: () => (this.saving = false)
    });
  }

  // resumen agrupado por (descripcion, precio)
  get resumenAsientos(): Array<{
    descripcion: string;
    precio: number;
    cantidad: number;
    subtotal: number;
    desde: string;
    hasta: string;
  }> {
    const grupos = new Map<string, { descripcion: string; precio: number; cantidad: number; nums: number[] }>();

    for (const a of this.json_asientos) {
      const key = `${a.descripcion}__${a.precio}`;
      const num = parseInt(a.numero, 10) || 0;
      if (!grupos.has(key)) {
        grupos.set(key, { descripcion: a.descripcion, precio: a.precio, cantidad: 0, nums: [] });
      }
      const g = grupos.get(key)!;
      g.cantidad += 1;
      g.nums.push(num);
    }

    const res: Array<{ descripcion: string; precio: number; cantidad: number; subtotal: number; desde: string; hasta: string; }> = [];

    grupos.forEach(g => {
      g.nums.sort((x, y) => x - y);
      const desde = g.nums[0] ?? 0;
      const hasta = g.nums[g.nums.length - 1] ?? 0;
      res.push({
        descripcion: g.descripcion,
        precio: g.precio,
        cantidad: g.cantidad,
        subtotal: g.cantidad * Number(g.precio),
        desde: this.pad(desde, this.padWidth),
        hasta: this.pad(hasta, this.padWidth),
      });
    });

    res.sort((a, b) => a.descripcion.localeCompare(b.descripcion));
    return res;
  }

  // deja todo limpio
  private resetFormularioCompleto(): void {
    this.lugarForm.reset({
      nombre_lugar: '',
      capacidad: 0,
      nombre_pais: '',
      nombre_ciudad: '',
    });
    this.lugarForm.markAsPristine();
    this.lugarForm.markAsUntouched();

    this.localidadForm.reset();
    this.localidadForm.markAsPristine();
    this.localidadForm.markAsUntouched();

    this.json_asientos = [];

    try {
      window?.scrollTo?.({ top: 0, behavior: 'smooth' });
    } catch { }
  }

  // calcula el siguiente número de asiento
  private siguienteNumero(): number {
    if (!this.json_asientos.length) return 1;
    const max = Math.max(...this.json_asientos.map(a => parseInt(a.numero, 10) || 0));
    return max + 1;
  }

  // ancho de padding para numeración (02, 03, 100, etc.)
  get padWidth(): number {
    const n = Math.max(this.json_asientos.length + 1, 99);
    return n >= 100 ? 3 : 2;
  }

  // agrega ceros a la izquierda
  private pad(n: number, width = 2): string {
    const s = String(n);
    return s.length >= width ? s : '0'.repeat(width - s.length) + s;
  }

  // preview del próximo número
  get siguienteNumeroPreview(): string {
    return this.pad(this.siguienteNumero(), this.padWidth);
  }

  // suma de precios de todos los asientos
  get totalEstimado(): number {
    return this.json_asientos.reduce((acc, a) => acc + (Number(a.precio) || 0), 0);
  }
}
