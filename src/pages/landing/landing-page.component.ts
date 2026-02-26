import { Component, ChangeDetectionStrategy, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { BackgroundFlowComponent } from '../../components/background-flow.component';
import { NavMenuComponent } from '../../components/nav-menu.component';
import { HeroComponent } from '../../components/hero.component';
import { ServicesComponent } from '../../components/services.component';
import { CaseStudiesComponent } from '../../components/case-studies.component';
import { ResearchLabComponent } from '../../components/research-lab.component';
import { TechStackComponent } from '../../components/tech-stack.component';
import { CareersComponent } from '../../components/careers.component';
import { BlogComponent } from '../../components/blog.component';
import { ContactComponent } from '../../components/contact.component';
import { AboutComponent } from '../../components/about.component';
import { FooterComponent } from '../../components/footer.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    BackgroundFlowComponent,
    NavMenuComponent,
    HeroComponent,
    ServicesComponent,
    CaseStudiesComponent,
    ResearchLabComponent,
    TechStackComponent,
    CareersComponent,
    BlogComponent,
    ContactComponent,
    AboutComponent,
    FooterComponent
  ],
  template: `
    <div class="relative w-full min-h-screen text-slate-800 selection:bg-cyan-200 selection:text-cyan-900">
      <!-- Living Background Layer -->
      <app-background-flow class="fixed inset-0 z-0 pointer-events-none"></app-background-flow>

      <!-- Navigation -->
      <app-nav-menu class="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none" [isLandingPage]="true"></app-nav-menu>

      <!-- Main Content: all sections load while loader spins, so the site is ready when loader hides -->
      <main class="relative z-10 flex flex-col gap-0 pb-0">
        <app-hero></app-hero>
        <div class="reveal-section" #revealSection>
          <app-services id="services"></app-services>
        </div>
        <div class="reveal-section" #revealSection>
          <app-case-studies id="casestudies"></app-case-studies>
        </div>
        <div class="reveal-section" #revealSection>
          <app-tech-stack></app-tech-stack>
        </div>
        <div class="reveal-section" #revealSection>
          <app-research-lab id="research"></app-research-lab>
        </div>
        <div class="reveal-section" #revealSection>
          <app-careers id="careers"></app-careers>
        </div>
        <div class="reveal-section" #revealSection>
          <app-blog id="insights"></app-blog>
        </div>
        <div class="reveal-section" #revealSection>
          <app-about id="about"></app-about>
        </div>
        <div class="reveal-section" #revealSection>
          <app-contact id="contact"></app-contact>
        </div>
      </main>
      
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .reveal-section {
      opacity: 0;
      transform: translateY(60px);
      transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .reveal-section.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('revealSection') revealSections!: QueryList<ElementRef>;

  private observer: IntersectionObserver | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollAnimations();
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private initScrollAnimations() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    this.revealSections.forEach((el) => {
      this.observer?.observe(el.nativeElement);
    });
  }
}
