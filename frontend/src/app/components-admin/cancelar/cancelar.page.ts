// Página para cancelar un evento o generar su reporte
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-cancelar',
  templateUrl: './cancelar.page.html',
  styleUrls: ['./cancelar.page.css'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, ReactiveFormsModule]
})
export class CancelarPage {
  cancelarForm: FormGroup; // form para cancelar
  generarForm: FormGroup;  // form para generar reporte
  eventos: any[] = [];     // lista de eventos únicos

  constructor(
    private fb: FormBuilder,
    private AdminService: AdminService,
    private router: Router,
    private PublicService: PublicService
  ) {
    // forms simples con un solo campo requerido
    this.cancelarForm = this.fb.group({
      nombre_evento: ['', [Validators.required]]
    });
    this.generarForm = this.fb.group({
      nombre_evento: ['', [Validators.required]]
    });
  }

  // cargar eventos (únicos por id_evento)
  ngOnInit() {
    this.cancelarForm.reset();
    this.generarForm.reset();

    this.PublicService.consulta_eventos().subscribe((resp) => {
      const eventos = resp.value;
      const eventosUnicos = eventos.filter(
        (evento: any, index: number, self: any[]) =>
          index === self.findIndex((e: any) => e.id_evento === evento.id_evento)
      );
      this.eventos = eventosUnicos;
      localStorage.setItem('Eventos', JSON.stringify(eventosUnicos));
    });
  }

  // cancelar el evento elegido
  cancelarEvento() {
    if (this.cancelarForm.valid) {
      this.AdminService.cancelar_evento(this.cancelarForm.value).subscribe(
        (resp) => {
          if (resp.status) {
            this.cancelarForm.reset();
            alert('Evento cancelado');
            this.router.navigate(['/tabs-admin/calendario']);
          } else {
            alert(resp.message);
          }
        },
        (err: any) => {
          console.error('Error al registrase:', err);
          alert('Hubo un problema al cancelar evento');
        }
      );
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }

  // generar reporte del evento elegido (envía por correo)
  reporteEvento() {
    if (this.generarForm.valid) {
      this.AdminService.reporte_evento(this.generarForm.value).subscribe(
        (resp) => {
          if (resp.status) {
            this.generarForm.reset();
            alert('Reporte enviado');
            this.router.navigate(['/tabs-admin/calendario']);
          } else {
            alert(resp.message);
          }
        },
        (err: any) => {
          console.error('Error al enviar reporte:', err);
          alert('Hubo un problema al generar reporte');
        }
      );
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}
