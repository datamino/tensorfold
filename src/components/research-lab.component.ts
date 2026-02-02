
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, ChangeDetectionStrategy, signal, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as d3 from 'd3';

interface Point3D {
  x: number;
  y: number;
  z: number;
  px?: number; // Projected X
  py?: number; // Projected Y
  id: number;
}

interface Edge {
  source: number;
  target: number;
}

@Component({
  selector: 'app-research-lab',
  standalone: true,
  template: `
    <section class="relative w-full py-32 bg-slate-50 overflow-hidden">
      <!-- Background Lab Grid -->
      <div class="absolute inset-0 z-0 opacity-30 pointer-events-none" 
           style="background-image: linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px); background-size: 40px 40px;">
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <!-- Text Content -->
        <div class="order-2 md:order-1">
          <div class="flex items-center gap-2 mb-4">
            <span class="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
            <span class="text-cyan-600 font-mono text-xs uppercase tracking-widest">TensorFold Labs</span>
          </div>
          
          <h2 class="text-4xl md:text-5xl font-semibold text-slate-900 mb-8 tracking-tight">
            Pioneering the <br/>
            <span class="text-slate-400">next cognitive leap.</span>
          </h2>
          
          <div class="space-y-8">
             <div class="group pl-6 border-l-2 border-slate-200 hover:border-cyan-500 transition-colors duration-300">
               <h3 class="text-lg font-medium text-slate-800 mb-1 group-hover:text-cyan-700 transition-colors">Agentic AI Swarms</h3>
               <p class="text-slate-500 font-light text-sm">Autonomous multi-agent systems that plan, reason, and execute complex workflows without human-in-the-loop.</p>
             </div>
             <div class="group pl-6 border-l-2 border-slate-200 hover:border-violet-500 transition-colors duration-300">
               <h3 class="text-lg font-medium text-slate-800 mb-1 group-hover:text-violet-700 transition-colors">Retrieval Augmented Generation</h3>
               <p class="text-slate-500 font-light text-sm">Grounding Large Language Models in verified enterprise data to eliminate hallucinations and maximize relevance.</p>
             </div>
             <div class="group pl-6 border-l-2 border-slate-200 hover:border-blue-500 transition-colors duration-300">
               <h3 class="text-lg font-medium text-slate-800 mb-1 group-hover:text-blue-700 transition-colors">Model Context Protocol (MCP)</h3>
               <p class="text-slate-500 font-light text-sm">Standardizing how intelligent models interface with local environments and disparate data silos.</p>
             </div>
          </div>
          
          <button class="mt-12 group flex items-center gap-3 text-sm font-mono uppercase tracking-widest text-slate-900 border-b border-slate-900 pb-1 hover:text-cyan-600 hover:border-cyan-600 transition-all">
            <span>View Publications</span>
            <span class="transform group-hover:translate-x-1 transition-transform">-></span>
          </button>
        </div>

        <!-- Visual Container (Holographic Viewport) -->
        <div class="order-1 md:order-2 relative h-[500px] w-full flex items-center justify-center">
          <!-- The Viewport Frame -->
          <div class="relative w-full h-full border border-slate-200 bg-slate-900 overflow-hidden rounded-lg shadow-2xl shadow-slate-200/50">
            
            <!-- D3 Graph Container -->
            <div #graphContainer class="absolute inset-0 z-10 w-full h-full"></div>
            
            <!-- HUD Elements -->
            
            <!-- Top Left Corner -->
            <div class="absolute top-4 left-4 pointer-events-none z-20">
              <div class="w-2 h-2 bg-cyan-500 mb-1 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
              <div class="w-16 h-[1px] bg-cyan-900/50"></div>
              <div class="h-4 w-[1px] bg-cyan-900/50"></div>
            </div>

            <!-- Top Right Corner -->
            <div class="absolute top-4 right-4 pointer-events-none text-right z-20">
              <div class="text-[10px] font-mono text-cyan-400 font-bold tracking-wider shadow-cyan-500/50">TENSOR_LATTICE_V4</div>
              <div class="text-[9px] font-mono text-slate-500">REALTIME_SCAN</div>
            </div>

            <!-- Bottom Left Corner -->
            <div class="absolute bottom-4 left-4 pointer-events-none z-20">
               <div class="text-[10px] font-mono text-slate-500 mb-1">NODES: <span class="text-cyan-400 font-bold">{{ nodeCount() }}</span></div>
               <div class="flex gap-1">
                 <div class="w-1 h-3 bg-cyan-500/20 animate-pulse"></div>
                 <div class="w-1 h-3 bg-cyan-500/40 animate-pulse" style="animation-delay: 0.1s"></div>
                 <div class="w-1 h-3 bg-cyan-500/60 animate-pulse" style="animation-delay: 0.2s"></div>
               </div>
            </div>

            <!-- Bottom Right Corner -->
            <div class="absolute bottom-4 right-4 pointer-events-none z-20">
              <div class="h-4 w-[1px] bg-cyan-900/50 ml-auto"></div>
              <div class="w-16 h-[1px] bg-cyan-900/50 ml-auto"></div>
              <div class="w-2 h-2 bg-cyan-900/50 ml-auto mt-1"></div>
            </div>
            
             <!-- Vignette -->
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,42,0.6)_100%)] pointer-events-none z-10"></div>

          </div>
          
          <!-- Decorative Glow behind the box -->
          <div class="absolute -inset-4 bg-gradient-to-tr from-cyan-500/10 via-violet-500/10 to-blue-500/10 blur-2xl -z-10 rounded-full"></div>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResearchLabComponent implements AfterViewInit, OnDestroy {
  @ViewChild('graphContainer') graphContainer!: ElementRef<HTMLElement>;
  
  nodeCount = signal(0);
  private animationFrameId: any;
  
  // 3D Params
  private points: Point3D[] = [];
  private edges: Edge[] = [];
  private angleX = 0;
  private angleY = 0;
  
  // Scan Params
  private scanY = 0;
  private scanDirection = 2;
  private height = 0;
  private width = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.initVisualization(), 100);
    }
  }

  ngOnDestroy() {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
  }

  initVisualization() {
    const element = this.graphContainer.nativeElement;
    this.width = element.clientWidth || 500;
    this.height = element.clientHeight || 500;
    this.scanY = 0;

    // Setup SVG
    d3.select(element).selectAll('*').remove();
    const svg = d3.select(element)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${this.width} ${this.height}`)
      .style('background', 'transparent');

    // Generate Tensor (3D Grid 4x4x4)
    this.generateTensor(4, 70); 

    // Setup Selections
    const containerGroup = svg.append('g')
        .attr('transform', `translate(${this.width/2}, ${this.height/2})`); // Center 0,0

    const lineGroup = containerGroup.append('g').attr('class', 'lines');
    const nodeGroup = containerGroup.append('g').attr('class', 'nodes');

    // Scanner
    const scanGroup = svg.append('g').attr('class', 'scanner');
    
    // Gradient for Scanner
    const defs = svg.append('defs');
    const gradient = defs.append('linearGradient')
      .attr('id', 'scanGradient')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%');
    gradient.append('stop').attr('offset', '0%').attr('stop-color', 'rgba(6,182,212,0.8)');
    gradient.append('stop').attr('offset', '100%').attr('stop-color', 'rgba(6,182,212,0)');

    const scanLine = scanGroup.append('rect')
      .attr('width', this.width)
      .attr('height', 2)
      .attr('fill', '#22d3ee') // Cyan-400
      .attr('filter', 'drop-shadow(0 0 4px #22d3ee)');
      
    const scanTrail = scanGroup.append('rect')
      .attr('width', this.width)
      .attr('height', 50)
      .attr('fill', 'url(#scanGradient)')
      .attr('opacity', 0.2);

    // Initial Draw
    const lineSelection = lineGroup.selectAll('line')
      .data(this.edges)
      .enter().append('line')
      .attr('stroke', '#475569') // Slate-600
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 0.4);

    const nodeSelection = nodeGroup.selectAll('circle')
      .data(this.points)
      .enter().append('circle')
      .attr('r', 3)
      .attr('fill', '#94a3b8'); // Slate-400

    // Animation Loop
    const animate = () => {
      this.angleY += 0.005;
      this.angleX += 0.003;
      
      // Update Scanner
      this.scanY += this.scanDirection;
      if (this.scanY > this.height) {
         this.scanY = this.height;
         this.scanDirection = -2;
      } else if (this.scanY < 0) {
         this.scanY = 0;
         this.scanDirection = 2;
      }

      // Project Points
      this.points.forEach(p => {
        const rotated = this.rotate3D(p.x, p.y, p.z, this.angleX, this.angleY);
        // Perspective Projection
        const fov = 400;
        const scale = fov / (fov + rotated.z + 400); 
        p.px = rotated.x * scale;
        p.py = rotated.y * scale;
      });

      // Update Lines
      lineSelection
        .attr('x1', d => this.points[d.source].px!)
        .attr('y1', d => this.points[d.source].py!)
        .attr('x2', d => this.points[d.target].px!)
        .attr('y2', d => this.points[d.target].py!);

      // Update Nodes
      nodeSelection
        .attr('cx', d => d.px!)
        .attr('cy', d => d.py!)
        .attr('fill', d => {
          const screenY = d.py! + this.height/2;
          const diff = Math.abs(screenY - this.scanY);
          
          if (diff < 15) return '#ffffff'; // White hot
          if (diff < 40) return '#22d3ee'; // Cyan glow
          return '#475569'; // Back to Slate
        })
        .attr('r', d => {
           const screenY = d.py! + this.height/2;
           const diff = Math.abs(screenY - this.scanY);
           return diff < 40 ? 5 : 2; 
        })
        .attr('filter', d => {
           const screenY = d.py! + this.height/2;
           const diff = Math.abs(screenY - this.scanY);
           return diff < 20 ? 'drop-shadow(0 0 5px #22d3ee)' : null;
        });

      // Update Scanner Visuals
      scanLine.attr('y', this.scanY);
      if (this.scanDirection > 0) {
        scanTrail.attr('y', this.scanY - 50).attr('transform', null);
      } else {
        scanTrail.attr('y', this.scanY).attr('transform', `scale(1, -1) translate(0, -${2 * this.scanY})`);
        scanTrail.attr('y', this.scanY);
      }

      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  generateTensor(size: number, spacing: number) {
    this.points = [];
    this.edges = [];
    const offset = (size - 1) * spacing / 2;

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        for (let z = 0; z < size; z++) {
          const id = this.points.length;
          this.points.push({
            id,
            x: x * spacing - offset,
            y: y * spacing - offset,
            z: z * spacing - offset
          });

          if (x > 0) this.addEdge(id, id - size * size);
          if (y > 0) this.addEdge(id, id - size);
          if (z > 0) this.addEdge(id, id - 1);
        }
      }
    }
    this.nodeCount.set(this.points.length);
  }

  addEdge(p1: number, p2: number) {
    this.edges.push({ source: p1, target: p2 });
  }

  rotate3D(x: number, y: number, z: number, angleX: number, angleY: number) {
    let ry = y * Math.cos(angleX) - z * Math.sin(angleX);
    let rz = y * Math.sin(angleX) + z * Math.cos(angleX);
    
    let rx = x * Math.cos(angleY) + rz * Math.sin(angleY);
    rz = -x * Math.sin(angleY) + rz * Math.cos(angleY);

    return { x: rx, y: ry, z: rz };
  }
}
