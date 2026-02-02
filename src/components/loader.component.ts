
import { Component, ChangeDetectionStrategy, signal, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 z-[100] bg-slate-50 flex flex-col items-center justify-center overflow-hidden transition-all duration-1000 ease-in-out"
         [class.opacity-0]="!isActive()"
         [class.pointer-events-none]="!isActive()"
         [class.scale-105]="!isActive()">
      
      <!-- Central Animation Container -->
      <div class="relative w-32 h-32 mb-16 flex items-center justify-center">
        
        <!-- Ambient Glow -->
        <div class="absolute inset-0 bg-cyan-400/20 rounded-full blur-2xl animate-pulse"></div>
        
        <!-- Outer Ring (Slow) -->
        <div class="absolute inset-0 border-[1px] border-slate-200 rounded-full"></div>
        <div class="absolute inset-0 border-[1px] border-transparent border-t-cyan-500 rounded-full animate-spin-slow"></div>
        
        <!-- Middle Ring (Reverse) -->
        <div class="absolute inset-4 border-[1px] border-slate-200 rounded-full opacity-50"></div>
        <div class="absolute inset-4 border-[1px] border-transparent border-l-blue-500 rounded-full animate-spin-reverse"></div>
        
        <!-- Inner Ring (Fast) -->
        <div class="absolute inset-8 border-[1px] border-slate-200 rounded-full opacity-30"></div>
        <div class="absolute inset-8 border-[1px] border-transparent border-b-violet-500 rounded-full animate-spin-fast"></div>
        
        <!-- Center Core -->
        <div class="absolute w-2 h-2 bg-slate-900 rounded-full shadow-[0_0_15px_rgba(15,23,42,0.5)]"></div>
      </div>

      <!-- Text Status -->
      <div class="flex flex-col items-center gap-4 relative z-10">
        <h1 class="text-4xl font-bold tracking-tighter text-slate-900 animate-pulse-slow">TENSORFOLD</h1>
        
        <!-- Scramble/Decode Text Effect -->
        <div class="font-mono text-[10px] text-cyan-600 tracking-[0.3em] uppercase h-4 flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-blink"></span>
            {{ loadingText() }}
        </div>
      </div>

      <!-- Bottom Progress Line -->
      <div class="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent transition-all duration-[200ms] ease-out w-0"
           [style.width]="progress() + '%'"></div>
      
      <!-- Decorative Tech Data -->
      <div class="absolute bottom-12 left-12 font-mono text-[9px] text-slate-400 hidden md:block">
         <div>SYS.INIT_SEQ_2024</div>
         <div class="mt-1 text-slate-300">LOADING_MODULES: [KERNEL, VISUALS, AI_CORE]</div>
      </div>

      <div class="absolute bottom-12 right-12 font-mono text-[9px] text-slate-400 text-right hidden md:block">
        <div>MEMORY_ALLOC: {{ memory() }} TB</div>
        <div>LATENCY: <span class="text-cyan-500">0.02ms</span></div>
      </div>

    </div>
  `,
  styles: [`
    .animate-spin-slow { animation: spin 4s linear infinite; }
    .animate-spin-reverse { animation: spin 2.5s linear infinite reverse; }
    .animate-spin-fast { animation: spin 1s linear infinite; }
    .animate-pulse-slow { animation: pulse 3s infinite; }
    .animate-blink { animation: blink 0.5s step-end infinite alternate; }
    
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.8; } }
    @keyframes blink { from { opacity: 1; } to { opacity: 0; } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent implements OnInit, OnDestroy {
  isActive = signal(true);
  loadingText = signal('INITIALIZING SYSTEM...');
  progress = signal(0);
  memory = signal(0);
  
  private progressIntervalId: ReturnType<typeof setInterval> | null = null;
  private memoryIntervalId: ReturnType<typeof setInterval> | null = null;
  private timeouts: ReturnType<typeof setTimeout>[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // 1. Visual Progress Bar Simulation (Goes to 90% and waits)
    this.progressIntervalId = setInterval(() => {
        if (this.progress() < 90) {
            this.progress.update(p => p + (Math.random() * 2));
        }
    }, 100);

    // 2. Text Sequence (Extended Timeline)
    const steps = [
        { t: 0, text: 'INITIALIZING SYSTEM...' },
        { t: 800, text: 'ALLOCATING TENSORS...' },
        { t: 1800, text: 'LOADING NEURAL ASSETS...' },
        { t: 2800, text: 'OPTIMIZING VIEWPORT...' },
        { t: 3800, text: 'ESTABLISHING UPLINK...' },
    ];

    steps.forEach(step => {
        this.timeouts.push(setTimeout(() => {
            if (this.isActive()) this.loadingText.set(step.text);
        }, step.t));
    });
    
    // 3. Memory counter effect (slower = less main-thread work)
    let mem = 0;
    this.memoryIntervalId = setInterval(() => {
        mem += Math.floor(Math.random() * 120);
        this.memory.set(mem);
        if (mem > 32000 && this.memoryIntervalId) clearInterval(this.memoryIntervalId);
    }, 80);

    // 4. LOADING LOGIC: fixed time while everything loads in background
    // All sections + images are already in DOM and loading. We show loader for 3.5s
    // so the page has time to load; then hide it so the site appears ready and smooth.
    if (isPlatformBrowser(this.platformId)) {
        const minTime = 3500;
        const maxTime = 5500;
        const minPromise = new Promise<void>(r => setTimeout(r, minTime));
        const maxPromise = new Promise<void>(r => setTimeout(r, maxTime));
        const loadPromise = new Promise<void>(r => {
            if (document.readyState === 'complete') r();
            else window.addEventListener('load', () => r(), { once: true });
        });
        // Hide when: (minTime elapsed AND window loaded) OR maxTime reached
        Promise.race([
            Promise.all([minPromise, loadPromise]),
            maxPromise
        ]).then(() => this.finishLoading());
    } else {
        setTimeout(() => this.finishLoading(), 3500);
    }
  }

  finishLoading() {
      this.progress.set(100);
      this.loadingText.set('SYSTEM READY.');
      if (this.progressIntervalId) { clearInterval(this.progressIntervalId); this.progressIntervalId = null; }
      if (this.memoryIntervalId) { clearInterval(this.memoryIntervalId); this.memoryIntervalId = null; }
      setTimeout(() => this.isActive.set(false), 500);
  }

  ngOnDestroy() {
    if (this.progressIntervalId) clearInterval(this.progressIntervalId);
    if (this.memoryIntervalId) clearInterval(this.memoryIntervalId);
    this.timeouts.forEach(t => clearTimeout(t));
  }
}
