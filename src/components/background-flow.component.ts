
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-background-flow',
  standalone: true,
  template: `
    <div class="absolute inset-0 overflow-hidden bg-slate-50">
      <!-- Gradient Orbs -->
      <div class="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-cyan-200/40 rounded-full blur-[120px] mix-blend-multiply animate-blob"></div>
      <div class="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-violet-200/40 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-2000"></div>
      <div class="absolute bottom-[-20%] left-[20%] w-[70vw] h-[70vw] bg-blue-100/50 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-4000"></div>
      <div class="absolute top-[40%] right-[30%] w-[40vw] h-[40vw] bg-indigo-100/40 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-6000"></div>
      
      <!-- Noise texture overlay for film grain effect -->
      <div class="absolute inset-0 opacity-[0.03] pointer-events-none" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');"></div>
    </div>
  `,
  styles: [`
    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    .animate-blob {
      animation: blob 15s infinite;
    }
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    .animation-delay-4000 {
      animation-delay: 4s;
    }
    .animation-delay-6000 {
      animation-delay: 6s;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackgroundFlowComponent {}
