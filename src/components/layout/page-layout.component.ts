import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BackgroundFlowComponent } from '../background-flow.component';
import { NavMenuComponent } from '../nav-menu.component';
import { FooterComponent } from '../footer.component';

@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [
    BackgroundFlowComponent,
    NavMenuComponent,
    FooterComponent
  ],
  template: `
    <div class="relative w-full min-h-screen text-slate-800 selection:bg-cyan-200 selection:text-cyan-900">
      <!-- Living Background Layer -->
      <app-background-flow class="fixed inset-0 z-0 pointer-events-none"></app-background-flow>

      <!-- Navigation -->
      <app-nav-menu class="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none" [isLandingPage]="false"></app-nav-menu>

      <!-- Page Content -->
      <main class="relative z-10 flex flex-col gap-0 pb-0">
        <ng-content></ng-content>
      </main>
      
      <app-footer></app-footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLayoutComponent {}
