import { Component, ChangeDetectionStrategy, signal, OnDestroy, Inject, PLATFORM_ID, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PageLayoutComponent } from '../../components/layout/page-layout.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, RouterLink, PageLayoutComponent],
  template: `
    <app-page-layout>
      <!-- Hero Section -->
      <section class="min-h-[60vh] flex flex-col justify-center items-center text-center px-6 pt-32 pb-16 relative overflow-hidden">
        <div class="max-w-5xl z-10">
          <div class="mb-8 animate-fade-in-down opacity-0" style="animation-delay: 0.1s;">
            <span class="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-cyan-500/20 bg-white/50 backdrop-blur-sm text-cyan-900 text-[10px] font-mono uppercase tracking-[0.2em]">
              <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Ready to Connect
            </span>
          </div>
          
          <h1 class="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-slate-900 leading-[0.95] mb-8 animate-reveal-text opacity-0" style="animation-delay: 0.2s;">
            Start the<br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600">Transmission</span>
          </h1>
          
          <p class="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 font-light leading-relaxed animate-fade-in-up opacity-0" style="animation-delay: 0.4s;">
            Whether you're exploring AI possibilities or ready to deploy, we'd love to hear from you.
          </p>
        </div>
      </section>

      <!-- Contact Form + Info -->
      <section class="py-24 px-6 max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-5 gap-16">
          <!-- Form -->
          <div class="lg:col-span-3 reveal-section" #revealSection>
            <form class="space-y-8">
              <div class="grid md:grid-cols-2 gap-8">
                <div class="space-y-2">
                  <label class="text-sm font-medium text-slate-700">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    class="w-full px-6 py-4 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  >
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-medium text-slate-700">Work Email</label>
                  <input 
                    type="email" 
                    placeholder="john@company.com"
                    class="w-full px-6 py-4 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  >
                </div>
              </div>
              
              <div class="grid md:grid-cols-2 gap-8">
                <div class="space-y-2">
                  <label class="text-sm font-medium text-slate-700">Company</label>
                  <input 
                    type="text" 
                    placeholder="Company Name"
                    class="w-full px-6 py-4 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  >
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-medium text-slate-700">Project Type</label>
                  <select class="w-full px-6 py-4 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all appearance-none cursor-pointer">
                    <option value="">Select a project type</option>
                    <option value="rag">RAG / Retrieval Systems</option>
                    <option value="agents">Agentic AI Systems</option>
                    <option value="mlops">MLOps / LLMOps</option>
                    <option value="ml">Machine Learning</option>
                    <option value="data">Data Engineering</option>
                    <option value="strategy">AI Strategy</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-8">
                <div class="space-y-2">
                  <label class="text-sm font-medium text-slate-700">Budget Range</label>
                  <select class="w-full px-6 py-4 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all appearance-none cursor-pointer">
                    <option value="">Select budget range</option>
                    <option value="25k-50k">$25K - $50K</option>
                    <option value="50k-100k">$50K - $100K</option>
                    <option value="100k-250k">$100K - $250K</option>
                    <option value="250k+">$250K+</option>
                    <option value="not-sure">Not sure yet</option>
                  </select>
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-medium text-slate-700">Timeline</label>
                  <select class="w-full px-6 py-4 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all appearance-none cursor-pointer">
                    <option value="">Select timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="1-3m">1-3 months</option>
                    <option value="3-6m">3-6 months</option>
                    <option value="6m+">6+ months</option>
                    <option value="exploring">Just exploring</option>
                  </select>
                </div>
              </div>
              
              <div class="space-y-2">
                <label class="text-sm font-medium text-slate-700">Project Details</label>
                <textarea 
                  rows="6"
                  placeholder="Tell us about your project, challenges, and goals..."
                  class="w-full px-6 py-4 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                ></textarea>
              </div>
              
              <button 
                type="submit"
                class="group w-full md:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-full text-sm font-bold uppercase tracking-wider hover:bg-cyan-600 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-600/20"
              >
                Send Message
                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </button>
            </form>
          </div>

          <!-- Contact Info -->
          <div class="lg:col-span-2 space-y-12 reveal-section" #revealSection>
            <!-- Response Time -->
            <div class="p-6 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100">
              <div class="flex items-center gap-3 mb-3">
                <span class="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                <span class="text-sm font-medium text-slate-700">Typical Response Time</span>
              </div>
              <p class="text-2xl font-bold text-slate-900">Within 24 hours</p>
              <p class="text-sm text-slate-500 mt-1">We read every message personally.</p>
            </div>

            <!-- Contact Methods -->
            <div class="space-y-6">
              <h3 class="text-sm font-mono uppercase tracking-widest text-slate-400">Direct Contact</h3>
              
              <a href="mailto:hello@tensorfold.ai" class="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-cyan-500 transition-all group">
                <div class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
                  <svg class="w-5 h-5 text-slate-600 group-hover:text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <div class="text-sm text-slate-500">Email</div>
                  <div class="text-slate-900 font-medium">hello&#64;tensorfold.ai</div>
                </div>
              </a>
              
              <a href="https://linkedin.com/company/tensorfold" target="_blank" class="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-cyan-500 transition-all group">
                <div class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
                  <svg class="w-5 h-5 text-slate-600 group-hover:text-cyan-600" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <div class="text-sm text-slate-500">LinkedIn</div>
                  <div class="text-slate-900 font-medium">TensorFold</div>
                </div>
              </a>
            </div>

            <!-- Office -->
            <div class="space-y-4">
              <h3 class="text-sm font-mono uppercase tracking-widest text-slate-400">Headquarters</h3>
              <div class="p-4 rounded-xl bg-white border border-slate-200">
                <p class="text-slate-700 font-medium">Remote-First Company</p>
                <p class="text-slate-500 text-sm mt-1">Serving clients globally from our distributed team.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="py-32 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div class="absolute inset-0 opacity-30">
          <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]"></div>
        </div>
        
        <div class="max-w-4xl mx-auto relative z-10">
          <div class="text-center mb-16 reveal-section" #revealSection>
            <h2 class="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4">FAQ</h2>
            <h3 class="text-4xl md:text-5xl font-light">
              Common <span class="italic font-serif text-slate-400">questions.</span>
            </h3>
          </div>

          <div class="space-y-4">
            @for (faq of faqs(); track faq.question; let i = $index) {
              <div 
                class="reveal-card"
                [style.animation-delay]="(i * 100) + 'ms'"
                #revealCard
              >
                <button 
                  (click)="toggleFaq(i)"
                  class="w-full p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all text-left group"
                >
                  <div class="flex items-center justify-between gap-4">
                    <h4 class="text-lg font-medium text-white group-hover:text-cyan-400 transition-colors">
                      {{ faq.question }}
                    </h4>
                    <svg 
                      class="w-5 h-5 text-slate-400 transition-transform duration-300"
                      [class.rotate-180]="openFaq() === i"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                  @if (openFaq() === i) {
                    <p class="mt-4 text-slate-400 font-light leading-relaxed">
                      {{ faq.answer }}
                    </p>
                  }
                </button>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Final CTA -->
      <section class="py-32 px-6 bg-gradient-to-br from-slate-50 to-cyan-50/30">
        <div class="max-w-4xl mx-auto text-center reveal-section" #revealSection>
          <h2 class="text-4xl md:text-5xl font-light text-slate-900 mb-6">
            Prefer a quick call?
          </h2>
          <p class="text-xl text-slate-500 font-light mb-8">
            Schedule a 30-minute discovery call to discuss your project.
          </p>
          <a href="#" class="group inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-900 rounded-full text-sm font-bold uppercase tracking-wider border-2 border-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            Schedule a Call
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
export class ContactPageComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('revealSection') revealSections!: QueryList<ElementRef>;
  @ViewChildren('revealCard') revealCards!: QueryList<ElementRef>;

  private observer: IntersectionObserver | undefined;

  openFaq = signal<number | null>(null);

  faqs = signal([
    { question: 'What types of AI projects do you work on?', answer: 'We specialize in production AI systems including RAG pipelines, agentic AI, MLOps, custom model development, and data engineering. Our focus is on enterprise-grade solutions that deliver measurable business value.' },
    { question: 'How long does a typical project take?', answer: 'Project timelines vary based on complexity. Simple POCs can be delivered in 4-6 weeks, while full production systems typically take 3-6 months. We\'ll provide a detailed timeline estimate after our discovery call.' },
    { question: 'Do you work with startups or only enterprises?', answer: 'We work with organizations of all sizes, from funded startups to Fortune 500 companies. What matters most is having a clear AI use case and commitment to bringing it to production.' },
    { question: 'What\'s your engagement model?', answer: 'We typically work on a project basis with clear milestones and deliverables. For ongoing needs, we also offer retainer arrangements for continuous support and development.' },
    { question: 'Can you work with our existing tech stack?', answer: 'We\'re flexible with technology choices and can work with your existing infrastructure. We\'ll recommend the best tools for your specific needs while considering your team\'s familiarity and maintenance requirements.' }
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

  toggleFaq(index: number) {
    if (this.openFaq() === index) {
      this.openFaq.set(null);
    } else {
      this.openFaq.set(index);
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
