
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="pb-32 pt-12 relative overflow-hidden z-20">
      
      <!-- Content Anchor -->
      <div class="max-w-7xl mx-auto px-6 mb-16">
        <div class="w-full h-px bg-slate-200 mb-8"></div>
        <h4 class="text-xs font-mono uppercase tracking-widest text-slate-400">Core Infrastructure</h4>
      </div>

      <!-- Marquee Container with CSS Mask for perfect background blending -->
      <div class="flex flex-col gap-6 py-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          
          <!-- Row 1: Left Scroll -->
          <div class="flex w-max animate-marquee group hover:[animation-play-state:paused] items-center">
            <!-- Set 1 -->
            <div class="flex items-center gap-6 px-3">
               @for (tool of toolsRow1(); track tool.name) {
                 <div class="group/chip relative px-8 py-4 rounded-xl border border-black bg-slate-100/30 backdrop-blur-[2px] flex items-center gap-4 min-w-max transition-all duration-300 hover:bg-white hover:border-violet-300 hover:shadow-xl hover:shadow-violet-900/5 hover:-translate-y-1 cursor-default">
                   
                   <div class="relative w-12 h-12 flex items-center justify-center transition-opacity duration-300">
                     @if (tool.path) {
                        <svg viewBox="0 0 24 24" class="w-8 h-8 text-black fill-current" preserveAspectRatio="xMidYMid meet">
                          <path [attr.d]="tool.path"></path>
                        </svg>
                     } @else {
                        <img [src]="'https://cdn.simpleicons.org/' + tool.slug + '/334155'" 
                            [alt]="tool.name"
                            class="w-8 h-8 object-contain filter brightness-0 transition-all duration-300"
                            loading="lazy">
                     }
                   </div>
                   
                   <span class="text-xl font-mono font-bold tracking-tight text-black transition-colors uppercase">
                     {{ tool.name }}
                   </span>
                 </div>
               }
            </div>
            
            <!-- Duplicate for Loop -->
            <div class="flex items-center gap-6 px-3">
               @for (tool of toolsRow1(); track tool.name + '_dup') {
                  <div class="group/chip relative px-8 py-4 rounded-xl border border-black bg-slate-100/30 backdrop-blur-[2px] flex items-center gap-4 min-w-max transition-all duration-300 hover:bg-white hover:border-violet-300 hover:shadow-xl hover:shadow-violet-900/5 hover:-translate-y-1 cursor-default">
                   <div class="relative w-12 h-12 flex items-center justify-center transition-opacity duration-300">
                     @if (tool.path) {
                        <svg viewBox="0 0 24 24" class="w-8 h-8 text-black fill-current" preserveAspectRatio="xMidYMid meet">
                          <path [attr.d]="tool.path"></path>
                        </svg>
                     } @else {
                        <img [src]="'https://cdn.simpleicons.org/' + tool.slug + '/334155'" 
                            [alt]="tool.name"
                            class="w-8 h-8 object-contain filter brightness-0 transition-all duration-300"
                            loading="lazy">
                     }
                   </div>
                   <span class="text-xl font-mono font-bold tracking-tight text-black transition-colors uppercase">
                     {{ tool.name }}
                   </span>
                 </div>
               }
            </div>
          </div>

          <!-- Row 2: Right Scroll (Reverse) -->
          <div class="flex w-max animate-marquee-reverse group hover:[animation-play-state:paused] items-center">
            <!-- Set 1 -->
            <div class="flex items-center gap-6 px-3">
               @for (tool of toolsRow2(); track tool.name) {
                 <div class="group/chip relative px-8 py-4 rounded-xl border border-black bg-slate-100/30 backdrop-blur-[2px] flex items-center gap-4 min-w-max transition-all duration-300 hover:bg-white hover:border-violet-300 hover:shadow-xl hover:shadow-violet-900/5 hover:-translate-y-1 cursor-default">
                   
                   <div class="relative w-12 h-12 flex items-center justify-center transition-opacity duration-300">
                     @if (tool.path) {
                        <svg viewBox="0 0 24 24" class="w-8 h-8 text-black fill-current" preserveAspectRatio="xMidYMid meet">
                          <path [attr.d]="tool.path"></path>
                        </svg>
                     } @else {
                        <img [src]="'https://cdn.simpleicons.org/' + tool.slug + '/334155'" 
                            [alt]="tool.name"
                            class="w-8 h-8 object-contain filter brightness-0 transition-all duration-300"
                            loading="lazy">
                     }
                   </div>
                   
                   <span class="text-xl font-mono font-bold tracking-tight text-black transition-colors uppercase">
                     {{ tool.name }}
                   </span>
                 </div>
               }
            </div>
            
            <!-- Duplicate for Loop -->
            <div class="flex items-center gap-6 px-3">
               @for (tool of toolsRow2(); track tool.name + '_dup') {
                 <div class="group/chip relative px-8 py-4 rounded-xl border border-black bg-slate-100/30 backdrop-blur-[2px] flex items-center gap-4 min-w-max transition-all duration-300 hover:bg-white hover:border-violet-300 hover:shadow-xl hover:shadow-violet-900/5 hover:-translate-y-1 cursor-default">
                   <div class="relative w-12 h-12 flex items-center justify-center transition-opacity duration-300">
                     @if (tool.path) {
                        <svg viewBox="0 0 24 24" class="w-8 h-8 text-black fill-current" preserveAspectRatio="xMidYMid meet">
                          <path [attr.d]="tool.path"></path>
                        </svg>
                     } @else {
                        <img [src]="'https://cdn.simpleicons.org/' + tool.slug + '/334155'" 
                            [alt]="tool.name"
                            class="w-8 h-8 object-contain filter brightness-0 transition-all duration-300"
                            loading="lazy">
                     }
                   </div>
                   <span class="text-xl font-mono font-bold tracking-tight text-black transition-colors uppercase">
                     {{ tool.name }}
                   </span>
                 </div>
               }
            </div>
          </div>

      </div>
    </section>
  `,
  styles: [`
    .animate-marquee {
      animation: marquee 30s linear infinite;
    }
    .animate-marquee-reverse {
      animation: marquee-reverse 30s linear infinite;
    }
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes marquee-reverse {
      0% { transform: translateX(-50%); }
      100% { transform: translateX(0); }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackComponent {
  // Split tools into two lists for better balance and density
  toolsRow1 = signal([
    { name: 'Python', slug: 'python' },
    { name: 'LangChain', slug: 'langchain' },
    { name: 'Anthropic', slug: 'anthropic' },
    { name: 'PyTorch', slug: 'pytorch' },
    { name: 'TensorFlow', slug: 'tensorflow' },
    { name: 'Docker', slug: 'docker' },
    { name: 'Ray', slug: 'ray' },
    { name: 'Neo4j', slug: 'neo4j' },
  ]);

  toolsRow2 = signal([
    { name: 'Hugging Face', slug: 'huggingface' },
    { name: 'LangGraph', slug: 'langchain' },
    { name: 'Scikit-Learn', slug: 'scikitlearn' },
    { name: 'NumPy', slug: 'numpy' },
    { name: 'Pandas', slug: 'pandas' },
    { name: 'Kubernetes', slug: 'kubernetes' },
    { name: 'Apache Spark', slug: 'apachespark' },
    { name: 'FastAPI', slug: 'fastapi' },
    // Use custom vector path for Pinecone as slug is unreliable
    { 
      name: 'Pinecone', 
      slug: '', 
      path: 'M12,2L2,7l10,5l10-5L12,2z M2,17l10,5l10-5M2,12l10,5l10-5' 
    }
  ]);
}
