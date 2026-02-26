import { Component, ChangeDetectionStrategy, signal, OnInit, OnDestroy, Inject, PLATFORM_ID, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PageLayoutComponent } from '../../components/layout/page-layout.component';

@Component({
  selector: 'app-services-page',
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
              What We Build
            </span>
          </div>
          
          <h1 class="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-slate-900 leading-[0.95] mb-8 animate-reveal-text opacity-0" style="animation-delay: 0.2s;">
            Intelligence<br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600">Infrastructure</span>
          </h1>
          
          <p class="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 font-light leading-relaxed mb-12 animate-fade-in-up opacity-0" style="animation-delay: 0.4s;">
            We architect and deploy production-grade AI systems that transform how enterprises operate, decide, and scale.
          </p>
          
          <div class="animate-fade-in-up opacity-0" style="animation-delay: 0.6s;">
            <a routerLink="/contact" class="group relative inline-flex items-center gap-4 px-10 py-5 bg-slate-900 text-white rounded-full overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-cyan-900/20 hover:-translate-y-1">
              <span class="relative z-10 text-xs font-bold tracking-[0.15em] uppercase">Start a Project</span>
              <svg class="w-4 h-4 relative z-10 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
              <div class="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </a>
          </div>
        </div>
        
        <!-- Scroll indicator -->
        <div class="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow">
          <span class="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Explore</span>
          <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      <!-- Services Grid Section -->
      <section class="py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div class="mb-20 reveal-section" #revealSection>
          <h2 class="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">Core Capabilities</h2>
          <h3 class="text-4xl md:text-5xl font-light text-slate-900">
            End-to-end AI <span class="italic font-serif text-slate-400">engineering.</span>
          </h3>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          @for (service of services(); track service.id; let i = $index) {
            <div 
              #serviceCard
              class="group relative p-8 md:p-12 rounded-3xl bg-white/60 backdrop-blur-sm border border-slate-200/50 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-900/10 hover:-translate-y-2 cursor-default reveal-card"
              [style.animation-delay]="(i * 100) + 'ms'"
            >
              <!-- Service Number -->
              <div class="absolute top-8 right-8 font-mono text-6xl font-bold text-slate-100 group-hover:text-cyan-100 transition-colors">
                0{{ service.id }}
              </div>
              
              <!-- Icon -->
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-8 shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-500">
                <span class="text-white text-2xl" [innerHTML]="service.icon"></span>
              </div>
              
              <h4 class="text-2xl md:text-3xl font-medium text-slate-900 mb-4 group-hover:text-cyan-700 transition-colors">
                {{ service.title }}
              </h4>
              
              <p class="text-slate-500 font-light leading-relaxed mb-8">
                {{ service.desc }}
              </p>
              
              <!-- Tech Tags -->
              <div class="flex flex-wrap gap-2">
                @for (tech of service.technologies; track tech) {
                  <span class="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-mono">{{ tech }}</span>
                }
              </div>
              
              <!-- Hover gradient -->
              <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          }
        </div>
      </section>

      <!-- Process Section -->
      <section class="py-32 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div class="absolute inset-0 opacity-30">
          <div class="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]"></div>
          <div class="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px]"></div>
        </div>
        
        <div class="max-w-7xl mx-auto relative z-10">
          <div class="mb-20 text-center reveal-section" #revealSection>
            <h2 class="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4">Our Process</h2>
            <h3 class="text-4xl md:text-5xl font-light">
              From concept to <span class="italic font-serif text-slate-400">production.</span>
            </h3>
          </div>

          <div class="grid md:grid-cols-5 gap-8">
            @for (step of processSteps(); track step.id; let i = $index) {
              <div class="relative reveal-card" [style.animation-delay]="(i * 150) + 'ms'" #revealCard>
                <!-- Connector Line -->
                @if (i < processSteps().length - 1) {
                  <div class="hidden md:block absolute top-8 left-full w-full h-[1px] bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
                }
                
                <!-- Step Number -->
                <div class="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/30">
                  <span class="font-mono font-bold text-xl">{{ step.id }}</span>
                </div>
                
                <h4 class="text-xl font-medium mb-3 text-white">{{ step.title }}</h4>
                <p class="text-slate-400 font-light text-sm leading-relaxed">{{ step.desc }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Tech Stack Section -->
      <section class="py-32 px-6 max-w-7xl mx-auto">
        <div class="mb-20 text-center reveal-section" #revealSection>
          <h2 class="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">Technology Stack</h2>
          <h3 class="text-4xl md:text-5xl font-light text-slate-900">
            Built on <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">modern foundations.</span>
          </h3>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          @for (category of techStack(); track category.name; let i = $index) {
            <div class="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50 reveal-card" [style.animation-delay]="(i * 100) + 'ms'" #revealCard>
              <h4 class="font-mono text-xs uppercase tracking-widest text-cyan-600 mb-4">{{ category.name }}</h4>
              <div class="flex flex-wrap gap-2">
                @for (tech of category.items; track tech) {
                  <span class="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium hover:bg-cyan-100 hover:text-cyan-700 transition-colors cursor-default">
                    {{ tech }}
                  </span>
                }
              </div>
            </div>
          }
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-32 px-6 bg-gradient-to-br from-slate-50 to-cyan-50/30">
        <div class="max-w-4xl mx-auto text-center reveal-section" #revealSection>
          <h2 class="text-4xl md:text-6xl font-light text-slate-900 mb-8">
            Ready to build <span class="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-violet-600">intelligence?</span>
          </h2>
          <p class="text-xl text-slate-500 font-light mb-12 max-w-2xl mx-auto">
            Let's discuss how AI can transform your operations and create lasting competitive advantage.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a routerLink="/contact" class="group inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full text-sm font-bold uppercase tracking-wider hover:bg-cyan-600 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-600/20">
              Schedule Consultation
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>
            <a routerLink="/case-studies" class="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-full text-sm font-bold uppercase tracking-wider border border-slate-200 hover:border-cyan-500 transition-all duration-300">
              View Case Studies
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

    @keyframes bounceSlow {
      0%, 100% { transform: translateX(-50%) translateY(0); }
      50% { transform: translateX(-50%) translateY(10px); }
    }
    .animate-bounce-slow {
      animation: bounceSlow 2s ease-in-out infinite;
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
export class ServicesPageComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('revealSection') revealSections!: QueryList<ElementRef>;
  @ViewChildren('revealCard') revealCards!: QueryList<ElementRef>;
  @ViewChildren('serviceCard') serviceCards!: QueryList<ElementRef>;

  private observer: IntersectionObserver | undefined;

  services = signal([
    { 
      id: 1, 
      title: 'Agentic Systems & Applied GenAI',
      icon: '&#129302;',
      desc: 'Design and deployment of autonomous AI agents, RAG systems, and generative AI applications that execute complex workflows with contextual awareness and human-like reasoning.',
      technologies: ['LangChain', 'CrewAI', 'AutoGen', 'GPT-4', 'Claude']
    },
    { 
      id: 2, 
      title: 'MLOps & LLMOps Engineering',
      icon: '&#9881;',
      desc: 'Production-grade lifecycle engineering for ML and GenAI systems. We build scalable deployment pipelines, observability layers, and continuous optimization frameworks.',
      technologies: ['Kubernetes', 'MLflow', 'Weights & Biases', 'Airflow']
    },
    { 
      id: 3, 
      title: 'Machine Learning & Data Science',
      icon: '&#128202;',
      desc: 'High-performance predictive models and advanced analytics engineered for competitive advantage. From computer vision to NLP, we solve complex prediction problems.',
      technologies: ['PyTorch', 'TensorFlow', 'scikit-learn', 'XGBoost']
    },
    { 
      id: 4, 
      title: 'AI Strategy & Architecture',
      icon: '&#127919;',
      desc: 'Strategic design of enterprise AI architecture aligned with long-term business objectives. We help you build a roadmap from current state to AI-native operations.',
      technologies: ['System Design', 'Cloud Architecture', 'Data Strategy']
    },
    { 
      id: 5, 
      title: 'Data Engineering & Platforms',
      icon: '&#128451;',
      desc: 'Modern data architectures powering RAG systems, real-time analytics, and unified intelligence layers across structured and unstructured data environments.',
      technologies: ['Spark', 'Kafka', 'BigQuery', 'Snowflake', 'dbt']
    },
    { 
      id: 6, 
      title: 'Custom Model Development',
      icon: '&#129504;',
      desc: 'Fine-tuning and training custom models for domain-specific applications. From speech recognition to document understanding, we build models that understand your data.',
      technologies: ['Transformers', 'LoRA', 'PEFT', 'Distributed Training']
    }
  ]);

  processSteps = signal([
    { id: 1, title: 'Discovery', desc: 'Deep dive into your business context, data landscape, and strategic objectives.' },
    { id: 2, title: 'Architecture', desc: 'Design scalable systems with clear technical specifications and milestones.' },
    { id: 3, title: 'Development', desc: 'Iterative building with continuous feedback and rapid prototyping.' },
    { id: 4, title: 'Deployment', desc: 'Production rollout with monitoring, testing, and performance optimization.' },
    { id: 5, title: 'Evolution', desc: 'Continuous improvement, model retraining, and capability expansion.' }
  ]);

  techStack = signal([
    { name: 'LLM Frameworks', items: ['LangChain', 'LlamaIndex', 'Haystack', 'Semantic Kernel'] },
    { name: 'ML Platforms', items: ['PyTorch', 'TensorFlow', 'JAX', 'Hugging Face'] },
    { name: 'Cloud & Infra', items: ['AWS', 'GCP', 'Azure', 'Kubernetes'] },
    { name: 'Data & Vector', items: ['Pinecone', 'Qdrant', 'Neo4j', 'PostgreSQL'] },
    { name: 'Orchestration', items: ['Airflow', 'Prefect', 'Dagster', 'Temporal'] },
    { name: 'Observability', items: ['Langfuse', 'W&B', 'MLflow', 'Grafana'] },
    { name: 'APIs & Serving', items: ['FastAPI', 'Ray Serve', 'Triton', 'vLLM'] },
    { name: 'LLM Providers', items: ['OpenAI', 'Anthropic', 'Google', 'Mistral'] }
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

    // Observe all reveal elements
    [...this.revealSections.toArray(), ...this.revealCards.toArray(), ...this.serviceCards.toArray()].forEach((el) => {
      this.observer?.observe(el.nativeElement);
    });
  }
}
