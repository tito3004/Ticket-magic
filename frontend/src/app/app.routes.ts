// Rutas principales de la aplicación
import { Routes } from '@angular/router';
import { tabsUserGuard } from './guards/tabs-user.guard';
import { tabsAdminGuard } from './guards/tabs-admin.guard';

export const routes: Routes = [
  // Redirección inicial
  { path: '', redirectTo: 'start', pathMatch: 'full' },

  // ---------- TABS USER ----------//
  {
    path: 'tabs-user',
    canActivate: [tabsUserGuard],
    loadComponent: () =>
      import('./components-user/tabs-user/tabs-user.page').then(m => m.TabsUserPage),
    children: [
      { path: 'explorar', loadComponent: () => import('./components-user/explorar/explorar.page').then(m => m.ExplorarPage) },
      { path: 'historial', loadComponent: () => import('./components-user/historial/historial.page').then(m => m.HistorialPage) },
      { path: 'compra', loadComponent: () => import('./components-user/compra/compra.page').then(m => m.CompraPage) },
      { path: 'quejas', loadComponent: () => import('./components-user/quejas/quejas.page').then(m => m.QuejasPage) },
      { path: 'calendario', loadComponent: () => import('./components-user/calendario/calendario.page').then(m => m.CalendarioPage) },
      { path: 'pago-realizado', loadComponent: () => import('./components-user/pago-realizado/pago-realizado.page').then(m => m.PagoRealizadoPage) },
      { path: 'pago-cancelado', loadComponent: () => import('./components-user/pago-cancelado/pago-cancelado.page').then(m => m.PagocanceladoPage) },
      { path: '', redirectTo: 'explorar', pathMatch: 'full' }
    ]
  },

  // ---------- TABS ADMIN ----------//
  {
    path: 'tabs-admin',
    canActivate: [tabsAdminGuard],
    loadComponent: () =>
      import('./components-admin/tabs-admin/tabs-admin.page').then(m => m.TabsAdminPage),
    children: [
      { path: 'evento', loadComponent: () => import('./components-admin/evento/evento.page').then(m => m.EventoPage) },
      { path: 'artista', loadComponent: () => import('./components-admin/artista/artista.page').then(m => m.ArtistaPage) },
      { path: 'lugar', loadComponent: () => import('./components-admin/lugar/lugar.page').then(m => m.LugarPage) },
      { path: 'comprobar', loadComponent: () => import('./components-admin/reporte/reporte.page').then(m => m.ReportePage) },
      { path: 'reporte', loadComponent: () => import('./components-admin/cancelar/cancelar.page').then(m => m.CancelarPage) },
      { path: 'calendario', loadComponent: () => import('./components-admin/calendario/calendario.page').then(m => m.CalendarioPage) },
      { path: '', redirectTo: 'calendario', pathMatch: 'full' }
    ]
  },

  // ---------- PÚBLICAS / AUTH ----------//
  { path: 'start', loadComponent: () => import('./components-pub/start/start.page').then(m => m.StartPage) },
  { path: 'login', loadComponent: () => import('./components-user/login/login.page').then(m => m.LoginPage) },
  { path: 'register', loadComponent: () => import('./components-user/register/register.page').then(m => m.RegisterPage) },
  { path: 'recuperar', loadComponent: () => import('./components-user/recuperar/recuperar.page').then(m => m.RecuperarPage) },
  { path: 'recuperando', loadComponent: () => import('./components-user/recuperando/recuperando.page').then(m => m.RecuperandoPage) },
  { path: 'verificado', loadComponent: () => import('./components-user/verificado/verificado.page').then(m => m.VerificadoPage) },

  // ---------- Error 404 ----------//
  { path: 'notfound', loadComponent: () => import('./components-pub/not-found/not-found.page').then(m => m.NotFoundPage) },
  { path: '**', redirectTo: 'notfound' }
];
