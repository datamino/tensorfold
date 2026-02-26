
import { Component, ChangeDetectionStrategy, signal, Inject, PLATFORM_ID, OnInit, OnDestroy, Input } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="pointer-events-auto glass-panel pl-6 pr-2 py-2.5 rounded-full flex items-center gap-8 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-900/5 hover:scale-[1.005]">
      <!-- Logo -->
      <a routerLink="/" class="font-bold text-lg tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 cursor-pointer mr-2 hover:opacity-80 transition-opacity">
        TENSORFOLD
      </a>
      
      <!-- Menu Items - Always use router links to dedicated pages -->
      <div class="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-500">
        @for (item of routerMenuItems(); track item.label) {
          <a [routerLink]="item.route" 
             routerLinkActive="text-slate-900 bg-white/50"
             [routerLinkActiveOptions]="{ exact: item.route === '/' }"
             class="relative px-4 py-2 rounded-full transition-all duration-300 hover:text-slate-900 group">
            
            {{ item.label }}
            
            <!-- Hover Underline (Animated) -->
            <span class="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-slate-300 transition-all duration-300 group-hover:w-1/2"></span>
          </a>
        }
      </div>

      <!-- Action Button - Always use router link -->
      <a routerLink="/contact" class="relative overflow-hidden group bg-slate-900 text-white px-6 py-2.5 rounded-full text-[11px] font-mono uppercase tracking-widest transition-all duration-300 hover:bg-slate-800 shadow-lg shadow-slate-900/20 hover:shadow-cyan-900/20 hover:pr-8">
        <span class="relative z-10">Connect</span>
        <span class="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-cyan-400">-></span>
        <div class="absolute inset-0 bg-gradient-to-r from-cyan-900 to-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </a>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavMenuComponent implements OnInit, OnDestroy {
  @Input() isLandingPage = true;

  // For landing page anchor navigation
  landingMenuItems = signal([
    { label: 'Services', href: '#services' },
    { label: 'Case Studies', href: '#casestudies' },
    { label: 'Research', href: '#research' },
    { label: 'Team', href: '#careers' },
    { label: 'Blog', href: '#insights' },
    { label: 'About', href: '#about' }
  ]);

  // For routed pages
  routerMenuItems = signal([
    { label: 'Services', route: '/services' },
    { label: 'Case Studies', route: '/case-studies' },
    { label: 'Research', route: '/research' },
    { label: 'Team', route: '/team' },
    { label: 'Blog', route: '/blog' },
    { label: 'About', route: '/about' }
  ]);

  activeSection = signal<string>('');
  private scrollListener: any;
  private routerSubscription: Subscription | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.isLandingPage) {
        this.scrollListener = () => this.onScroll();
        window.addEventListener('scroll', this.scrollListener, { passive: true });
        this.onScroll();
      }
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.scrollListener) {
        window.removeEventListener('scroll', this.scrollListener);
      }
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  scrollToTop(e: Event) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.activeSection.set('');
  }

  setActive(id: string) {
    this.activeSection.set(id.substring(1));
  }

  onScroll() {
    if (!this.isLandingPage) return;
    
    const scrollPosition = window.scrollY + 150;

    if (scrollPosition < 300) {
      this.activeSection.set('');
      return;
    }

    for (const item of this.landingMenuItems()) {
      const targetId = item.href.substring(1);
      const element = document.getElementById(targetId);

      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          this.activeSection.set(targetId);
          break;
        }
      }
    }
  }
}
