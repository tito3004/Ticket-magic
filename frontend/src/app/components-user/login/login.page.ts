// Login de usuarios: formulario, validaciones y autenticación contra el backend
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService, ApiResponse } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
})
export class LoginPage {
  usuariosForm: FormGroup; // formulario reactivo

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    // campos y validaciones básicas
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
      ],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // intenta iniciar sesión
  login() {
    if (!this.usuariosForm.valid) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    this.authService.login(this.usuariosForm.value).subscribe({
      next: (resp: ApiResponse) => {
        if (resp?.status !== false && resp?.token) {
          // normaliza token (puede venir como string o string[])
          const raw: unknown = resp.token as any;
          const token = Array.isArray(raw) ? raw.join('.') : (raw as string);

          if (!token) {
            alert('Token vacío o inválido.');
            return;
          }

          // guarda token y usuario
          localStorage.setItem('token', token);
          if (resp.usuario) {
            localStorage.setItem('usuario', JSON.stringify(resp.usuario));
          }

          this.usuariosForm.reset();
          alert('Has iniciado sesión correctamente');
          this.router.navigate(['/tabs-user/explorar']);
        } else {
          alert(resp?.message || 'Respuesta inesperada del servidor.');
        }
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
        const backendMessage = err?.error?.message || 'Error desconocido en el servidor.';
        alert(backendMessage);
      }
    });
  }

  // ir a registro
  irARegistro(): void {
    this.router.navigate(['/register']);
  }
}
