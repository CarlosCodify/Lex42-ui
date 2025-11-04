import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  id: number;
  avatar: string;
  quote: string;
  author: string;
  company: string;
  rating: number;
  position: { top?: string; bottom?: string; left?: string; right?: string; transform?: string; };
  svg: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  protected readonly testimonials = signal<Testimonial[]>([
    {
      id: 1,
      avatar: '/assets/images/testimonials/avatar-2.png',
      quote: 'Tu tranquilidad jurídica es nuestra prioridad',
      author: 'Lex 42',
      company: '',
      rating: 5,
      position: {},
      svg: '/assets/images/utils/briefcase-01.svg'
    },
    {
      id: 2,
      avatar: '/assets/images/testimonials/avatar-1.svg',
      quote: 'Con Lex 42 tomamos decisiones con tranquilidad y claridad. Siempre entienden lo que necesitamos.',
      author: 'Yolver Gutierrez',
      company: '',
      rating: 5,
      position: {},
      svg: '/assets/images/utils/user-circle.svg'
    },
    {
      id: 3,
      avatar: '/assets/images/testimonials/avatar-3.png',
      quote: 'Lex 42 prioriza nuestro negocio y siempre responde con soluciones claras y ágiles.',
      author: 'Galvanizados de Occidente',
      company: '',
      rating: 5,
      position: {},
      svg: '/assets/images/utils/briefcase-01.svg'
    }
  ]);

  protected readonly clientLogos = signal([
    { name: 'Ingeal de Occidente', src: '/assets/images/clients/ingeal.png' },
    { name: 'Quimisa', src: '/assets/images/clients/quimisa.png' },
    { name: 'CNID', src: '/assets/images/clients/cnid.png' },
    { name: 'Servinformación', src: '/assets/images/clients/servinformacion.png' },
    { name: 'Casa Estudio Fitness Club', src: '/assets/images/clients/casa-estudio.png' },
    { name: 'Don karlos', src: '/assets/images/clients/don-karlos.png' }
  ]);

  protected getStarArray(rating: number): number[] {
    return Array(rating).fill(0);
  }
}

