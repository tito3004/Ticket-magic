// Pago cancelado: toma el código de compra de la URL y avisa al backend para revertir
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-pago-cancelado',
  templateUrl: './pago-cancelado.page.html',
  styleUrls: ['./pago-cancelado.page.css'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class PagocanceladoPage implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private UsersService: UsersService
  ) {}

  // lee ?cod_unico_boleto=... y notifica cancelación
  ngOnInit() {
    const cod_unico_boleto = this.route.snapshot.queryParamMap.get('cod_unico_boleto'); 

    if (cod_unico_boleto) {
      this.UsersService.pagocancelado(cod_unico_boleto).subscribe(
        () => { /* ok */ },
        () => { /* error */ }
      );
    } else {
      // faltan parámetros
    }
  }

  // vuelve a las pestañas de usuario
  volverAlInicio() {
    this.router.navigate(['/tabs-user']);
  }
}
