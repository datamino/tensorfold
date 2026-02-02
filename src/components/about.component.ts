
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <section class="py-32 px-6 bg-white relative">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-sm font-mono uppercase tracking-widest text-slate-400 mb-8">Manifesto</h2>
        
        <p class="text-4xl md:text-6xl font-serif text-slate-900 leading-tight mb-12">
          "We don’t build software. <br/>
          We <span class="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">fold intelligence</span> into reality."
        </p>

        <div class="flex flex-col md:flex-row gap-12 text-left mt-24">
           <div class="flex-1">
             <h4 class="font-bold text-slate-900 mb-4">The Paradox</h4>
             <p class="text-slate-600 font-light leading-relaxed">
               Traditional software is static. The world is dynamic. We bridge this gap by creating systems that are not programmed, but taught. Systems that evolve.
             </p>
           </div>
           <div class="flex-1">
             <h4 class="font-bold text-slate-900 mb-4">The Method</h4>
             <p class="text-slate-600 font-light leading-relaxed">
               By combining advanced Tensor mathematics with pragmatic engineering, we create what we call "Fluid Intelligence" — software that adapts to its environment.
             </p>
           </div>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {}
