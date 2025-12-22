// Página para comprobar un código de boleto y mostrar su resumen
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService, CompraResumen } from 'src/app/services/users.service';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './reporte.page.html',
  styleUrls: ['./reporte.page.css']
})
export class ReportePage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private usersSvc = inject(UsersService);

  codigo = '';      // código ingresado o leído de la URL
  loading = false;  // evita llamadas dobles

  // si viene ?cod-unico-boleto=... en la URL, lo procesa
  ngOnInit() {
    this.route.queryParamMap.subscribe((qp) => {
      const cod = qp.get('cod-unico-boleto');
      if (cod && cod.trim()) {
        this.codigo = cod.trim();
        this.verificarYAlertar(this.codigo);
      }
    });
  }

  // botón "comprobar": valida y refresca la URL con el código
  comprobarCodigo() {
    if (!this.codigo?.trim()) {
      alert('Código requerido\nIngresa un código para comprobar.');
      return;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { 'cod-unico-boleto': this.codigo.trim() },
      queryParamsHandling: 'merge'
    });
  }

  // consulta a la API y muestra el resultado en un alert()
  private verificarYAlertar(cod: string) {
    if (this.loading) return;
    this.loading = true;

    this.usersSvc.getResumenPorCodigo(cod).subscribe({
      next: (resp) => {
        this.loading = false;

        if (!resp?.status) {
          alert(`No encontrado\n${resp?.message || 'No se encontró información para ese código.'}`);
          return;
        }

        const rows = (resp.data ?? []) as CompraResumen[];
        if (!rows.length) {
          alert('Sin datos\nNo hay registros para ese código.');
          return;
        }

        const r = rows[0];
        const horaFormateada = r.hora ? r.hora.toString().slice(0, 5) : '';
        const msg =
          `Evento: ${r.nombre_evento}\n` +
          `Fecha: ${r.fecha}\n` +
          `Hora: ${horaFormateada}\n` +
          `Cantidad: ${r.cantidad}\n` +
          `Código: ${r.cod_unico_boleto}`;

        alert(msg);
      },
      error: () => {
        this.loading = false;
        alert('Error\nNo se pudo verificar el código.');
      }
    });
  }

  // placeholder del escáner (por integrar)
  abrirCamara() {
    alert('Integración de escáner pendiente.');
  }
}
