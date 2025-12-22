// Quejas del usuario: formulario simple para reportar inconvenientes
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-quejas',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  templateUrl: './quejas.page.html',
  styleUrls: ['./quejas.page.css'],
})
export class QuejasPage {
  inconvenientesForm: FormGroup; // form con título y descripción

  constructor(
    private fb: FormBuilder,
    public usersService: UsersService,
    private router: Router
  ) {
    // validaciones básicas
    this.inconvenientesForm = this.fb.group({
      nombre_inconveniente: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]]
    });
  }

  // envía la queja al backend
  notificar() {
    if (this.inconvenientesForm.invalid) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    this.usersService.formularioInconvenientes(this.inconvenientesForm.value).subscribe({
      next: (resp) => {
        if (resp.status) {
          this.inconvenientesForm.reset();
          this.router.navigate(['/tabs-user/explorar']);
          alert('Se ha notificado al administrador');
        } else {
          alert(resp.message || 'No se pudo enviar tu inconveniente.');
        }
      },
      error: (err) => {
        console.error('Error al enviar:', err);
        alert('Hubo un problema al enviar el inconveniente');
      }
    });
  }
}
