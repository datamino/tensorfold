
import { Component, ChangeDetectionStrategy, signal, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="pointer-events-auto glass-panel pl-6 pr-2 py-2.5 rounded-full flex items-center gap-8 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-900/5 hover:scale-[1.005]">
      <!-- Logo -->
      <a href="#" class="font-bold text-lg tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 cursor-pointer mr-2 hover:opacity-80 transition-opacity" (click)="scrollToTop($event)">
        TENSORFOLD
      </a>
      
      <!-- Menu Items -->
      <div class="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-500">
        @for (item of menuItems(); track item.label) {
          <a [href]="item.href" 
             (click)="setActive(item.href)"
             class="relative px-4 py-2 rounded-full transition-all duration-300 hover:text-slate-900 group"
             [class.text-slate-900]="activeSection() === item.href.substring(1)"
             [class.bg-white/50]="activeSection() === item.href.substring(1)">
            
            {{ item.label }}
            
            <!-- Active Indicator Dot -->
            @if (activeSection() === item.href.substring(1)) {
              <span class="absolute top-1/2 -translate-y-1/2 left-2 w-1 h-1 bg-cyan-500 rounded-full"></span>
            }
            
            <!-- Hover Underline (Animated) -->
            <span class="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-slate-300 transition-all duration-300 group-hover:w-1/2"></span>
          </a>
        }
      </div>

      <!-- Action Button -->
      <a href="#contact" class="relative overflow-hidden group bg-slate-900 text-white px-6 py-2.5 rounded-full text-[11px] font-mono uppercase tracking-widest transition-all duration-300 hover:bg-slate-800 shadow-lg shadow-slate-900/20 hover:shadow-cyan-900/20 hover:pr-8">
        <span class="relative z-10">Connect</span>
        <span class="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-cyan-400">-></span>
        <div class="absolute inset-0 bg-gradient-to-r from-cyan-900 to-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </a>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavMenuComponent implements OnInit, OnDestroy {
  menuItems = signal([
    { label: 'Services', href: '#services' },
    { label: 'Case Studies', href: '#casestudies' },
    { label: 'Research', href: '#research' },
    { label: 'Careers', href: '#careers' },
    { label: 'Insights', href: '#insights' },
    { label: 'About', href: '#about' }
  ]);

  activeSection = signal<string>('');
  private scrollListener: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollListener = () => this.onScroll();
      window.addEventListener('scroll', this.scrollListener, { passive: true });
      this.onScroll(); // Initial check
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.scrollListener);
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
    const scrollPosition = window.scrollY + 150; // Offset

    // Default to empty if at top
    if (scrollPosition < 300) {
      this.activeSection.set('');
      return;
    }

    for (const item of this.menuItems()) {
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
