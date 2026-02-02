
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-careers',
  standalone: true,
  template: `
    <section class="py-32 bg-slate-900 text-slate-50 relative overflow-hidden">
      <!-- Decorative background elements -->
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div class="max-w-7xl mx-auto px-6 relative z-10">
        <div class="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-slate-800 pb-12">
          <div>
            <h2 class="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4">Careers</h2>
            <h3 class="text-4xl md:text-6xl font-light tracking-tight">
              Join the Architects <br/>
              of Intelligence.
            </h3>
          </div>
          <p class="text-slate-400 max-w-sm text-right mt-8 md:mt-0 font-light">
            We are looking for rare minds to help us build the operating system for the next century.
          </p>
        </div>

        <div class="grid gap-4">
          @for (job of jobs(); track job.id) {
            <div class="group relative p-8 border border-slate-800 bg-slate-800/30 hover:bg-slate-800/60 transition-all duration-300 rounded-lg flex flex-col md:flex-row justify-between items-center cursor-pointer">
              <div class="flex flex-col gap-2">
                <h4 class="text-xl font-medium text-slate-100 group-hover:text-cyan-300 transition-colors">{{ job.title }}</h4>
                <div class="flex gap-4 text-xs font-mono text-slate-500">
                  <span>{{ job.location }}</span>
                  <span>//</span>
                  <span>{{ job.type }}</span>
                </div>
              </div>
              
              <div class="mt-6 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                <span class="text-sm font-bold text-cyan-400">APPLY &rarr;</span>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareersComponent {
  jobs = signal([
    { id: 1, title: 'Senior Tensor Architect', location: 'San Francisco / Remote', type: 'Engineering' },
    { id: 2, title: 'Generative AI Researcher', location: 'London', type: 'Research' },
    { id: 3, title: 'Computational Linguist', location: 'Remote', type: 'Product' },
    { id: 4, title: 'Visual Systems Designer', location: 'New York', type: 'Design' }
  ]);
}
