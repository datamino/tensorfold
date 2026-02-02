
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BackgroundFlowComponent } from './components/background-flow.component';
import { NavMenuComponent } from './components/nav-menu.component';
import { HeroComponent } from './components/hero.component';
import { ServicesComponent } from './components/services.component';
import { CaseStudiesComponent } from './components/case-studies.component';
import { ResearchLabComponent } from './components/research-lab.component';
import { TechStackComponent } from './components/tech-stack.component';
import { CareersComponent } from './components/careers.component';
import { BlogComponent } from './components/blog.component';
import { ContactComponent } from './components/contact.component';
import { AboutComponent } from './components/about.component';
import { FooterComponent } from './components/footer.component';
import { LoaderComponent } from './components/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LoaderComponent,
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
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
