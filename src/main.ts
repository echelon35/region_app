import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';


bootstrapApplication(AppComponent, {  providers: [
  provideRouter(routes),
  provideHttpClient(),
]})
.catch(err => console.error(err));
