// Servicio Angular para administración: gestiona artistas, lugares, eventos, reportes y consultas al backend
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Interfaz de la respuesta esperada desde la API
export interface ApiResponse {
  status: boolean;
  message: string;
  value?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  private url = "http://localhost:3000/sistema_reserva/admin";

  constructor(private http: HttpClient) { }

  // Llamada HTTP para agregar un artista
  agregar_artista(datos: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.url + "/agregar_artista", datos)
      .pipe(
        catchError(error => {
          console.error('Error al registrar artista:', error);
          const backendMessage = error?.error?.message || 'Error desconocido';
          return of({ status: false, message: backendMessage });
        })
      );
  }

  // Llamada HTTP para agregar un lugar
  agregar_lugar(datos: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.url + "/agregar_lugar", datos)
      .pipe(
        catchError(error => {
          console.error('Error al registrar lugar:', error);
          const backendMessage = error?.error?.message || 'Error desconocido';
          return of({ status: false, message: backendMessage });
        })
      );
  }

  // Llamada HTTP para cancelar un evento
  cancelar_evento(datos: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.url + "/cancelar_eventos", datos)
      .pipe(
        catchError(error => {
          console.error('Error al cancelar evento:', error);
          const backendMessage = error?.error?.message || 'Error desconocido';
          return of({ status: false, message: backendMessage });
        })
      );
  }

  // Llamada HTTP para generar un reporte de boletos
  reporte_evento(datos: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.url + "/reporte_boletos", datos)
      .pipe(
        catchError(error => {
          console.error('Error al generar reporte de boletos:', error);
          const backendMessage = error?.error?.message || 'Error desconocido';
          return of({ status: false, message: backendMessage });
        })
      );
  }

  // Llamada HTTP para obtener la lista de artistas
  consultar_artista(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.url + "/consultar_artista")
      .pipe(
        catchError(error => {
          console.error('Error al consultar artista:', error);
          const backendMessage = error?.error?.message || 'Error desconocido';
          return of({ status: false, message: backendMessage });
        })
      );
  }

  // Llamada HTTP para obtener la lista de lugares
  consultar_lugares(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.url + "/consultar_lugares")
      .pipe(
        catchError(error => {
          console.error('Error al consultar lugares:', error);
          const backendMessage = error?.error?.message || 'Error desconocido';
          return of({ status: false, message: backendMessage });
        })
      );
  }

  // Llamada HTTP para registrar un nuevo evento
  agregar_evento(datos: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.url + "/generar_eventos", datos)
      .pipe(
        catchError(error => {
          console.error('Error al registrar evento:', error);
          const backendMessage = error?.error?.message || 'Error desconocido';
          return of({ status: false, message: backendMessage });
        })
      );
  }
}
