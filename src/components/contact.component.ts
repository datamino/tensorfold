
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <section class="py-32 px-6 bg-slate-50 relative">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-4xl md:text-5xl font-light text-slate-900 mb-8">Start the transmission.</h2>
        <p class="text-slate-500 font-light mb-16 text-lg">
          Describe your data reality. We will engineer the intelligence to master it.
        </p>

        <form class="space-y-12 text-left">
          <div class="group relative">
            <input type="text" id="name" required class="peer w-full bg-transparent border-b border-slate-300 py-4 text-slate-900 focus:outline-none focus:border-cyan-600 transition-colors text-xl font-light placeholder-transparent" placeholder="Name" />
            <label for="name" class="absolute left-0 top-4 text-slate-400 transition-all duration-300 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-cyan-600 peer-valid:-top-6 peer-valid:text-xs peer-valid:text-cyan-600 cursor-text">
              Name / Organization
            </label>
          </div>

          <div class="group relative">
            <input type="email" id="email" required class="peer w-full bg-transparent border-b border-slate-300 py-4 text-slate-900 focus:outline-none focus:border-cyan-600 transition-colors text-xl font-light placeholder-transparent" placeholder="Email" />
            <label for="email" class="absolute left-0 top-4 text-slate-400 transition-all duration-300 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-cyan-600 peer-valid:-top-6 peer-valid:text-xs peer-valid:text-cyan-600 cursor-text">
              Email Address
            </label>
          </div>

          <div class="group relative">
            <textarea id="message" rows="4" required class="peer w-full bg-transparent border-b border-slate-300 py-4 text-slate-900 focus:outline-none focus:border-cyan-600 transition-colors text-xl font-light placeholder-transparent resize-none" placeholder="Message"></textarea>
            <label for="message" class="absolute left-0 top-4 text-slate-400 transition-all duration-300 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-cyan-600 peer-valid:-top-6 peer-valid:text-xs peer-valid:text-cyan-600 cursor-text">
              System Parameters / Message
            </label>
          </div>

          <div class="flex justify-center pt-8">
            <button type="submit" class="px-12 py-5 bg-slate-900 text-white rounded-full font-bold tracking-widest text-xs uppercase hover:bg-cyan-700 transition-colors shadow-xl hover:shadow-cyan-900/20">
              Initiate Contact
            </button>
          </div>
        </form>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {}
