// Tabs de usuario: navegación principal, botón de admin y cierre de sesión
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tabs-user',
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule],
  templateUrl: './tabs-user.page.html',
  styleUrls: ['./tabs-user.page.scss']
})
export class TabsUserPage {
  // Saber si el usuario es admin para mostrar botón especial
  isAdmin$ = this.auth.isAdmin$;

  constructor(private router: Router, private auth: AuthService) {}

  // Cierra sesión y regresa a la pantalla de inicio
  async cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('is_admin');
    localStorage.removeItem('usuario');
    this.auth.logout();
    this.router.navigateByUrl('/start');
  }

  // Va a la vista de administrador
  abrirOpcionesAdmin() {
    this.router.navigate(['/tabs-admin']);
  }
}
