import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing-page.component').then(m => m.LandingPageComponent),
    title: 'TensorFold - Folding Intelligence into Reality'
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services-page.component').then(m => m.ServicesPageComponent),
    title: 'Services - TensorFold'
  },
  {
    path: 'case-studies',
    loadComponent: () => import('./pages/case-studies/case-studies-page.component').then(m => m.CaseStudiesPageComponent),
    title: 'Case Studies - TensorFold'
  },
  {
    path: 'research',
    loadComponent: () => import('./pages/research/research-page.component').then(m => m.ResearchPageComponent),
    title: 'Research - TensorFold'
  },
  {
    path: 'team',
    loadComponent: () => import('./pages/team/team-page.component').then(m => m.TeamPageComponent),
    title: 'Team - TensorFold'
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog-page.component').then(m => m.BlogPageComponent),
    title: 'Blog - TensorFold'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about-page.component').then(m => m.AboutPageComponent),
    title: 'About - TensorFold'
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact-page.component').then(m => m.ContactPageComponent),
    title: 'Contact - TensorFold'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
