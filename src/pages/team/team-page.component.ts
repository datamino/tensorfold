import { Component, ChangeDetectionStrategy, signal, OnDestroy, Inject, PLATFORM_ID, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PageLayoutComponent } from '../../components/layout/page-layout.component';

@Component({
  selector: 'app-team-page',
  standalone: true,
  imports: [CommonModule, RouterLink, PageLayoutComponent],
  template: `
    <app-page-layout>
      <!-- Hero Section -->
      <section class="min-h-[70vh] flex flex-col justify-center items-center text-center px-6 pt-32 pb-16 relative overflow-hidden">
        <div class="max-w-5xl z-10">
          <div class="mb-8 animate-fade-in-down opacity-0" style="animation-delay: 0.1s;">
            <span class="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-cyan-500/20 bg-white/50 backdrop-blur-sm text-cyan-900 text-[10px] font-mono uppercase tracking-[0.2em]">
              <span class="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
              The People
            </span>
          </div>
          
          <h1 class="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-slate-900 leading-[0.95] mb-8 animate-reveal-text opacity-0" style="animation-delay: 0.2s;">
            The Architects<br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600">Behind TensorFold</span>
          </h1>
          
          <p class="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 font-light leading-relaxed animate-fade-in-up opacity-0" style="animation-delay: 0.4s;">
            A high-performance unit of AI architects, ML engineers, and data specialists building real, production-ready systems.
          </p>
        </div>
      </section>

      <!-- Team Grid -->
      <section class="py-24 px-6 max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (member of team(); track member.name; let i = $index) {
            <div 
              class="group relative reveal-card"
              [style.animation-delay]="(i * 100) + 'ms'"
              #revealCard
            >
              <!-- Card -->
              <div class="relative h-full p-8 rounded-3xl bg-white border border-slate-200/50 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-900/10 hover:-translate-y-2 overflow-hidden">
                <!-- Background gradient on hover -->
                <div class="absolute inset-0 bg-gradient-to-br from-cyan-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div class="relative z-10">
                  <!-- Avatar -->
                  <div class="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-500">
                    <span class="text-white text-3xl font-bold">{{ member.initials }}</span>
                  </div>
                  
                  <h3 class="text-2xl font-medium text-slate-900 mb-2 group-hover:text-cyan-700 transition-colors">
                    {{ member.name }}
                  </h3>
                  
                  <p class="text-cyan-600 font-mono text-sm mb-4">{{ member.role }}</p>
                  
                  <p class="text-slate-500 font-light leading-relaxed mb-6">
                    {{ member.bio }}
                  </p>
                  
                  <!-- Skills -->
                  <div class="flex flex-wrap gap-2 mb-6">
                    @for (skill of member.skills; track skill) {
                      <span class="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs">{{ skill }}</span>
                    }
                  </div>
                  
                  <!-- LinkedIn -->
                  @if (member.linkedin) {
                    <a [href]="member.linkedin" target="_blank" rel="noopener noreferrer" 
                       class="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-600 transition-colors text-sm">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd"></path>
                      </svg>
                      Connect on LinkedIn
                    </a>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- Values Section -->
      <section class="py-32 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div class="absolute inset-0 opacity-30">
          <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]"></div>
          <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-500/20 rounded-full blur-[120px]"></div>
        </div>
        
        <div class="max-w-7xl mx-auto relative z-10">
          <div class="text-center mb-20 reveal-section" #revealSection>
            <h2 class="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4">Our Values</h2>
            <h3 class="text-4xl md:text-5xl font-light">
              What drives <span class="italic font-serif text-slate-400">us.</span>
            </h3>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            @for (value of values(); track value.title; let i = $index) {
              <div 
                class="text-center reveal-card"
                [style.animation-delay]="(i * 100) + 'ms'"
                #revealCard
              >
                <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/30">
                  <span class="text-white text-2xl" [innerHTML]="value.icon"></span>
                </div>
                <h4 class="text-xl font-medium text-white mb-3">{{ value.title }}</h4>
                <p class="text-slate-400 font-light text-sm">{{ value.desc }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Culture Section -->
      <section class="py-32 px-6 max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 gap-16 items-center">
          <div class="reveal-section" #revealSection>
            <h2 class="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">Culture</h2>
            <h3 class="text-4xl md:text-5xl font-light text-slate-900 mb-8">
              Building the <span class="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-violet-600">future together.</span>
            </h3>
            <p class="text-lg text-slate-500 font-light leading-relaxed mb-8">
              We believe in deep work, continuous learning, and the power of small, focused teams. Our remote-first culture enables us to attract exceptional talent from around the world while maintaining the tight collaboration that complex AI projects demand.
            </p>
            <div class="space-y-4">
              @for (perk of perks(); track perk) {
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center">
                    <svg class="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span class="text-slate-700">{{ perk }}</span>
                </div>
              }
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4 reveal-section" #revealSection>
            <div class="space-y-4">
              <div class="h-40 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-6 flex flex-col justify-end text-white">
                <div class="text-3xl font-bold">100%</div>
                <div class="text-sm opacity-80">Remote</div>
              </div>
              <div class="h-32 rounded-2xl bg-slate-100 p-6 flex flex-col justify-end">
                <div class="text-2xl font-bold text-slate-900">5+</div>
                <div class="text-sm text-slate-500">Countries</div>
              </div>
            </div>
            <div class="space-y-4 mt-8">
              <div class="h-32 rounded-2xl bg-slate-100 p-6 flex flex-col justify-end">
                <div class="text-2xl font-bold text-slate-900">Async</div>
                <div class="text-sm text-slate-500">First</div>
              </div>
              <div class="h-40 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-600 p-6 flex flex-col justify-end text-white">
                <div class="text-3xl font-bold">Deep</div>
                <div class="text-sm opacity-80">Work Focus</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="py-32 px-6 bg-gradient-to-br from-slate-50 to-cyan-50/30">
        <div class="max-w-4xl mx-auto text-center reveal-section" #revealSection>
          <h2 class="text-4xl md:text-6xl font-light text-slate-900 mb-8">
            Join the <span class="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-violet-600">team.</span>
          </h2>
          <p class="text-xl text-slate-500 font-light mb-12 max-w-2xl mx-auto">
            We're always looking for exceptional people who want to push the boundaries of what's possible with AI.
          </p>
          <a routerLink="/contact" class="group inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-full text-sm font-bold uppercase tracking-wider hover:bg-cyan-600 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-600/20">
            Get in Touch
            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </a>
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
export class TeamPageComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('revealSection') revealSections!: QueryList<ElementRef>;
  @ViewChildren('revealCard') revealCards!: QueryList<ElementRef>;

  private observer: IntersectionObserver | undefined;

  team = signal([
    { name: 'Ahsan Aftab', initials: 'AA', role: 'Founder & CEO | Chief AI Architect', bio: 'Leading the vision and technical direction of TensorFold. Expert in enterprise AI systems and neural architecture design.', skills: ['AI Strategy', 'System Design', 'Leadership'], linkedin: 'https://www.linkedin.com/in/ahsan-aftab-a49772176/' },
    { name: 'Tazmeen Afroz', initials: 'TA', role: 'Full Stack AI Engineer', bio: 'Building end-to-end AI applications from data pipelines to user interfaces. Specializes in integrating LLMs into production systems.', skills: ['Full Stack', 'LLMs', 'Python'], linkedin: 'https://www.linkedin.com/in/tazmeen-afroz/' },
    { name: 'Mubasher Shahzad', initials: 'MS', role: 'ML Engineer', bio: 'Developing and deploying machine learning models at scale. Expert in MLOps and model optimization techniques.', skills: ['MLOps', 'PyTorch', 'Kubernetes'], linkedin: 'https://www.linkedin.com/in/mubasher-shahzad-64911b181/' },
    { name: 'Marvan Shahid', initials: 'MS', role: 'Product Designer', bio: 'Crafting intuitive user experiences for complex AI-powered products. Focused on making intelligence accessible and beautiful.', skills: ['UI/UX', 'Design Systems', 'Figma'], linkedin: 'https://www.linkedin.com/in/marvan-shahid-534aa4319/' },
    { name: 'Tayyab Riaz', initials: 'TR', role: 'Data Scientist', bio: 'Transforming raw data into actionable intelligence. Specializes in statistical modeling and predictive analytics.', skills: ['Data Science', 'Statistics', 'Python'], linkedin: 'https://www.linkedin.com/in/datamino/' }
  ]);

  values = signal([
    { title: 'Excellence', icon: '&#127942;', desc: 'We strive for the highest quality in everything we build.' },
    { title: 'Innovation', icon: '&#128161;', desc: 'Constantly pushing boundaries and exploring new possibilities.' },
    { title: 'Integrity', icon: '&#128737;', desc: 'Honest, transparent, and ethical in all our dealings.' },
    { title: 'Impact', icon: '&#127793;', desc: 'Focused on creating real, measurable value for clients.' }
  ]);

  perks = signal([
    'Remote-first, async-friendly culture',
    'Competitive compensation & equity',
    'Continuous learning budget',
    'Flexible working hours',
    'Health & wellness benefits',
    'Annual team retreats'
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
