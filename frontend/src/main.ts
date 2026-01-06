// Importa módulos principales de Angular e Ionic
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideRouter, withPreloading, PreloadAllModules, withHashLocation } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

// Importa el componente principal y rutas
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { tokenInterceptor } from './app/core/token.interceptor';

// Importa y registra iconos de Ionicons
import { addIcons } from 'ionicons';
import {
  homeOutline, searchOutline, ticketOutline, cartOutline,
  chatbubbleEllipsesOutline, calendarOutline, micOutline, timeOutline,
  documentTextOutline, closeCircleOutline, logOutOutline, settingsOutline,
  personCircle, locationOutline, qrCodeOutline, cameraOutline, logoPaypal
} from 'ionicons/icons';

// Registro de iconos personalizados
addIcons({
  'paypal-outline': logoPaypal,
  'camera-outline': cameraOutline,
  'qr-code-outline': qrCodeOutline,
  'location-outline': locationOutline,
  'person-circle-outline': personCircle,
  'settings-outline': settingsOutline,
  'home-outline': homeOutline,
  'search-outline': searchOutline,
  'ticket-outline': ticketOutline,
  'cart-outline': cartOutline,
  'chatbubble-ellipses-outline': chatbubbleEllipsesOutline,
  'calendar-outline': calendarOutline,
  'mic-outline': micOutline,
  'time-outline': timeOutline,
  'document-text-outline': documentTextOutline,
  'close-circle-outline': closeCircleOutline,
  'log-out-outline': logOutOutline
});

// Inicializa la aplicación con configuración de Ionic, rutas y HTTP
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withHashLocation() // 🔥 Necesario para GitHub Pages
    ),
    provideHttpClient(withInterceptors([tokenInterceptor])),
  ],
});


// Sobrescribe window.alert con un diseño personalizado en HTML/CSS
window.alert = (mensaje: string) => {
  setTimeout(() => {
    if (document.getElementById('custom-alert')) return;

    const overlay = document.createElement('div');
    overlay.id = 'custom-alert';
    overlay.className = 'custom-alert-overlay';

    const box = document.createElement('div');
    box.className = 'custom-alert-box';

    const text = document.createElement('p');
    text.className = 'custom-alert-message';
    text.textContent = mensaje;

    const button = document.createElement('button');
    button.className = 'custom-alert-button';
    button.textContent = 'OK';
    button.addEventListener('click', () => document.body.removeChild(overlay));

    box.appendChild(text);
    box.appendChild(button);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  }, 0);
};

