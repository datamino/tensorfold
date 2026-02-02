
import { Component, ChangeDetectionStrategy, signal, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ParticleWaveComponent } from './particle-wave.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ParticleWaveComponent],
  template: `
    <section class="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-32 relative overflow-hidden">
      
      <!-- New Animated Wireframe Wave -->
      <app-particle-wave class="absolute inset-0 z-0 opacity-60"></app-particle-wave>
      
      <!-- Central Beam -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-screen bg-gradient-to-b from-transparent via-slate-300 to-transparent opacity-40"></div>
      
      <div class="max-w-6xl z-10 flex flex-col items-center">
        <!-- Status Pill -->
        <div class="mb-10 animate-fade-in-down opacity-0" style="animation-delay: 0.1s;">
          <span class="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-cyan-500/20 bg-white/50 backdrop-blur-sm text-cyan-900 text-[10px] font-mono uppercase tracking-[0.2em] shadow-sm hover:border-cyan-500/50 transition-colors cursor-default">
            <span class="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
            System Online • v.4.0.1
          </span>
        </div>

        <!-- Main Headline -->
        <h1 class="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-slate-900 leading-[0.9] mb-12 relative flex flex-col items-center">
          <span class="block animate-reveal-text opacity-0" style="animation-delay: 0.2s;">Beyond</span>
          
          <!-- Typewriter Container -->
          <span class="block mt-2 h-[1.1em] animate-reveal-text opacity-0 flex items-center justify-center" style="animation-delay: 0.4s;">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600 pb-2">
              {{ displayedText() }}
            </span>
            <span class="w-[3px] md:w-[6px] h-[0.7em] bg-cyan-500 ml-2 animate-blink shadow-[0_0_10px_rgba(6,182,212,0.5)]"></span>
          </span>
        </h1>

        <!-- Subtext -->
        <p class="max-w-xl text-lg md:text-xl text-slate-500 font-light leading-relaxed mb-16 animate-fade-in-up opacity-0" style="animation-delay: 0.6s;">
          Custom AI systems, machine learning platforms, and intelligent software built to evolve with your business reality.
        </p>

        <!-- CTA Button -->
        <div class="animate-fade-in-up opacity-0" style="animation-delay: 0.8s;">
          <a href="#services" class="group relative inline-flex items-center gap-4 px-10 py-5 bg-transparent border border-slate-300 rounded-full overflow-hidden transition-all duration-500 hover:border-slate-400 hover:shadow-xl hover:shadow-cyan-900/5 hover:-translate-y-1">
            <span class="relative z-10 text-xs font-bold tracking-[0.15em] uppercase group-hover:text-cyan-900 transition-colors">Enter the System</span>
            
            <svg class="w-4 h-4 relative z-10 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-cyan-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
            
            <!-- Button Background Animation -->
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-50 via-white to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-700 group-hover:w-full"></div>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .animate-blink {
      animation: blink 1.1s step-end infinite;
    }

    @keyframes revealText {
      0% { opacity: 0; transform: translateY(40px) scale(0.95); filter: blur(10px); }
      100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
    }
    .animate-reveal-text {
      animation: revealText 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes fadeInUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up {
      animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes fadeInDown {
      0% { opacity: 0; transform: translateY(-20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-down {
      animation: fadeInDown 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent implements OnInit, OnDestroy {
  displayedText = signal('');
  
  private phrases = [
    "Intelligence",
    "Algorithms",
    "Boundaries",
    "Reality "
  ];
  
  private loopNum = 0;
  private isDeleting = false;
  private txt = '';
  private timeoutId: any;
  
  // Adjusted speeds: Faster typing, very fast deletion
  private readonly typeSpeed = 70;
  private readonly deleteSpeed = 20; 
  private readonly pauseTime = 2000;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.tick(), 1000);
    }
  }

  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  private tick() {
    const i = this.loopNum % this.phrases.length;
    const fullTxt = this.phrases[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.displayedText.set(this.txt);

    let delta = this.typeSpeed;

    if (this.isDeleting) {
      delta = this.deleteSpeed;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.pauseTime;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    this.timeoutId = setTimeout(() => {
      this.tick();
    }, delta);
  }
}
