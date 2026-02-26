
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
            <h2 class="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4">Our Team</h2>
            <h3 class="text-4xl md:text-6xl font-light tracking-tight">
             The Architects Behind <br/>
             TensorFold.ai
            </h3>
          </div>
          <p class="text-slate-400 max-w-sm text-right mt-8 md:mt-0 font-light">
A high-performance unit of AI architects, ML engineers, and data specialists building real, production-ready systems.          </p>
        </div>

        <div class="grid gap-4">
          @for (job of jobs(); track job.id) {
            <div class="group relative p-8 border border-slate-800 bg-slate-800/30 hover:bg-slate-800/60 transition-all duration-300 rounded-lg flex flex-col md:flex-row justify-between items-center cursor-pointer">
              <div class="flex flex-col gap-2">
                <h4 class="text-xl font-medium text-slate-100 group-hover:text-cyan-300 transition-colors">{{ job.title }}</h4>
                <div class="flex gap-4 text-xs font-mono text-slate-500">
                  <span>{{ job.location }}</span>
                  <span>{{ job.type }}</span>
                </div>
              </div>
              
              <div class="mt-6 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                <span class="text-sm font-bold text-cyan-400">View Profile &rarr;</span>
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
    { id: 1, title: 'Ahsan Aftab', location: 'Founder & CEO | Chief AI Architect' },
    { id: 2, title: 'Tazmeen Afroz', location: 'Full Stack AI Engineer' },
    { id: 3, title: 'Mubasher Shahzad', location: 'ML Engineer' },
    { id: 4, title: 'Marvan Shahid', location: 'Product Designer' },
    { id: 5, title: 'Tayyab Riaz', location: 'Data Scientist' }
  ]);
}
