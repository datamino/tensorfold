import { Component, ChangeDetectionStrategy, signal, OnDestroy, Inject, PLATFORM_ID, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PageLayoutComponent } from '../../components/layout/page-layout.component';

@Component({
  selector: 'app-research-page',
  standalone: true,
  imports: [CommonModule, RouterLink, PageLayoutComponent],
  template: `
    <app-page-layout>
      <!-- Hero Section -->
      <section class="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-32 pb-24 relative overflow-hidden">
        <!-- Animated Grid Background -->
        <div class="absolute inset-0 opacity-20">
          <div class="absolute inset-0" style="background-image: linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
        </div>
        
        <div class="max-w-5xl z-10">
          <div class="mb-8 animate-fade-in-down opacity-0" style="animation-delay: 0.1s;">
            <span class="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-cyan-500/20 bg-white/50 backdrop-blur-sm text-cyan-900 text-[10px] font-mono uppercase tracking-[0.2em]">
              <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              TensorFold Labs
            </span>
          </div>
          
          <h1 class="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-slate-900 leading-[0.95] mb-8 animate-reveal-text opacity-0" style="animation-delay: 0.2s;">
            Pioneering the<br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600">Neural Frontier</span>
          </h1>
          
          <p class="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 font-light leading-relaxed mb-12 animate-fade-in-up opacity-0" style="animation-delay: 0.4s;">
            Exploring the boundaries of artificial intelligence through rigorous research, experimentation, and open-source contributions.
          </p>
          
          <div class="flex flex-wrap gap-4 justify-center animate-fade-in-up opacity-0" style="animation-delay: 0.6s;">
            <a href="#focus-areas" class="group inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full text-sm font-bold uppercase tracking-wider hover:bg-cyan-600 transition-all duration-300">
              Explore Research
              <svg class="w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </a>
            <a href="#publications" class="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-full text-sm font-bold uppercase tracking-wider border border-slate-200 hover:border-cyan-500 transition-all duration-300">
              View Publications
            </a>
          </div>
        </div>
      </section>

      <!-- Focus Areas -->
      <section id="focus-areas" class="py-32 px-6 max-w-7xl mx-auto">
        <div class="mb-20 reveal-section" #revealSection>
          <h2 class="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">Research Focus</h2>
          <h3 class="text-4xl md:text-5xl font-light text-slate-900">
            Areas of <span class="italic font-serif text-slate-400">deep exploration.</span>
          </h3>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (area of focusAreas(); track area.title; let i = $index) {
            <div 
              class="group relative p-8 rounded-3xl bg-white/60 backdrop-blur-sm border border-slate-200/50 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-900/10 hover:-translate-y-2 reveal-card"
              [style.animation-delay]="(i * 100) + 'ms'"
              #revealCard
            >
              <!-- Icon -->
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-br {{ area.gradient }} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500">
                <span class="text-white text-3xl" [innerHTML]="area.icon"></span>
              </div>
              
              <h4 class="text-xl font-medium text-slate-900 mb-3 group-hover:text-cyan-700 transition-colors">
                {{ area.title }}
              </h4>
              
              <p class="text-slate-500 font-light leading-relaxed mb-6">
                {{ area.desc }}
              </p>
              
              <!-- Topics -->
              <div class="flex flex-wrap gap-2">
                @for (topic of area.topics; track topic) {
                  <span class="px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs">{{ topic }}</span>
                }
              </div>
            </div>
          }
        </div>
      </section>

      <!-- Current Projects -->
      <section class="py-32 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div class="absolute inset-0 opacity-30">
          <div class="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]"></div>
          <div class="absolute bottom-0 right-0 w-[600px] h-[600px] bg-violet-500/20 rounded-full blur-[120px]"></div>
        </div>
        
        <div class="max-w-7xl mx-auto relative z-10">
          <div class="mb-20 reveal-section" #revealSection>
            <h2 class="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4">Active Research</h2>
            <h3 class="text-4xl md:text-5xl font-light">
              Current <span class="italic font-serif text-slate-400">explorations.</span>
            </h3>
          </div>

          <div class="space-y-8">
            @for (project of projects(); track project.title; let i = $index) {
              <div 
                class="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:bg-white/10 reveal-card"
                [style.animation-delay]="(i * 100) + 'ms'"
                #revealCard
              >
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-3">
                      <span class="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider"
                            [class.bg-green-500/20]="project.status === 'Active'"
                            [class.text-green-400]="project.status === 'Active'"
                            [class.bg-yellow-500/20]="project.status === 'In Progress'"
                            [class.text-yellow-400]="project.status === 'In Progress'"
                            [class.bg-blue-500/20]="project.status === 'Planning'"
                            [class.text-blue-400]="project.status === 'Planning'">
                        {{ project.status }}
                      </span>
                      <span class="text-slate-500 text-sm">{{ project.timeline }}</span>
                    </div>
                    <h4 class="text-2xl font-medium text-white mb-2 group-hover:text-cyan-400 transition-colors">{{ project.title }}</h4>
                    <p class="text-slate-400 font-light">{{ project.desc }}</p>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    @for (tech of project.tech; track tech) {
                      <span class="px-3 py-1 rounded-full bg-white/10 text-slate-300 text-xs font-mono">{{ tech }}</span>
                    }
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Publications -->
      <section id="publications" class="py-32 px-6 max-w-7xl mx-auto">
        <div class="mb-20 reveal-section" #revealSection>
          <h2 class="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">Publications</h2>
          <h3 class="text-4xl md:text-5xl font-light text-slate-900">
            Insights & <span class="italic font-serif text-slate-400">findings.</span>
          </h3>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          @for (pub of publications(); track pub.title; let i = $index) {
            <div 
              class="group p-8 rounded-2xl bg-white border border-slate-200 hover:border-cyan-500/30 hover:shadow-xl transition-all duration-300 reveal-card"
              [style.animation-delay]="(i * 100) + 'ms'"
              #revealCard
            >
              <div class="flex items-start justify-between mb-4">
                <span class="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-mono">{{ pub.type }}</span>
                <span class="text-slate-400 text-sm">{{ pub.date }}</span>
              </div>
              <h4 class="text-xl font-medium text-slate-900 mb-3 group-hover:text-cyan-700 transition-colors">{{ pub.title }}</h4>
              <p class="text-slate-500 font-light mb-6">{{ pub.abstract }}</p>
              <div class="flex items-center justify-between">
                <div class="flex gap-2">
                  @for (tag of pub.tags; track tag) {
                    <span class="px-2 py-1 rounded bg-cyan-50 text-cyan-700 text-xs">{{ tag }}</span>
                  }
                </div>
                <a href="#" class="text-cyan-600 hover:text-cyan-700 text-sm font-medium group-hover:underline">Read More &rarr;</a>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- Open Source -->
      <section class="py-32 px-6 bg-gradient-to-br from-slate-50 to-cyan-50/30">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-20 reveal-section" #revealSection>
            <h2 class="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">Open Source</h2>
            <h3 class="text-4xl md:text-5xl font-light text-slate-900">
              Building in <span class="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-violet-600">public.</span>
            </h3>
            <p class="text-xl text-slate-500 font-light mt-6 max-w-2xl mx-auto">
              We believe in advancing the field through open collaboration and shared knowledge.
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            @for (repo of repos(); track repo.name; let i = $index) {
              <div 
                class="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-cyan-500/30 hover:shadow-xl transition-all duration-300 reveal-card"
                [style.animation-delay]="(i * 100) + 'ms'"
                #revealCard
              >
                <div class="flex items-center gap-3 mb-4">
                  <svg class="w-6 h-6 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="font-mono text-sm text-slate-600">{{ repo.name }}</span>
                </div>
                <p class="text-slate-500 font-light text-sm mb-4">{{ repo.desc }}</p>
                <div class="flex items-center gap-4 text-sm text-slate-400">
                  <span class="flex items-center gap-1">
                    <span class="w-3 h-3 rounded-full" [style.background-color]="repo.langColor"></span>
                    {{ repo.language }}
                  </span>
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                    {{ repo.stars }}
                  </span>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="py-32 px-6 bg-white">
        <div class="max-w-4xl mx-auto text-center reveal-section" #revealSection>
          <h2 class="text-4xl md:text-6xl font-light text-slate-900 mb-8">
            Collaborate with <span class="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-violet-600">us.</span>
          </h2>
          <p class="text-xl text-slate-500 font-light mb-12 max-w-2xl mx-auto">
            Interested in research partnerships or have questions about our work? Let's connect.
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
export class ResearchPageComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('revealSection') revealSections!: QueryList<ElementRef>;
  @ViewChildren('revealCard') revealCards!: QueryList<ElementRef>;

  private observer: IntersectionObserver | undefined;

  focusAreas = signal([
    { title: 'Agentic AI Systems', icon: '&#129302;', gradient: 'from-cyan-500 to-blue-600', desc: 'Autonomous agents that plan, reason, and execute complex multi-step tasks with minimal human intervention.', topics: ['Multi-agent collaboration', 'Tool use', 'Planning'] },
    { title: 'Retrieval-Augmented Generation', icon: '&#128269;', gradient: 'from-blue-500 to-violet-600', desc: 'Hybrid systems combining knowledge retrieval with generative AI for grounded, accurate responses.', topics: ['Vector search', 'Knowledge graphs', 'Hybrid retrieval'] },
    { title: 'LLM Optimization', icon: '&#9889;', gradient: 'from-violet-500 to-pink-600', desc: 'Techniques for faster, cheaper, and more efficient large language model inference and fine-tuning.', topics: ['Quantization', 'Distillation', 'LoRA'] },
    { title: 'Multimodal Intelligence', icon: '&#128065;', gradient: 'from-pink-500 to-orange-600', desc: 'Systems that understand and generate across text, images, audio, and video modalities.', topics: ['Vision-language', 'Speech', 'Document AI'] },
    { title: 'Neural Architecture Search', icon: '&#129504;', gradient: 'from-orange-500 to-yellow-600', desc: 'Automated discovery of optimal neural network architectures for specific tasks and constraints.', topics: ['AutoML', 'Efficiency', 'Transfer learning'] },
    { title: 'AI Safety & Alignment', icon: '&#128737;', gradient: 'from-green-500 to-cyan-600', desc: 'Research into building AI systems that are safe, interpretable, and aligned with human values.', topics: ['Interpretability', 'Robustness', 'Guardrails'] }
  ]);

  projects = signal([
    { title: 'Adaptive RAG Pipeline Framework', status: 'Active', timeline: 'Q1 2024 - Ongoing', desc: 'A self-optimizing retrieval system that dynamically adjusts chunking, embedding, and retrieval strategies based on query complexity.', tech: ['LangChain', 'Qdrant', 'GPT-4'] },
    { title: 'Multi-Agent Orchestration Layer', status: 'Active', timeline: 'Q2 2024 - Ongoing', desc: 'Framework for coordinating specialized AI agents in complex enterprise workflows with built-in observability.', tech: ['CrewAI', 'LangGraph', 'FastAPI'] },
    { title: 'Domain-Specific LLM Distillation', status: 'In Progress', timeline: 'Q3 2024', desc: 'Research into distilling large models into smaller, specialized models for specific industry verticals.', tech: ['PyTorch', 'Transformers', 'PEFT'] },
    { title: 'Hybrid Knowledge Reasoning', status: 'Planning', timeline: 'Q4 2024', desc: 'Combining symbolic reasoning with neural approaches for improved factual accuracy and explainability.', tech: ['Neo4j', 'Prolog', 'LLMs'] }
  ]);

  publications = signal([
    { title: 'Optimizing RAG Systems for Enterprise Scale', type: 'Technical Report', date: 'Jan 2024', abstract: 'A comprehensive analysis of retrieval-augmented generation patterns and their performance characteristics at scale.', tags: ['RAG', 'Enterprise', 'Scale'] },
    { title: 'Multi-Agent Coordination in Complex Workflows', type: 'Research Paper', date: 'Dec 2023', abstract: 'Novel approaches to orchestrating multiple AI agents for business process automation.', tags: ['Agents', 'Orchestration', 'Automation'] },
    { title: 'Hybrid Retrieval: Combining Vectors and Graphs', type: 'Blog Post', date: 'Nov 2023', abstract: 'Practical insights on combining vector search with knowledge graphs for improved retrieval quality.', tags: ['Vectors', 'Graphs', 'Retrieval'] },
    { title: 'LLM Inference Optimization Techniques', type: 'Technical Guide', date: 'Oct 2023', abstract: 'Best practices for reducing latency and cost in large language model deployments.', tags: ['Optimization', 'Inference', 'Cost'] }
  ]);

  repos = signal([
    { name: 'tensorfold/rag-toolkit', desc: 'Production-ready RAG components for enterprise deployments.', language: 'Python', langColor: '#3572A5', stars: '1.2k' },
    { name: 'tensorfold/agent-framework', desc: 'Multi-agent orchestration framework with built-in observability.', language: 'Python', langColor: '#3572A5', stars: '890' },
    { name: 'tensorfold/llm-benchmark', desc: 'Comprehensive benchmarking suite for LLM evaluation.', language: 'TypeScript', langColor: '#2b7489', stars: '650' }
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
