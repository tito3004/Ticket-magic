// Servicio público: consulta de eventos desde el backend (endpoints sin autenticación)
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Formato genérico de respuesta de la API pública
export interface ApiResponse {
  status: boolean;
  message: string;
  value?: any;
}

@Injectable({ providedIn: 'root' })
export class PublicService {
  // Configuración base de headers y URL del backend
  private headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  private url = "http://localhost:3000/sistema_reserva/public";

  constructor(private http: HttpClient) {}

  // Llamada HTTP: obtener lista de eventos públicos
  consulta_eventos(): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>(`${this.url}/consulta_eventos`, { headers: this.headers })
      .pipe(
        catchError(error => {
          console.error('Error al obtener los eventos:', error);
          return of({ status: false, message: 'Hubo un problema al procesar la solicitud.' });
        })
      );
  }
}

