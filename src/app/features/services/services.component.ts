import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  imageWebP: string;
  imageFallback: string;
  badges?: string[];
  variant: 'primary' | 'dark';
  size: 'normal' | 'large';
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  protected readonly services = signal<Service[]>([
    {
      id: 1,
      title: 'Derecho Laboral',
      description: 'Protege a tu empresa y a tus colaboradores desde la contratación hasta la nómina. Prevenimos riesgos y aseguramos el cumplimiento legal en cada proceso laboral.',
      image: '/assets/images/services/derecho-laboral.webp',
      imageWebP: '/assets/images/services/derecho-laboral.webp',
      imageFallback: '/assets/images/services/derecho-laboral.jpg',
      badges: ['Asesoría', 'Acompañamiento'],
      variant: 'primary',
      size: 'large'
    },
    {
      id: 2,
      title: 'Derecho Comercial',
      description: 'Protegemos los intereses de tu empresa en cada contrato, negociación y operación comercial. Redactamos, revisamos y optimizamos acuerdos con respaldo legal experto',
      image: '/assets/images/services/derecho-comercial.webp',
      imageWebP: '/assets/images/services/derecho-comercial.webp',
      imageFallback: '/assets/images/services/derecho-comercial.jpg',
      variant: 'primary',
      size: 'normal'
    },
    {
      id: 3,
      title: 'Derecho Corporativo',
      description: 'Impulsa tu crecimiento con decisiones legales alineadas a tu estrategia. Desde la creación de empresas hasta el gobierno corporativo, estructuramos con visión a largo plazo.',
      image: '/assets/images/services/derecho-corporativo.webp',
      imageWebP: '/assets/images/services/derecho-corporativo.webp',
      imageFallback: '/assets/images/services/derecho-corporativo.jpg',
      variant: 'dark',
      size: 'normal'
    },
    {
      id: 4,
      title: 'Gestión Predial e Infraestructura',
      description: 'Asesoramos legalmente todas las etapas de proyectos que requieren adquisición de predios o servidumbres. Incluye revisión de títulos, negociación, representación y trámites ante autoridades.',
      image: '/assets/images/services/gestion-predial.webp',
      imageWebP: '/assets/images/services/gestion-predial.webp',
      imageFallback: '/assets/images/services/gestion-predial.png',
      variant: 'dark',
      size: 'normal'
    }
  ]);
}

