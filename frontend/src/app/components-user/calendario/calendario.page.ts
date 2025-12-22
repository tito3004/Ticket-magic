// Calendario (usuario): muestra tus eventos comprados en FullCalendar
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import { UsersService, CompraResumen } from 'src/app/services/users.service';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, IonicModule, FullCalendarModule],
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.css'],
})
export class CalendarioPage implements OnInit {
  private usersSvc = inject(UsersService);
  loading = false;

  // config básica del calendario
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: [],
    contentHeight: 'auto',
    headerToolbar: { left: 'prev,next today', center: 'title', right: '' },
    eventTimeFormat: { hour: '2-digit', minute: '2-digit', hour12: false }
  };

  ngOnInit(): void {
    this.cargarEventos();
  }

  // pide compras del usuario y las mapea a eventos únicos
  private cargarEventos(): void {
    this.loading = true;
    this.usersSvc.getResumenPorUsuario().subscribe({
      next: (resp) => {
        this.loading = false;
        if (!resp?.status) {
          alert(resp?.message || 'No se pudo cargar tus eventos');
          return;
        }

        const rows = (resp.data ?? []) as CompraResumen[];
        const uniq = new Map<string, EventInput>(); // dedup por evento-fecha-hora

        for (const r of rows) {
          const fecha = String(r.fecha);               
          const hora  = String(r.hora).substring(0, 5);
          const key   = `${r.nombre_evento}|${fecha}|${hora}`;

          if (!uniq.has(key)) {
            uniq.set(key, {
              title: r.nombre_evento,
              start: `${fecha}T${hora}`,
            });
          }
        }

        const events = Array.from(uniq.values());
        this.calendarOptions = { ...this.calendarOptions, events }; // trigger refresh
      },
      error: () => {
        this.loading = false;
        alert('Error al cargar tus eventos');
      }
    });
  }
}
