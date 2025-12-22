// Pago realizado: recibe parámetros de PayPal por query y confirma la compra
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago-realizado',
  templateUrl: './pago-realizado.page.html',
  styleUrls: ['./pago-realizado.page.css'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class PagoRealizadoPage {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private UsersService: UsersService
  ) {}

  // lee valores de la URL y avisa al backend que el pago fue exitoso
  ngOnInit() {
    const cod_unico_boleto = this.route.snapshot.queryParamMap.get('token'); // valor leído de la URL
    const token = this.route.snapshot.queryParamMap.get('token');            // token PayPal
    const PayerID = this.route.snapshot.queryParamMap.get('PayerID');        // id del pagador

    if (token && cod_unico_boleto && PayerID) {
      this.UsersService.pagorealizado(cod_unico_boleto, PayerID, token).subscribe(
        (resp: any) => {
          // éxito: ya está confirmado en backend
        },
        (err: any) => {
          // error: podrías mostrar un alert si lo deseas
        }
      );
    } else {
      // faltan parámetros en la URL
    }
  }

  // vuelve al historial del usuario
  volverAlInicio() {
    this.router.navigate(['/tabs-user/historial']);
  }
}
