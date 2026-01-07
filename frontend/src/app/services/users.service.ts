// Servicio de usuarios: registro, recuperación, compra de boletos y consultas al backend
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface ApiResponse<T = any> {
  status: boolean;
  message: string;
  value?: any;
  link?: any;
  data?: any;
}

export interface CompraResumen {
  cod_unico_boleto: string;
  nombre_evento: string;
  fecha: string;   // 'YYYY-MM-DD'
  hora: string;    // 'HH:mm' o 'HH:mm:ss'
  correo: string;
  cantidad: number;
}

@Injectable({ providedIn: 'any' })
export class UsersService {
  // Base URL del backend (módulo usuario)
  private url = `${environment.apiurl}usuario`;

  // Headers para peticiones JSON (no usar con FormData)
  private jsonHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

  constructor(private http: HttpClient) {}

  // Llamada HTTP: registrar usuario
  register(datos: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.url}/registro`, datos, { headers: this.jsonHeaders })
      .pipe(
        catchError(error => {
          console.error('Error al registrar usuario:', error);
          const backendMessage = error?.error?.message || 'Error desconocido';
          return of({ status: false, message: backendMessage });
        })
      );
  }

  // Llamada HTTP: solicitar restauración de cuenta (envío de mail con link)
  recuperar(datos: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.url}/restaurar_cuenta`, datos, { headers: this.jsonHeaders })
      .pipe(
        catchError(error => {
          console.error('Error al restaurar cuenta:', error);
          const backendMessage = error?.error?.message || 'Error desconocido';
          return of({ status: false, message: backendMessage });
        })
      );
  }

  // Llamada HTTP: confirmar pago exitoso (PayPal) y registrar compra
  pagorealizado(cod_unico_boleto: any, payerid: any, token: any): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>(`${this.url}/consulta_boleto/?cod_unico_boleto=${cod_unico_boleto}&token=${token}&PayerID=${payerid}`, { headers: this.jsonHeaders })
      .pipe(
        catchError(error => {
          console.error('Error al verificar el token:', error);
          const backendMessage = error?.error?.message || 'Error desconocido';
          return of({ status: false, message: backendMessage } as ApiResponse);
        })
      );
  }

  // Llamada HTTP: cancelar compra tras pago cancelado (eliminar boletos)
  pagocancelado(cod_unico_boleto: any): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>(`${this.url}/eliminar_boletos/?cod_unico_boleto=${cod_unico_boleto}`, { headers: this.jsonHeaders })
      .pipe(
        catchError(error => {
          console.error('Error al verificar el token:', error);
          const backendMessage = error?.error?.message || 'Error desconocido';
          return of({ status: false, message: backendMessage } as ApiResponse);
        })
      );
  }

  // Llamada HTTP: enviar formulario de inconvenientes
  formularioInconvenientes(datos: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.url}/formulario_incovenientes`, datos, { headers: this.jsonHeaders })
      .pipe(
        catchError(error => {
          console.error('Error al enviar formulario:', error);
          const backendMessage = error?.error?.message || 'Hubo un problema al procesar la solicitud.';
          return of({ status: false, message: backendMessage });
        })
      );
  }

  // Llamada HTTP: iniciar proceso de compra (devuelve link de pago y código)
  comprarBoletos(datos: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.url}/compra_boletos`, datos, { headers: this.jsonHeaders })
      .pipe(
        catchError(error => {
          console.error('Error al comprar boletos:', error);
          const backendMessage = error?.error?.message || 'Hubo un problema al procesar la solicitud.';
          return of({ status: false, message: backendMessage });
        })
      );
  }

  // Llamada HTTP: resumen por código único (para QR / admin comprobar)
  getResumenPorCodigo(codUnicoBoleto: any): Observable<ApiResponse<CompraResumen[]>> {
    return this.http.get<ApiResponse<CompraResumen[]>>(`${this.url}/consulta_boletos_qr/?cod_unico_boleto=${codUnicoBoleto}`)
      .pipe(
        catchError(err => {
          const msg = err?.error?.message || 'No se pudo consultar el QR';
          return of({ status: false, message: msg } as ApiResponse<CompraResumen[]>);
        })
      );
  }

  // Llamada HTTP: compras del usuario autenticado (agrupadas por código único)
  getResumenPorUsuario(): Observable<ApiResponse<CompraResumen[]>> {
    return this.http
      .get<ApiResponse<CompraResumen[]>>(`${this.url}/consulta_boletos_por_usuario`, { headers: this.jsonHeaders })
      .pipe(
        catchError(err => {
          const msg = err?.error?.message || 'No se pudo consultar las compras del usuario';
          return of({ status: false, message: msg } as ApiResponse<CompraResumen[]>);
        })
      );
  }
}
