
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-case-studies',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-32 w-full max-w-7xl mx-auto px-6">
      <div class="mb-24">
        <h2 class="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">Impact</h2>
        <h3 class="text-4xl md:text-5xl font-light text-slate-900">
          Transforming industries <br/>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">at the neural level.</span>
        </h3>
      </div>

      <div class="space-y-32">
        @for (study of studies(); track study.id; let i = $index) {
          <div class="relative group grid md:grid-cols-2 gap-12 items-center">
            
            <!-- Visual Side -->
            <!-- Changed loading="lazy" to loading="eager" so window.load waits for these -->
            <div [class.md:order-2]="i % 2 === 0" class="relative overflow-hidden rounded-2xl aspect-[4/3] bg-slate-100">
              <div class="absolute inset-0 bg-gradient-to-tr from-slate-200 to-slate-50 mix-blend-multiply z-10"></div>
              <img [src]="study.image" 
                   alt="Case Study Visualization" 
                   class="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000 ease-out grayscale group-hover:grayscale-0" 
                   loading="lazy"
                   decoding="async">
              
              <!-- Floating Metric Overlay -->
              <div class="absolute bottom-8 left-8 z-20 bg-white/80 backdrop-blur-md border border-white/50 p-6 rounded-xl shadow-lg">
                <div class="text-3xl font-bold text-slate-900 mb-1">{{ study.metricValue }}</div>
                <div class="text-xs font-mono uppercase tracking-wider text-slate-500">{{ study.metricLabel }}</div>
              </div>
            </div>

            <!-- Content Side -->
            <div [class.md:order-1]="i % 2 === 0" class="space-y-8">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-xs font-mono text-slate-500">
                <span class="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                {{ study.sector }}
              </div>
              
              <h4 class="text-3xl font-medium text-slate-900 leading-tight group-hover:text-cyan-700 transition-colors">
                {{ study.title }}
              </h4>
              
              <p class="text-lg text-slate-500 font-light leading-relaxed">
                {{ study.description }}
              </p>

              <div class="pt-8 border-t border-slate-100 grid grid-cols-2 gap-8">
                <div>
                  <div class="text-xs text-slate-400 uppercase tracking-widest mb-1">Timeline</div>
                  <div class="font-mono text-slate-700">{{ study.timeline }}</div>
                </div>
                <div>
                  <div class="text-xs text-slate-400 uppercase tracking-widest mb-1">Tech Stack</div>
                  <div class="font-mono text-slate-700">{{ study.stack }}</div>
                </div>
              </div>

              <button class="group/btn flex items-center gap-4 text-sm font-bold text-slate-900 mt-4">
                EXPLORE CASE STUDY
                <span class="block w-8 h-[1px] bg-slate-300 group-hover/btn:w-16 transition-all duration-300"></span>
              </button>
            </div>

          </div>
        }
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseStudiesComponent {
  studies = signal([
    {
      id: 1,
      title: 'Autonomous Logistics Grid',
      sector: 'Global Supply Chain',
      description: 'Replacing static routing tables with a liquid neural network that adapts to weather, traffic, and demand in real-time, reducing delivery latency by 40%.',
      image: 'https://picsum.photos/seed/tensor1/800/600',
      metricValue: '+214%',
      metricLabel: 'Efficiency Gain',
      timeline: '8 Months',
      stack: 'PyTorch / Kafka / Edge TPU'
    },
    {
      id: 2,
      title: 'FinTech Predictive Core',
      sector: 'High Frequency Trading',
      description: 'A transformer-based model processing unstructured news sentiment and market signals to predict micro-volatility events milliseconds before they occur.',
      image: 'https://picsum.photos/seed/tensor2/800/600',
      metricValue: '$4.2B',
      metricLabel: 'Volume Processed',
      timeline: '12 Months',
      stack: 'JAX / Rust / FPGA'
    }
  ]);
}
