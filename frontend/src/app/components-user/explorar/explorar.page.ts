// Página para listar eventos y agrupar fechas/lugares
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-explorar',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './explorar.page.html',
  styleUrls: ['./explorar.page.css']
})
export class ExplorarPage {
  eventos: any[] = [];
  fechasPorEvento: { [id: number]: string[] } = {};
  lugarPorEvento: { [id: number]: string[] } = {};

  constructor(
    private router: Router,
    private PublicService: PublicService
  ) {}

  ngOnInit() {
    // Consultar eventos al iniciar
    this.PublicService.consulta_eventos().subscribe((resp) => {
      const eventos = resp.value;

      // Filtrar eventos únicos
      const eventosUnicos = eventos.filter(
        (evento: any, index: number, self: any[]) =>
          index === self.findIndex((e: any) => e.id_evento === evento.id_evento)
      );

      // Guardar lista en localStorage
      localStorage.setItem('Eventos', JSON.stringify(eventosUnicos));

      // Agrupar fechas y lugares
      const fechasPorEvento: { [id: number]: string[] } = {};
      const lugarPorEvento: { [id: number]: string[] } = {};
      eventos.forEach((evento: any) => {
        const id = evento.id_evento;
        const fecha = evento.fecha;
        const lugar = evento.nombre_lugar;

        if (!fechasPorEvento[id]) fechasPorEvento[id] = [];
        if (!lugarPorEvento[id]) lugarPorEvento[id] = [];

        if (!fechasPorEvento[id].includes(fecha)) fechasPorEvento[id].push(fecha);
        if (!lugarPorEvento[id].includes(lugar)) lugarPorEvento[id].push(lugar);
      });

      // Asignar a propiedades
      this.eventos = eventosUnicos;
      this.fechasPorEvento = fechasPorEvento;
      this.lugarPorEvento = lugarPorEvento;
    });
  }

  // Imagen por defecto si falla la original
  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/images/error.jpg';
  }

  // Ir a página de compra
  irACompra(): void {
    this.router.navigate(['/tabs-user/compra']);
  }
}
