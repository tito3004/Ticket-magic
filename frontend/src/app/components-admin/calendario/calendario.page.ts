// Calendario: muestra eventos públicos en FullCalendar
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, IonicModule, FullCalendarModule],
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.css'],
})
export class CalendarioPage implements OnInit {
  eventos: any[] = []; // cache local

  constructor(private PublicService: PublicService) {}

  // opciones básicas del calendario
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: [] as EventInput[],
    timeZone: 'America/Guayaquil',
    contentHeight: 'auto',
    headerToolbar: { left: 'prev,next today', center: 'title', right: '' }
  };

  ngOnInit() {
    // pedir eventos al backend
    this.PublicService.consulta_eventos().subscribe((resp) => {
      const rows = resp?.value ?? [];

      // dejar solo una fila por id_fecha
      const seen = new Set<string>();
      const fechasUnicas = rows.filter((r: any) => {
        const idf = String(r.id_fecha ?? r.id_fechas ?? '');
        if (!idf) return false;
        if (seen.has(idf)) return false;
        seen.add(idf);
        return true;
      });

      console.log('Fechas únicas por id_fecha:', fechasUnicas);
      this.eventos = fechasUnicas;
      localStorage.setItem('Eventos', JSON.stringify(fechasUnicas));

      // mapear al formato que espera FullCalendar
      const fcEvents: EventInput[] = fechasUnicas.map((r: any) => {
        const fecha: string = r.fecha;                    // 'YYYY-MM-DD'
        const hora: string = (r.hora || '').toString().slice(0, 5); // 'HH:mm'
        const start = hora ? `${fecha}T${hora}` : fecha;  // si no hay hora, se muestra allDay

        return {
          id: `${r.id_evento}-${r.id_fecha ?? r.id_fechas}`,
          title: r.nombre_evento,
          start,
          allDay: !hora,
          extendedProps: {
            id_evento: Number(r.id_evento),
            nombre_lugar: r.nombre_lugar,
            nombre_artista: r.nombre_artista
          }
        };
      });

      // refrescar el calendario
      this.calendarOptions = { ...this.calendarOptions, events: fcEvents };
    });
  }
}
