
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withViewTransitions, withInMemoryScrolling } from '@angular/router';
import { AppComponent } from './src/app.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { routes } from './src/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withViewTransitions(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' })
    )
  ]
}).catch((err) => console.error(err));

// AI Studio always uses an `index.tsx` file for all project types.
