// Restaurar contraseña: formulario de nueva clave y envío usando el token de la URL
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-recuperando',
  templateUrl: './recuperando.page.html',
  styleUrls: ['./recuperando.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, FormsModule, ReactiveFormsModule, HttpClientModule]
})
export class RecuperandoPage {
  usuariosForm: FormGroup; // password + confirmar

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private AuthService: AuthService,
    private route: ActivatedRoute
  ) {
    this.usuariosForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarpassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // valida que exista token en la URL
  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token) {
      alert('Enlace de recuperación inválido.');
      this.router.navigate(['/', 'login']);
    }
  }

  // envía nueva contraseña si todo está correcto
  recuperando() {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (this.usuariosForm.get('confirmarpassword')?.value != this.usuariosForm.get('password')?.value) {
      alert('Las contraseñas tienen que coincidir');
    } else if (this.usuariosForm.valid && token) {
      this.AuthService.recuperando(token, this.usuariosForm.value).subscribe(
        (resp) => {
          if (resp.status) {
            alert('Has restaurado tu contraseña. Inicia sesión.');
            this.router.navigate(['/', 'login']);
            this.usuariosForm.reset();
            console.log('Respuesta:', resp);
          } else {
            alert(resp.message);
            this.router.navigate(['/login'], { replaceUrl: true });
          }
        },
        (err: any) => {
          console.error('Error al restaurar contraseña:', err);
          const backendMessage = err?.error?.message || 'Error desconocido en el servidor.';
          alert(backendMessage);
          this.router.navigate(['/login'], { replaceUrl: true });
        }
      );
    } else {
      alert('Por favor, completa las contraseñas correctamente.');
    }
  }
}
