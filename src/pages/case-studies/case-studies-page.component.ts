import { Component, ChangeDetectionStrategy, signal, OnInit, OnDestroy, Inject, PLATFORM_ID, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PageLayoutComponent } from '../../components/layout/page-layout.component';

@Component({
  selector: 'app-case-studies-page',
  standalone: true,
  imports: [CommonModule, RouterLink, PageLayoutComponent],
  template: `
    <app-page-layout>
      <!-- Hero Section -->
      <section class="min-h-[80vh] flex flex-col justify-center items-center text-center px-6 pt-32 pb-16 relative overflow-hidden">
        <div class="max-w-5xl z-10">
          <div class="mb-8 animate-fade-in-down opacity-0" style="animation-delay: 0.1s;">
            <span class="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-cyan-500/20 bg-white/50 backdrop-blur-sm text-cyan-900 text-[10px] font-mono uppercase tracking-[0.2em]">
              <span class="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
              Impact Stories
            </span>
          </div>
          
          <h1 class="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-slate-900 leading-[0.95] mb-8 animate-reveal-text opacity-0" style="animation-delay: 0.2s;">
            Transforming<br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600">Industries</span>
          </h1>
          
          <p class="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 font-light leading-relaxed animate-fade-in-up opacity-0" style="animation-delay: 0.4s;">
            Real results from production AI systems. See how we've helped enterprises unlock new capabilities and drive measurable outcomes.
          </p>
        </div>
      </section>

      <!-- Stats Bar -->
      <section class="py-12 px-6 bg-slate-900">
        <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          @for (stat of stats(); track stat.label; let i = $index) {
            <div class="text-center reveal-card" [style.animation-delay]="(i * 100) + 'ms'" #revealCard>
              <div class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">
                {{ stat.value }}
              </div>
              <div class="text-sm text-slate-400 font-mono uppercase tracking-wider">{{ stat.label }}</div>
            </div>
          }
        </div>
      </section>

      <!-- Filter Pills -->
      <section class="py-12 px-6 sticky top-20 z-30 bg-slate-50/80 backdrop-blur-md border-b border-slate-200/50">
        <div class="max-w-7xl mx-auto flex flex-wrap gap-3 justify-center">
          @for (filter of filters(); track filter) {
            <button 
              (click)="setFilter(filter)"
              class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
              [class.bg-slate-900]="activeFilter() === filter"
              [class.text-white]="activeFilter() === filter"
              [class.bg-white]="activeFilter() !== filter"
              [class.text-slate-600]="activeFilter() !== filter"
              [class.border]="activeFilter() !== filter"
              [class.border-slate-200]="activeFilter() !== filter"
              [class.hover:border-cyan-500]="activeFilter() !== filter"
            >
              {{ filter }}
            </button>
          }
        </div>
      </section>

      <!-- Case Studies Grid -->
      <section class="py-24 px-6 max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 gap-12">
          @for (study of filteredStudies(); track study.id; let i = $index) {
            <div 
              class="group relative rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 reveal-card"
              [style.animation-delay]="(i * 100) + 'ms'"
              #revealCard
            >
              <!-- Image -->
              <div class="relative h-64 overflow-hidden">
                <img 
                  [src]="study.image" 
                  [alt]="study.title"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                
                <!-- Floating Metric -->
                <div class="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                  <div class="text-2xl font-bold text-slate-900">{{ study.metricValue }}</div>
                  <div class="text-[10px] font-mono uppercase tracking-wider text-slate-500">{{ study.metricLabel }}</div>
                </div>
                
                <!-- Category Badge -->
                <div class="absolute top-4 right-4 px-3 py-1 rounded-full bg-cyan-500 text-white text-xs font-mono uppercase tracking-wider">
                  {{ study.sector }}
                </div>
              </div>
              
              <!-- Content -->
              <div class="p-8">
                <h3 class="text-2xl font-medium text-slate-900 mb-4 group-hover:text-cyan-700 transition-colors">
                  {{ study.title }}
                </h3>
                
                <p class="text-slate-500 font-light leading-relaxed mb-6">
                  {{ study.description }}
                </p>
                
                <!-- Details Grid -->
                <div class="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                  <div>
                    <div class="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1">Timeline</div>
                    <div class="text-slate-700 font-medium">{{ study.timeline }}</div>
                  </div>
                  <div>
                    <div class="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1">Stack</div>
                    <div class="text-slate-700 font-medium">{{ study.stack }}</div>
                  </div>
                </div>
                
                <!-- Tech Tags -->
                <div class="flex flex-wrap gap-2 mt-6">
                  @for (tech of study.technologies; track tech) {
                    <span class="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-mono">{{ tech }}</span>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- Results Section -->
      <section class="py-32 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div class="absolute inset-0">
          <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]"></div>
          <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"></div>
        </div>
        
        <div class="max-w-7xl mx-auto relative z-10">
          <div class="text-center mb-20 reveal-section" #revealSection>
            <h2 class="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4">Aggregate Impact</h2>
            <h3 class="text-4xl md:text-5xl font-light">
              Measurable <span class="italic font-serif text-slate-400">results.</span>
            </h3>
          </div>

          <div class="grid md:grid-cols-3 gap-12">
            @for (result of results(); track result.label; let i = $index) {
              <div class="text-center reveal-card" [style.animation-delay]="(i * 150) + 'ms'" #revealCard>
                <div class="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 mb-4">
                  {{ result.value }}
                </div>
                <div class="text-xl text-slate-300 mb-2">{{ result.label }}</div>
                <p class="text-slate-500 font-light text-sm">{{ result.desc }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-32 px-6 bg-white">
        <div class="max-w-4xl mx-auto text-center reveal-section" #revealSection>
          <h2 class="text-4xl md:text-6xl font-light text-slate-900 mb-8">
            Let's write your <span class="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-violet-600">success story.</span>
          </h2>
          <p class="text-xl text-slate-500 font-light mb-12 max-w-2xl mx-auto">
            Every transformative project starts with a conversation. Tell us about your challenges.
          </p>
          <a routerLink="/contact" class="group inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-full text-sm font-bold uppercase tracking-wider hover:bg-cyan-600 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-600/20">
            Start Your Project
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
    .animate-reveal-text {
      animation: revealText 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes fadeInUp {
      0% { opacity: 0; transform: translateY(30px); }
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
export class CaseStudiesPageComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('revealSection') revealSections!: QueryList<ElementRef>;
  @ViewChildren('revealCard') revealCards!: QueryList<ElementRef>;

  private observer: IntersectionObserver | undefined;

  activeFilter = signal('All');
  filters = signal(['All', 'Enterprise AI', 'Data & Analytics', 'Multilingual', 'Document AI', 'Automotive']);

  stats = signal([
    { value: '50+', label: 'Projects Delivered' },
    { value: '95%', label: 'Client Retention' },
    { value: '80%', label: 'Avg. Efficiency Gain' },
    { value: '24/7', label: 'System Uptime' }
  ]);

  results = signal([
    { value: '80%+', label: 'Average Efficiency Improvement', desc: 'Across all operational AI deployments' },
    { value: '95%', label: 'Query Accuracy Achieved', desc: 'In natural language to data systems' },
    { value: '10x', label: 'Faster Decision Making', desc: 'With real-time intelligence platforms' }
  ]);

  studies = signal([
    {
      id: 1,
      title: 'RevOps Intelligence Platform',
      sector: 'Enterprise AI',
      category: 'Enterprise AI',
      description: 'A multi-agent AI system combining RAG pipelines, predictive lead scoring, and campaign intelligence to automate acquisition and retention workflows.',
      image: 'https://images.unsplash.com/photo-1707157281599-d155d1da5b4c?q=80&w=870&auto=format&fit=crop',
      metricValue: '+80%',
      metricLabel: 'Operational Efficiency',
      timeline: '8-10 Months',
      stack: 'LangChain / Azure / FastAPI',
      technologies: ['LangChain', 'Azure', 'FastAPI', 'GPT-4']
    },
    {
      id: 2,
      title: 'Hybrid LLM-to-SQL Platform',
      sector: 'Data & Analytics',
      category: 'Data & Analytics',
      description: 'A hybrid retrieval and structured-query system enabling natural language interaction with enterprise data warehouses with 95% query accuracy.',
      image: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=870&auto=format&fit=crop',
      metricValue: '95%',
      metricLabel: 'Query Accuracy',
      timeline: '2 Months',
      stack: 'BigQuery / Vertex AI / OpenAI',
      technologies: ['BigQuery', 'Vertex AI', 'OpenAI', 'Python']
    },
    {
      id: 3,
      title: 'ATLAS Hybrid Intelligence Engine',
      sector: 'Enterprise AI',
      category: 'Enterprise AI',
      description: 'Production-grade hybrid retrieval combining knowledge graphs and vector search with multi-agent planning and streaming LLM synthesis.',
      image: 'https://images.unsplash.com/photo-1674027444454-97b822a997b6?q=80&w=1032&auto=format&fit=crop',
      metricValue: 'Hybrid',
      metricLabel: 'Knowledge Graph + Vector',
      timeline: '2-4 Months',
      stack: 'Neo4j / Qdrant / LangChain',
      technologies: ['Neo4j', 'Qdrant', 'LangChain', 'FastAPI']
    },
    {
      id: 4,
      title: 'Arabic Speech Intelligence Engine',
      sector: 'Multilingual',
      category: 'Multilingual',
      description: 'Dialect-aware speech recognition model trained on 5,000+ hours of Arabic audio with significant improvements in transcription precision.',
      image: 'https://images.unsplash.com/photo-1648126506800-a7b1412fcadf?q=80&w=876&auto=format&fit=crop',
      metricValue: '5,000+',
      metricLabel: 'Training Hours',
      timeline: '6 Months',
      stack: 'Whisper / PyTorch / Distributed',
      technologies: ['Whisper', 'PyTorch', 'CUDA', 'Distributed Training']
    },
    {
      id: 5,
      title: 'Legal Intelligence Engine',
      sector: 'Document AI',
      category: 'Document AI',
      description: 'Transforming unstructured legal contracts into structured intelligence through advanced NLP parsing and clause extraction for compliance analysis.',
      image: 'https://images.unsplash.com/photo-1617203443952-6d2619f7ff4e?q=80&w=870&auto=format&fit=crop',
      metricValue: '94%',
      metricLabel: 'Extraction Accuracy',
      timeline: '3 Months',
      stack: 'BERT / Elasticsearch / Python',
      technologies: ['BERT', 'Elasticsearch', 'spaCy', 'Python']
    },
    {
      id: 6,
      title: 'Adcertify Automobiles AI',
      sector: 'Automotive',
      category: 'Automotive',
      description: 'Large-scale data engineering processing millions of daily vehicle sales records with automated ETL pipelines and real-time dashboards.',
      image: 'https://images.unsplash.com/photo-1608341089966-92c09e62214f?q=80&w=869&auto=format&fit=crop',
      metricValue: '15M+',
      metricLabel: 'Records Processed',
      timeline: '8 Months',
      stack: 'Python / ETL / SQL',
      technologies: ['Python', 'Apache Spark', 'PostgreSQL', 'Tableau']
    }
  ]);

  filteredStudies = signal(this.studies());

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

  setFilter(filter: string) {
    this.activeFilter.set(filter);
    if (filter === 'All') {
      this.filteredStudies.set(this.studies());
    } else {
      this.filteredStudies.set(this.studies().filter(s => s.category === filter));
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
