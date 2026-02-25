
import { Component, ChangeDetectionStrategy, signal, ElementRef, ViewChildren, QueryList, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  template: `
    <section class="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full">
      <div class="flex flex-col md:flex-row gap-16">
        
        <!-- Sticky Header -->
        <div class="md:w-1/3">
          <div class="sticky top-32">
            <h2 class="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">Our Services</h2>
            <h3 class="text-3xl md:text-4xl font-light text-slate-800 mb-6">
              Fold intelligence into <br/>
              <span class="italic font-serif text-slate-400">every process.</span>
            </h3>
            <p class="text-slate-500 font-light leading-relaxed">
             We build the intelligence infrastructure that enables enterprises to operate faster, decide smarter, and scale with confidence.
            </p>
          </div>
        </div>

        <!-- Service List -->
        <div class="md:w-2/3 flex flex-col">
          @for (service of services(); track service.id) {
            <div 
              #serviceItem
              [attr.data-id]="service.id"
              class="group relative py-12 border-t border-slate-200 transition-all duration-500 hover:border-slate-400 cursor-default"
              (mouseenter)="hoveredService.set(service.id)"
              (mouseleave)="hoveredService.set(null)"
            >
              <div class="flex justify-between items-baseline mb-4">
                <h4 class="text-3xl md:text-5xl font-light text-slate-900 transition-all duration-500 group-hover:translate-x-4"
                    [class.translate-x-4]="activeService() === service.id">
                  {{ service.title }}
                </h4>
                <span class="font-mono text-xs text-slate-300 group-hover:text-cyan-600 transition-colors"
                      [class.text-cyan-600]="activeService() === service.id">
                  0{{ service.id }}
                </span>
              </div>
              
              <div class="overflow-hidden transition-all duration-500 max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100"
                   [class.max-h-40]="activeService() === service.id"
                   [class.opacity-100]="activeService() === service.id">
                <p class="text-slate-500 font-light pl-4 md:pl-8 max-w-md">
                  {{ service.desc }}
                </p>
              </div>
              
              <!-- Hover Gradient -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-cyan-50/30 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700"
                   [class.opacity-100]="activeService() === service.id"></div>
            </div>
          }
        </div>

      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('serviceItem') serviceItems!: QueryList<ElementRef>;

  hoveredService = signal<number | null>(null);
  activeService = signal<number | null>(null);

  services = signal([
    { id: 1, title: 'AI Strategy & Systems Architecture', desc: 'Strategic design of enterprise AI architecture aligned with long-term business objectives.' },
    { id: 2, title: 'Machine Learning & Data Science', desc: 'High-performance predictive models and advanced analytics engineered for competitive advantage.' },
    { id: 3, title: 'Agentic Systems & Applied GenAI', desc: 'Design and deployment of autonomous AI agents, RAG Systems, and generative AI applications that execute complex workflows with contextual awareness.' },
    { id: 4, title: 'MLOps & LLMOps Engineering', desc: 'Production-grade lifecycle engineering for machine learning and generative AI systems, enabling scalable deployment, observability, continuous optimization, and resilient performance.' },
    { id: 5, title: 'Data Engineering & Intelligence Platforms', desc: 'Modern data architectures powering RAG systems, real-time analytics, and unified intelligence layers across structured and unstructured environments.' }
  ]);

  private observer: IntersectionObserver | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initObserver();
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private initObserver() {
    const options = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Triggers when element is in the vertical center band (20% height) of viewport
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = Number(entry.target.getAttribute('data-id'));
          this.activeService.set(id);
        }
      });
    }, options);

    this.serviceItems.forEach((item) => {
      this.observer?.observe(item.nativeElement);
    });
  }
}
