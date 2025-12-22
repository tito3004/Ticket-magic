// Página de error 404 simple
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss']
})
export class NotFoundPage {
  constructor(private router: Router) {}

  // Ir al inicio
  goHome() {
    this.router.navigateByUrl('/tabs-user');
  }

}
