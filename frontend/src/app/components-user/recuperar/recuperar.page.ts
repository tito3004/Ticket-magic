// Recuperar cuenta: formulario de email y envío de enlace al correo
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service'
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule]
})
export class RecuperarPage {
  usuariosForm: FormGroup; // formulario con solo el correo

  constructor(private fb: FormBuilder, private router: Router, private UsersService: UsersService) {
    // validaciones básicas de correo
    this.usuariosForm = this.fb.group({
      correo: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(6),
          Validators.maxLength(254),
          Validators.pattern(/^[a-zA-Z0-9._%+-]{2,64}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        ]
      ]
    });
  }

  // envía el email de recuperación
  recuperar() {
    if (this.usuariosForm.valid) {
      this.UsersService.recuperar(this.usuariosForm.value).subscribe(
        (resp) => {
          console.log('Respuesta:', resp);
          alert('Se ha enviado un enlace a tu correo para que recuperes tu cuenta');
          this.router.navigate(['/', 'login']);
        },
        (err: any) => {
          console.error('Error al iniciar sesión:', err);
          const backendMessage = err?.error?.message || 'Error desconocido en el servidor.';
          alert(backendMessage);
        }
      );
    } else {
      alert('Por favor, ingresa tu correo.');
    }
  }

  // navega al registro
  irARegistro(): void {
    this.router.navigate(['/register']);
  }
}
