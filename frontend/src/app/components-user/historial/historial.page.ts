// Historial: muestra los boletos comprados por el usuario con su QR y enlace de verificación
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UsersService, CompraResumen } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

interface BoletoVM {
  evento: string;
  fecha: string;
  hora: string;
  id: string;
  cantidad: number;
  link: string;
  qr: string;
}

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.css'],
})
export class HistorialPage implements OnInit {
  boletos: BoletoVM[] = [];
  loading = false;

  appBaseUrl = (environment as any).webAppBaseUrl ?? window.location.origin;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private UsersService: UsersService
  ) {}

  ngOnInit() {
    this.cargar();
  }

  cargar(event?: any) {
    this.loading = true;

    this.UsersService.getResumenPorUsuario().subscribe({
      next: async (resp) => {
        this.loading = false;
        event?.target?.complete?.();

        if (!resp.status) {
          alert();
          return;
        }

        const rows = (resp.data ?? []) as CompraResumen[];
        this.boletos = rows.map((r) => {
          const link = `${this.appBaseUrl}/tabs-admin/comprobar?cod-unico-boleto=${encodeURIComponent(r.cod_unico_boleto)}`;
          const qr = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(link)}`;

          return {
            evento: r.nombre_evento,
            fecha: String(r.fecha),
            hora: String(r.hora),
            id: r.cod_unico_boleto,
            cantidad: r.cantidad,
            link,
            qr
          };
        });
      },
      error: async () => {
        this.loading = false;
        event?.target?.complete?.();
        alert('Error al cargar el historial');
      }
    });
  }

  trackByCod(_: number, b: BoletoVM) {
    return b.id;
  }
}
