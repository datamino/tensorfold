
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-blog',
  standalone: true,
  template: `
    <section class="py-32 px-6 max-w-7xl mx-auto">
      <h2 class="text-xs font-mono uppercase tracking-widest text-slate-400 mb-16">System Signals</h2>
      
      <div class="grid md:grid-cols-3 gap-12">
        @for (post of posts(); track post.id) {
          <article class="group cursor-pointer flex flex-col h-full">
            <div class="overflow-hidden rounded-lg mb-6 aspect-[16/10] bg-slate-100">
              <img [src]="post.image" alt="Article Thumbnail" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" loading="lazy" decoding="async">
            </div>
            
            <div class="flex-1 flex flex-col">
              <div class="flex items-center justify-between text-xs font-mono text-slate-400 mb-4 border-b border-slate-100 pb-2">
                <span>{{ post.category }}</span>
                <span>{{ post.date }}</span>
              </div>
              
              <h3 class="text-xl font-medium text-slate-900 mb-4 leading-snug group-hover:text-cyan-700 transition-colors">
                {{ post.title }}
              </h3>
              
              <p class="text-sm text-slate-500 font-light leading-relaxed mb-6 flex-1">
                {{ post.excerpt }}
              </p>
              
              <div class="text-xs font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">READ SIGNAL +</div>
            </div>
          </article>
        }
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent {
  posts = signal([
    {
      id: 1,
      category: 'Research',
      date: 'OCT 12, 2024',
      title: 'Beyond Transformers: The Rise of Liquid Neural Networks',
      excerpt: 'Why static weights are becoming obsolete in a world of continuous data streams.',
      image: 'https://picsum.photos/seed/blog1/600/400'
    },
    {
      id: 2,
      category: 'Philosophy',
      date: 'SEP 28, 2024',
      title: 'The Ethics of Autonomous Code Generation',
      excerpt: 'Navigating the gray areas when AI systems begin to architect their own sub-routines.',
      image: 'https://picsum.photos/seed/blog2/600/400'
    },
    {
      id: 3,
      category: 'Engineering',
      date: 'SEP 15, 2024',
      title: 'Optimizing Inference at the Edge',
      excerpt: 'Running billion-parameter models on low-power industrial hardware.',
      image: 'https://picsum.photos/seed/blog3/600/400'
    }
  ]);
}
