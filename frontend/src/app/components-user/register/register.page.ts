// Registro de usuarios: formulario, validaciones y envío al backend
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service'
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.css']
})
export class RegisterPage {
  usuariosForm: FormGroup; // formulario reactivo

  constructor(private fb: FormBuilder, private UsersService: UsersService, private router: Router) {
    // campos con validaciones básicas
    this.usuariosForm = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)]],
      apellidos: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)]],
      correo: ['', [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(254), Validators.pattern(/^[a-zA-Z0-9._%+-]{2,64}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      cedula: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarpassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // envía el registro si todo está OK
  registrarUsuario() {
    if (this.usuariosForm.get('confirmarpassword')?.value != this.usuariosForm.get('password')?.value) {
      alert('Las contraseñas tienen que coincidir');
    } else if (this.usuariosForm.valid) {
      this.UsersService.register(this.usuariosForm.value).subscribe(
        (resp) => {
          if (resp.status) {
            this.usuariosForm.reset();
            alert('Usuario registrado');
            this.router.navigate(['/', 'login']);
          } else {
            alert(resp.message);
          }
        },
        (err: any) => {
          console.error('Error al registrase:', err);
          alert('Hubo un problema al procesar tu inicio de sesión. Por favor, inténtalo nuevamente.');
        }
      );
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}
