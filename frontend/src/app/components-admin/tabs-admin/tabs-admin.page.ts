// Tabs de administrador
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tabs-admin',
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule],
  templateUrl: './tabs-admin.page.html',
  styleUrls: ['./tabs-admin.page.scss']
})
export class TabsAdminPage {
  isAdmin$ = this.auth.isAdmin$; // observable del rol

  constructor(private router: Router, private auth: AuthService) {}

  // ir a las tabs de usuario
  abrirOpcionesAdmin() {
    this.router.navigate(['/tabs-user']);
  }

  // cerrar sesión y limpiar storage
  async cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('is_admin');
    localStorage.removeItem('usuario');
    this.auth.logout();
    this.router.navigateByUrl('/start');
  }
}




