import { Component, ChangeDetectionStrategy, signal, OnDestroy, Inject, PLATFORM_ID, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PageLayoutComponent } from '../../components/layout/page-layout.component';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [CommonModule, RouterLink, PageLayoutComponent],
  template: `
    <app-page-layout>
      <!-- Hero Section -->
      <section class="min-h-[60vh] flex flex-col justify-center items-center text-center px-6 pt-32 pb-16 relative overflow-hidden">
        <div class="max-w-5xl z-10">
          <div class="mb-8 animate-fade-in-down opacity-0" style="animation-delay: 0.1s;">
            <span class="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-cyan-500/20 bg-white/50 backdrop-blur-sm text-cyan-900 text-[10px] font-mono uppercase tracking-[0.2em]">
              <span class="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
              System Signals
            </span>
          </div>
          
          <h1 class="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-slate-900 leading-[0.95] mb-8 animate-reveal-text opacity-0" style="animation-delay: 0.2s;">
            Insights from the<br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600">Neural Frontier</span>
          </h1>
          
          <p class="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 font-light leading-relaxed animate-fade-in-up opacity-0" style="animation-delay: 0.4s;">
            Technical deep-dives, research findings, and perspectives on the future of artificial intelligence.
          </p>
        </div>
      </section>

      <!-- Categories -->
      <section class="py-8 px-6 sticky top-20 z-30 bg-slate-50/80 backdrop-blur-md border-b border-slate-200/50">
        <div class="max-w-7xl mx-auto flex flex-wrap gap-3 justify-center">
          @for (category of categories(); track category) {
            <button 
              (click)="setCategory(category)"
              class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
              [class.bg-slate-900]="activeCategory() === category"
              [class.text-white]="activeCategory() === category"
              [class.bg-white]="activeCategory() !== category"
              [class.text-slate-600]="activeCategory() !== category"
              [class.border]="activeCategory() !== category"
              [class.border-slate-200]="activeCategory() !== category"
              [class.hover:border-cyan-500]="activeCategory() !== category"
            >
              {{ category }}
            </button>
          }
        </div>
      </section>

      <!-- Featured Post -->
      <section class="py-16 px-6 max-w-7xl mx-auto">
        <div class="reveal-section" #revealSection>
          <div class="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 md:p-12 text-white">
            <div class="absolute inset-0 opacity-20">
              <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/30 rounded-full blur-[100px]"></div>
            </div>
            
            <div class="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-6">
                  Featured
                </span>
                <h2 class="text-3xl md:text-4xl font-medium mb-4 group-hover:text-cyan-400 transition-colors">
                  {{ featuredPost().title }}
                </h2>
                <p class="text-slate-300 font-light leading-relaxed mb-6">
                  {{ featuredPost().excerpt }}
                </p>
                <div class="flex items-center gap-6 text-sm text-slate-400">
                  <span>{{ featuredPost().date }}</span>
                  <span>{{ featuredPost().readTime }}</span>
                </div>
              </div>
              <div class="relative h-64 md:h-80 rounded-2xl overflow-hidden">
                <img [src]="featuredPost().image" [alt]="featuredPost().title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Blog Grid -->
      <section class="py-16 px-6 max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (post of filteredPosts(); track post.title; let i = $index) {
            <article 
              class="group reveal-card"
              [style.animation-delay]="(i * 100) + 'ms'"
              #revealCard
            >
              <div class="relative h-full rounded-2xl bg-white border border-slate-200/50 overflow-hidden hover:border-cyan-500/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <!-- Image -->
                <div class="relative h-48 overflow-hidden">
                  <img [src]="post.image" [alt]="post.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                  <div class="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                  <span class="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-mono">
                    {{ post.category }}
                  </span>
                </div>
                
                <!-- Content -->
                <div class="p-6">
                  <h3 class="text-xl font-medium text-slate-900 mb-3 group-hover:text-cyan-700 transition-colors line-clamp-2">
                    {{ post.title }}
                  </h3>
                  <p class="text-slate-500 font-light text-sm leading-relaxed mb-4 line-clamp-3">
                    {{ post.excerpt }}
                  </p>
                  <div class="flex items-center justify-between text-xs text-slate-400">
                    <span>{{ post.date }}</span>
                    <span>{{ post.readTime }}</span>
                  </div>
                </div>
              </div>
            </article>
          }
        </div>
      </section>

      <!-- Newsletter -->
      <section class="py-32 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div class="absolute inset-0">
          <div class="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"></div>
          <div class="absolute bottom-0 right-0 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[120px]"></div>
        </div>
        
        <div class="max-w-3xl mx-auto text-center relative z-10 reveal-section" #revealSection>
          <h2 class="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4">Newsletter</h2>
          <h3 class="text-4xl md:text-5xl font-light mb-6">
            Stay <span class="italic font-serif text-slate-400">synced.</span>
          </h3>
          <p class="text-xl text-slate-300 font-light mb-12">
            Receive quarterly transmissions from our research labs. No spam, just insights.
          </p>
          
          <form class="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              class="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
            >
            <button class="px-8 py-4 rounded-full bg-cyan-500 text-slate-900 font-bold uppercase tracking-wider hover:bg-cyan-400 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <!-- Topics -->
      <section class="py-32 px-6 max-w-7xl mx-auto">
        <div class="text-center mb-16 reveal-section" #revealSection>
          <h2 class="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">Explore Topics</h2>
          <h3 class="text-4xl md:text-5xl font-light text-slate-900">
            Deep <span class="italic font-serif text-slate-400">dives.</span>
          </h3>
        </div>

        <div class="flex flex-wrap gap-4 justify-center reveal-section" #revealSection>
          @for (topic of topics(); track topic.name) {
            <a href="#" class="px-6 py-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-cyan-500 hover:text-cyan-700 hover:bg-cyan-50 transition-all duration-300">
              {{ topic.name }} <span class="text-slate-400">({{ topic.count }})</span>
            </a>
          }
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
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPageComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('revealSection') revealSections!: QueryList<ElementRef>;
  @ViewChildren('revealCard') revealCards!: QueryList<ElementRef>;

  private observer: IntersectionObserver | undefined;

  activeCategory = signal('All');
  categories = signal(['All', 'Research', 'Engineering', 'Tutorials', 'Philosophy', 'News']);

  featuredPost = signal({
    title: 'The Future of Agentic AI: Beyond Simple Automation',
    excerpt: 'Exploring how autonomous AI agents are evolving from task executors to intelligent collaborators capable of complex reasoning and multi-step problem solving.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1032&auto=format&fit=crop',
    date: 'Feb 2024',
    readTime: '12 min read',
    category: 'Research'
  });

  posts = signal([
    { title: 'Building Production RAG Systems: Lessons Learned', excerpt: 'Practical insights from deploying retrieval-augmented generation at enterprise scale.', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=870&auto=format&fit=crop', date: 'Jan 2024', readTime: '8 min read', category: 'Engineering' },
    { title: 'Knowledge Graphs + Vector Search: A Hybrid Approach', excerpt: 'Combining the best of both worlds for improved retrieval accuracy and context.', image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=870&auto=format&fit=crop', date: 'Jan 2024', readTime: '10 min read', category: 'Research' },
    { title: 'Fine-tuning LLMs: When and How', excerpt: 'A practical guide to deciding when fine-tuning makes sense and how to do it effectively.', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=870&auto=format&fit=crop', date: 'Dec 2023', readTime: '15 min read', category: 'Tutorials' },
    { title: 'The Philosophy of Artificial Intelligence', excerpt: 'Reflecting on what it means to build systems that think and the responsibilities that come with it.', image: 'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=870&auto=format&fit=crop', date: 'Dec 2023', readTime: '6 min read', category: 'Philosophy' },
    { title: 'MLOps Best Practices for LLM Applications', excerpt: 'Operational patterns for deploying and maintaining large language model systems in production.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=870&auto=format&fit=crop', date: 'Nov 2023', readTime: '11 min read', category: 'Engineering' },
    { title: 'Evaluating LLM Outputs: Metrics That Matter', excerpt: 'Moving beyond perplexity to metrics that actually reflect real-world performance.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=870&auto=format&fit=crop', date: 'Nov 2023', readTime: '9 min read', category: 'Research' }
  ]);

  filteredPosts = signal(this.posts());

  topics = signal([
    { name: 'RAG Systems', count: 12 },
    { name: 'LLM Engineering', count: 18 },
    { name: 'MLOps', count: 8 },
    { name: 'AI Agents', count: 6 },
    { name: 'Vector Databases', count: 5 },
    { name: 'Fine-tuning', count: 7 },
    { name: 'Prompt Engineering', count: 9 },
    { name: 'AI Ethics', count: 4 }
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

  setCategory(category: string) {
    this.activeCategory.set(category);
    if (category === 'All') {
      this.filteredPosts.set(this.posts());
    } else {
      this.filteredPosts.set(this.posts().filter(p => p.category === category));
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
