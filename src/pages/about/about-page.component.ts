import { Component, ChangeDetectionStrategy, signal, OnDestroy, Inject, PLATFORM_ID, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PageLayoutComponent } from '../../components/layout/page-layout.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, RouterLink, PageLayoutComponent],
  template: `
    <app-page-layout>
      <!-- Hero Section -->
      <section class="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-32 pb-24 relative overflow-hidden">
        <div class="max-w-5xl z-10">
          <div class="mb-8 animate-fade-in-down opacity-0" style="animation-delay: 0.1s;">
            <span class="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-cyan-500/20 bg-white/50 backdrop-blur-sm text-cyan-900 text-[10px] font-mono uppercase tracking-[0.2em]">
              <span class="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
              Manifesto
            </span>
          </div>
          
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-serif text-slate-900 leading-tight mb-12 animate-reveal-text opacity-0" style="animation-delay: 0.2s;">
            "We don't build software.<br/>
            We <span class="italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600">fold intelligence</span><br/>
            into reality."
          </h1>
          
          <p class="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 font-light leading-relaxed animate-fade-in-up opacity-0" style="animation-delay: 0.4s;">
            TensorFold exists at the intersection of cutting-edge AI research and practical enterprise engineering.
          </p>
        </div>
        
        <!-- Scroll indicator -->
        <div class="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow">
          <span class="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Our Story</span>
          <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      <!-- The Paradox & Method -->
      <section class="py-32 px-6 max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 gap-16">
          <div class="reveal-section" #revealSection>
            <h2 class="text-xs font-mono uppercase tracking-widest text-cyan-600 mb-4">The Paradox</h2>
            <h3 class="text-3xl md:text-4xl font-light text-slate-900 mb-6">
              Static code in a <span class="italic font-serif text-slate-400">dynamic world.</span>
            </h3>
            <p class="text-lg text-slate-500 font-light leading-relaxed">
              Traditional software is static. The world is dynamic. Rules change, contexts shift, and edge cases multiply exponentially. We bridge this gap by creating systems that are not programmed, but taught. Systems that evolve with your business.
            </p>
          </div>
          
          <div class="reveal-section" #revealSection>
            <h2 class="text-xs font-mono uppercase tracking-widest text-cyan-600 mb-4">The Method</h2>
            <h3 class="text-3xl md:text-4xl font-light text-slate-900 mb-6">
              Tensor mathematics meets <span class="italic font-serif text-slate-400">pragmatic engineering.</span>
            </h3>
            <p class="text-lg text-slate-500 font-light leading-relaxed">
              By combining advanced neural architectures with battle-tested engineering practices, we create what we call "Fluid Intelligence" - software that adapts to its environment, learns from interactions, and continuously improves.
            </p>
          </div>
        </div>
      </section>

      <!-- Origin Story / Timeline -->
      <section class="py-32 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div class="absolute inset-0 opacity-30">
          <div class="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]"></div>
          <div class="absolute bottom-0 right-0 w-[600px] h-[600px] bg-violet-500/20 rounded-full blur-[120px]"></div>
        </div>
        
        <div class="max-w-5xl mx-auto relative z-10">
          <div class="text-center mb-20 reveal-section" #revealSection>
            <h2 class="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4">Our Journey</h2>
            <h3 class="text-4xl md:text-5xl font-light">
              From idea to <span class="italic font-serif text-slate-400">impact.</span>
            </h3>
          </div>

          <div class="space-y-12">
            @for (milestone of timeline(); track milestone.year; let i = $index) {
              <div 
                class="relative pl-12 border-l-2 border-cyan-500/30 reveal-card"
                [style.animation-delay]="(i * 100) + 'ms'"
                #revealCard
              >
                <!-- Dot -->
                <div class="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.5)]"></div>
                
                <div class="text-cyan-400 font-mono text-sm mb-2">{{ milestone.year }}</div>
                <h4 class="text-2xl font-medium text-white mb-3">{{ milestone.title }}</h4>
                <p class="text-slate-400 font-light">{{ milestone.desc }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Mission & Vision -->
      <section class="py-32 px-6 max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 gap-16 items-center">
          <div class="reveal-section" #revealSection>
            <h2 class="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">Mission</h2>
            <h3 class="text-4xl md:text-5xl font-light text-slate-900 mb-8">
              Democratize <span class="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-violet-600">intelligence.</span>
            </h3>
            <p class="text-lg text-slate-500 font-light leading-relaxed">
              We believe every organization deserves access to world-class AI capabilities. Our mission is to make sophisticated intelligence infrastructure accessible, practical, and transformative for enterprises of all sizes.
            </p>
          </div>
          
          <div class="reveal-section" #revealSection>
            <h2 class="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">Vision</h2>
            <h3 class="text-4xl md:text-5xl font-light text-slate-900 mb-8">
              The intelligent <span class="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-violet-600">enterprise.</span>
            </h3>
            <p class="text-lg text-slate-500 font-light leading-relaxed">
              We envision a future where AI is seamlessly woven into the fabric of business operations - not as a tool to be used, but as an intelligence layer that augments human capability at every level.
            </p>
          </div>
        </div>
      </section>

      <!-- Stats -->
      <section class="py-32 px-6 bg-gradient-to-br from-slate-50 to-cyan-50/30">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-20 reveal-section" #revealSection>
            <h2 class="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">By The Numbers</h2>
            <h3 class="text-4xl md:text-5xl font-light text-slate-900">
              Impact in <span class="italic font-serif text-slate-400">motion.</span>
            </h3>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            @for (stat of stats(); track stat.label; let i = $index) {
              <div 
                class="text-center p-8 rounded-3xl bg-white shadow-lg reveal-card"
                [style.animation-delay]="(i * 100) + 'ms'"
                #revealCard
              >
                <div class="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 mb-3">
                  {{ stat.value }}
                </div>
                <div class="text-slate-500 font-medium">{{ stat.label }}</div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Principles -->
      <section class="py-32 px-6 max-w-7xl mx-auto">
        <div class="text-center mb-20 reveal-section" #revealSection>
          <h2 class="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">Guiding Principles</h2>
          <h3 class="text-4xl md:text-5xl font-light text-slate-900">
            How we <span class="italic font-serif text-slate-400">operate.</span>
          </h3>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          @for (principle of principles(); track principle.title; let i = $index) {
            <div 
              class="group p-8 rounded-3xl bg-white border border-slate-200/50 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-900/10 reveal-card"
              [style.animation-delay]="(i * 100) + 'ms'"
              #revealCard
            >
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-500">
                <span class="text-white text-2xl" [innerHTML]="principle.icon"></span>
              </div>
              
              <h4 class="text-xl font-medium text-slate-900 mb-3 group-hover:text-cyan-700 transition-colors">
                {{ principle.title }}
              </h4>
              
              <p class="text-slate-500 font-light leading-relaxed">
                {{ principle.desc }}
              </p>
            </div>
          }
        </div>
      </section>

      <!-- CTA -->
      <section class="py-32 px-6 bg-slate-900 text-white">
        <div class="max-w-4xl mx-auto text-center reveal-section" #revealSection>
          <h2 class="text-4xl md:text-6xl font-light mb-8">
            Ready to fold intelligence<br/>
            <span class="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">into your reality?</span>
          </h2>
          <p class="text-xl text-slate-300 font-light mb-12 max-w-2xl mx-auto">
            Let's discuss how we can help transform your operations with intelligent systems.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a routerLink="/contact" class="group inline-flex items-center gap-3 px-10 py-5 bg-cyan-500 text-slate-900 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-cyan-400 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/30">
              Start a Conversation
              <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>
            <a routerLink="/team" class="inline-flex items-center gap-3 px-10 py-5 bg-transparent text-white rounded-full text-sm font-bold uppercase tracking-wider border border-white/30 hover:border-white/60 transition-all duration-300">
              Meet the Team
            </a>
          </div>
        </div>
      </section>
    </app-page-layout>
  `,
  styles: [`
    @keyframes revealText {
      0% { opacity: 0; transform: translateY(40px) scale(0.95); filter: blur(10px); }
      100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
    }
    .animate-reveal-text { animation: revealText 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    @keyframes fadeInUp {
      0% { opacity: 0; transform: translateY(30px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up { animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    @keyframes fadeInDown {
      0% { opacity: 0; transform: translateY(-20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-down { animation: fadeInDown 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    @keyframes bounceSlow {
      0%, 100% { transform: translateX(-50%) translateY(0); }
      50% { transform: translateX(-50%) translateY(10px); }
    }
    .animate-bounce-slow { animation: bounceSlow 2s ease-in-out infinite; }
    .reveal-section, .reveal-card {
      opacity: 0;
      transform: translateY(40px);
      transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    .reveal-section.visible, .reveal-card.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPageComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('revealSection') revealSections!: QueryList<ElementRef>;
  @ViewChildren('revealCard') revealCards!: QueryList<ElementRef>;

  private observer: IntersectionObserver | undefined;

  timeline = signal([
    { year: '2022', title: 'The Beginning', desc: 'Founded with a vision to make enterprise AI accessible and practical.' },
    { year: '2023', title: 'First Major Deployment', desc: 'Delivered our first production RAG system to a Fortune 500 client.' },
    { year: '2023', title: 'Team Expansion', desc: 'Grew to a team of world-class AI engineers and researchers.' },
    { year: '2024', title: 'Research Lab Launch', desc: 'Established TensorFold Labs for cutting-edge AI research.' },
    { year: '2024', title: 'Global Reach', desc: 'Now serving clients across multiple continents and industries.' }
  ]);

  stats = signal([
    { value: '50+', label: 'Projects Delivered' },
    { value: '95%', label: 'Client Retention' },
    { value: '5+', label: 'Countries Served' },
    { value: '24/7', label: 'System Uptime' }
  ]);

  principles = signal([
    { title: 'Ship Real Value', icon: '&#128640;', desc: 'We focus on production systems that deliver measurable business outcomes, not research prototypes.' },
    { title: 'Radical Transparency', icon: '&#128269;', desc: 'We communicate openly about progress, challenges, and trade-offs throughout every engagement.' },
    { title: 'Continuous Learning', icon: '&#128218;', desc: 'The AI field evolves rapidly. We dedicate time to research, experimentation, and skill development.' },
    { title: 'Client Partnership', icon: '&#129309;', desc: 'We work as an extension of your team, deeply invested in your success and growth.' },
    { title: 'Technical Excellence', icon: '&#9881;', desc: 'We maintain the highest standards of code quality, architecture, and engineering practices.' },
    { title: 'Ethical AI', icon: '&#128737;', desc: 'We build systems that are fair, interpretable, and aligned with human values.' }
  ]);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollAnimations();
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private initScrollAnimations() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    [...this.revealSections.toArray(), ...this.revealCards.toArray()].forEach((el) => {
      this.observer?.observe(el.nativeElement);
    });
  }
}
