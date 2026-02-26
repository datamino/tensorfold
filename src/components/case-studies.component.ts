
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
                   loading="eager"
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
      title: 'RevOps Intelligence Platform',
      sector: 'B2B SaaS / Revenue Operations',
      description: 'A multi-agent AI system combining RAG pipelines, predictive lead scoring, and campaign intelligence to automate acquisition and retention workflows, improving operational efficiency by over 80%.',
      image: 'https://images.unsplash.com/photo-1707157281599-d155d1da5b4c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      metricValue: '+80%',
      metricLabel: 'Operational Efficiency',
      timeline: '8–10 Months',
      stack: 'LangChain / Azure / FastAPI'
    },
    {
      id: 2,
      title: 'Hybrid LLM-to-SQL Intelligence Platform',
      sector: 'Enterprise Data & Analytics',
      description: 'A hybrid retrieval and structured-query intelligence system enabling natural language interaction with enterprise data warehouses, achieving 95% query accuracy while maintaining secure, low-latency execution.',
      image: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      metricValue: '95%',
      metricLabel: 'Query Accuracy',
      timeline: '2 Months',
      stack: 'BigQuery / Vertex AI / OpenAI'
    },
    {
      id: 3,
      title: 'ATLAS Hybrid Intelligence Engine',
      sector: 'Knowledge Graph & Retrieval AI',
      description: 'A production-grade hybrid retrieval system combining knowledge graphs (Neo4j) and vector search (Qdrant) with multi-agent planning, multi-hop reasoning, and streaming LLM synthesis for grounded enterprise intelligence.',
      image: 'https://images.unsplash.com/photo-1674027444454-97b822a997b6?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      metricValue: 'Hybrid',
      metricLabel: 'Knowledge Graph + Vector',
      timeline: '2–4 Months',
      stack: 'Neo4j / Qdrant / LangChain'
    },
    {

      id: 4,
      title: 'Arabic Speech Intelligence Engine',
      sector: 'Multilingual AI Systems',
      description: 'Training a dialect-aware speech recognition model on 5,000+ hours of Arabic audio, delivering significant improvements in transcription precision and real-world deployment performance.',
      image: 'https://images.unsplash.com/photo-1648126506800-a7b1412fcadf?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      metricValue: '5,000+',
      metricLabel: 'Training Hours',
      timeline: '6 Months',
      stack: 'Whisper / Pytorch / Distributed Training'

    },
    {

      id: 5,
      title: 'Legal Intelligence Engine',
      sector: 'Enterprise Document AI',
      description: 'Transforming unstructured legal contracts into structured intelligence through advanced NLP parsing and clause extraction, enabling automated compliance and risk analysis.',
      image: 'https://images.unsplash.com/photo-1617203443952-6d2619f7ff4e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      metricValue: '94%',
      metricLabel: 'Extraction Accuracy',
      timeline: '3 Months',
      stack: 'BERT / Elasticsearch / Python'

    },
    {

      id: 6,
      title: 'Adcertify Automobiles AI',
      sector: 'Automotive Data & Analytics',
      description: 'A large-scale data engineering system processing millions of daily vehicle sales records across the United States, with automated ETL pipelines and real-time dashboards enabling dealers to benchmark pricing, inventory trends, and regional performance.',
      image: 'https://images.unsplash.com/photo-1608341089966-92c09e62214f?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      metricValue: '15+',
      metricLabel: 'Millions of Records',
      timeline: '8 Months',
      stack: 'Python / ETL Pipelines / SQL '

    }
  ]);
}
