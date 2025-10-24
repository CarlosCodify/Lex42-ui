import { Component, signal, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CtaSectionComponent } from '../../shared/components/cta-section/cta-section.component';
import { ApproachSectionComponent } from './approach/approach-section.component';
import { StoriesComponent } from '../stories/stories.component';
import { LexTipsComponent } from '../lex-tips/lex-tips.component';
import { Nl2brPipe } from '../../shared/pipes/nl2br.pipe';

interface ServiceDetail {
  id: number;
  title: string;
  description: string;
  detailedDescription: string;
  image: string;
  badges?: string[];
  variant: 'primary' | 'dark';
  size: 'normal' | 'large';
  expanded: boolean;
}

@Component({
  selector: 'app-services-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, CtaSectionComponent, ApproachSectionComponent, StoriesComponent, LexTipsComponent, Nl2brPipe],
  templateUrl: './services-detail.component.html',
  styleUrl: './services-detail.component.css'
})
export class ServicesDetailComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  protected readonly services = signal<ServiceDetail[]>([
    {
      id: 1,
      title: 'Derecho Laboral',
      description: 'Diseñamos estrategias laborales que protegen a su empresa, previniendo conflictos y defendiendo sus intereses ante cualquier contingencia legal.',
      detailedDescription: '• Rediseño de la Compensación de los trabajadores (Optimización de cargas tributarias)\n• Evaluación de estructura de la remuneración\n• Evaluación de nómina\n• Estudio de Cargas Laborales\n• Elaboración de Reglamento Interno del Trabajo\n• Procesos de Debida Diligencia Laboral\n• Litigio estratégico laboral\n• Negociaciones colectivas\n• Asesoría laboral empresarial permanente',
      image: '/assets/images/services/derecho-laboral.jpg',
      badges: ['Asesoría', 'Acompañamiento'],
      variant: 'primary',
      size: 'large',
      expanded: false
    },
    {
      id: 2,
      title: 'Derecho Corporativo',
      description: 'Brindamos soluciones legales para la creación, reestructuración y gobierno corporativo de su empresa, asegurando operaciones seguras y sostenibles.',
      detailedDescription: '• Asesoría legal integral para empresas\n• Gobierno corporativo y cumplimiento normativo\n• Contratos comerciales y societarios\n• Fusiones, adquisiciones y reestructuración de negocios\n• Prevención y gestión de riesgos legales',
      image: '/assets/images/services/derecho-corporativo.jpg',
      variant: 'dark',
      size: 'normal',
      expanded: false
    },
    {
      id: 3,
      title: 'Derecho Comercial',
      description: 'Ofrecemos asesoría en contratos y operaciones comerciales, garantizando seguridad jurídica y fortaleciendo las relaciones de negocio.',
      detailedDescription: '• Creación y revisión de contratos comerciales\n• Protección de propiedad intelectual y marcas\n• Asesoría en relaciones laborales y contratación de personal\n• Estrategias legales para ventas y expansión\n• Representación en negociaciones y disputas comerciales',
      image: '/assets/images/services/derecho-comercial.jpg',
      variant: 'primary',
      size: 'normal',
      expanded: false
    },
    {
      id: 4,
      title: 'Gestión Predial e Infraestructura',
      description: 'Brindamos soluciones legales en gestión de predios e infraestructura, optimizando procesos y previniendo riesgos para el desarrollo de sus proyectos.',
      detailedDescription: '• Gestión predial integral para proyectos públicos y privados\n• Negociación y legalización de servidumbres\n• Estructuración de esquemas de adquisición y compensación\n• Revisión de títulos y saneamiento jurídico de inmuebles\n• Representación ante autoridades urbanísticas y ambientales\n• Acompañamiento en procesos judiciales y administrativos derivados de la propiedad y uso del suelo',
      image: '/assets/images/services/gestion-predial.png',
      variant: 'dark',
      size: 'normal',
      expanded: false
    }
  ]);

  ngOnInit(): void {
    // Scroll to top when component loads (only in browser)
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }

  toggleService(serviceId: number): void {
    const services = this.services();
    const updatedServices = services.map(service => 
      service.id === serviceId 
        ? { ...service, expanded: !service.expanded }
        : service
    );
    this.services.set(updatedServices);
    
    const expandedService = updatedServices.find(s => s.id === serviceId && s.expanded);
    if (expandedService && isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const cardElement = document.querySelector(`[data-service-id="${serviceId}"]`);
        if (cardElement) {
          const rect = cardElement.getBoundingClientRect();
          const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
 
          if (!isVisible) {
            cardElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start',
              inline: 'nearest'
            });
          }
        }
      }, 200);
    }
  }
}
