// Página que valida el token de verificación de cuenta (?token=...)
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verificado',
  standalone: true,
  imports: [CommonModule, IonicModule, HttpClientModule],
  templateUrl: './verificado.page.html',
  styleUrls: ['./verificado.page.css']
})
export class VerificadoPage implements OnInit {
  mensaje: string = 'Verificando...';   // texto auxiliar
  verificacionExitosa: boolean = false; // estado para la UI

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  // lee el token de la URL y pregunta al backend si es válido
  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (token) {
      this.authService.verificarToken(token).subscribe(
        (res) => {
          if (res?.message === 'Tu cuenta ha sido verificada correctamente') {
            this.verificacionExitosa = true;
          } else {
            this.verificacionExitosa = false;
          }
        },
        () => {
          this.verificacionExitosa = false;
        }
      );
    } else {
      this.verificacionExitosa = false;
    }
  }
}
