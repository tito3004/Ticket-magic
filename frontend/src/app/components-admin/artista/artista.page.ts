// Página para registrar un artista
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-artista',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  templateUrl: './artista.page.html',
  styleUrls: ['../../../assets/styles/formulario_base.css']
})
export class ArtistaPage {
  artistaForm: FormGroup; // formulario reactivo

  constructor(private fb: FormBuilder, private AdminService: AdminService, private router: Router) {
    // armo el formulario con validaciones básicas
    this.artistaForm = this.fb.group({
      nombre_artista: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      genero:         ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      tipo_artista:   ['', [Validators.required, Validators.minLength(6), Validators.maxLength(254)]]
    });
  }

  // guarda el artista si el formulario es válido
  guardarArtista() {
    if (this.artistaForm.valid) {
      this.AdminService.agregar_artista(this.artistaForm.value).subscribe(
        (resp) => {
          if (resp.status) {
            this.artistaForm.reset();
            alert('Artista registrado');
            this.router.navigate(['/tabs-admin/calendario']); // regreso al calendario
          } else {
            alert(resp.message); // muestro error del backend
          }
        },
        (err: any) => {
          console.error('Error al registrase:', err);
          alert('Hubo un problema al procesar tu inicio de sesión. Inténtalo nuevamente.');
        }
      );
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}
