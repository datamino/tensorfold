
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, NgZone, Inject, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-particle-wave',
  standalone: true,
  template: `
    <canvas #canvas class="absolute inset-0 w-full h-full pointer-events-none"></canvas>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParticleWaveComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D;
  private animationFrameId: number | undefined;
  private width = 0;
  private height = 0;
  private time = 0;

  // PERFORMANCE OPTIMIZATION:
  // Reduced geometry count for 60fps smoothness while maintaining the visual structure.
  private readonly strands = 45; 
  private readonly segments = 30;
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initCanvas();
      this.ngZone.runOutsideAngular(() => this.animate());
      window.addEventListener('resize', this.handleResize);
    }
  }

  ngOnDestroy() {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.handleResize);
    }
  }

  handleResize = () => {
    this.initCanvas();
  }

  initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    
    // OPTIMIZATION: Cap Device Pixel Ratio at 1.5
    // High-DPI screens (e.g., Retina 3x) cause massive performance drops with full-screen canvas.
    // 1.5x offers a good balance of crispness and performance.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    
    canvas.width = this.width * dpr;
    canvas.height = this.height * dpr;
    
    // 'alpha: false' can sometimes speed up compositing if we didn't need transparency, 
    // but we need transparency. 'desynchronized' helps reduce latency on some browsers.
    this.ctx = canvas.getContext('2d', { desynchronized: true })!;
    this.ctx.scale(dpr, dpr);
    
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
  }

  animate() {
    if (!this.ctx) return;
    
    this.time += 0.004; // Smooth, slow flow
    
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    const cx = this.width / 2;
    const cy = this.height / 2;
    
    // Constant projection values
    const fov = 800;
    const cameraZ = 900;
    
    // Pre-calculate rotation matrices if static, but here they are dynamic per point usually.
    // However, we can optimize by removing the rotation calculation loop and doing a simpler transform.
    
    // Optimization: Inline math variables
    let x, y, z, scale, x2d, y2d;
    
    // Draw Strands
    for (let i = 0; i < this.strands; i++) {
        const v = (i / this.strands) * 2 - 1; // -1 to 1 across width
        
        this.ctx.beginPath();
        let firstPoint = true;

        // Optimization: Use a slightly simpler twist function
        const twistBase = this.time + v;

        for (let j = 0; j <= this.segments; j++) {
            const u = (j / this.segments) * 2 - 1; // -1 to 1 along length
            
            // --- SIMPLIFIED GEOMETRY ---
            // Removed heavy Math.pow calls
            
            // Shape Parameters
            const length = 1000;
            const ribbonWidth = 400 * (1 - u * u * 0.3); // Taper ends
            
            // Twist Logic
            const phase = twistBase + u * 2;
            const sinePhase = Math.sin(phase);
            const cosPhase = Math.cos(phase);
            
            // 3D Coords (Local)
            // X goes along the screen
            // Y and Z create the spiral
            const x_local = u * length;
            const y_local = v * ribbonWidth * cosPhase;
            const z_local = v * ribbonWidth * sinePhase + (Math.sin(phase * 1.5) * 100);

            // Rotate Object (-30 degrees X, -20 degrees Y) to face camera nicely
            // Pre-calculated approx sin/cos values for rotation to save CPU
            // X-Rotation (-0.4 rad): cos=0.92, sin=-0.39
            // Y-Rotation (-0.5 rad): cos=0.87, sin=-0.48
            
            // Apply simplified isometric rotation
            const ry = y_local * 0.92 - z_local * -0.39;
            const rz = y_local * -0.39 + z_local * 0.92;
            
            const rx = x_local * 0.87 + rz * -0.48;
            const rz_final = -x_local * -0.48 + rz * 0.87;
            
            // Project
            const z_depth = cameraZ + rz_final;
            if (z_depth < 10) continue; // Clip behind camera
            
            scale = fov / z_depth;
            x2d = rx * scale + cx;
            y2d = ry * scale + cy;
            
            if (firstPoint) {
                this.ctx.moveTo(x2d, y2d);
                firstPoint = false;
            } else {
                this.ctx.lineTo(x2d, y2d);
            }
        }
        
        // Style
        const hue = 190 + (i / this.strands) * 60 + Math.sin(this.time) * 10;
        const alpha = 0.2 + (1 - Math.abs(v)) * 0.3; // More opaque in center
        
        this.ctx.strokeStyle = `hsla(${hue}, 85%, 45%, ${alpha})`;
        this.ctx.lineWidth = 1.5;
        this.ctx.stroke();
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
}
