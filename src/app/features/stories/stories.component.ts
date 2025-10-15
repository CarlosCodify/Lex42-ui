import { Component, signal } from '@angular/core';

interface Story {
  quote: string;
  author: string;
  position: string;
  company: string;
  logo: string;
}

@Component({
  selector: 'app-stories',
  imports: [],
  templateUrl: './stories.component.html',
  styleUrl: './stories.component.css'
})
export class StoriesComponent {
  protected readonly stories = signal<Story[]>([
    {
      quote: 'Con Lex 42 contamos con asesoría permanente. Nos apoyamos en su equipo para diseñar nuestros esquemas de contratación en nuevos proyectos y para adaptar la empresa a los constantes cambios regulatorios.',
      author: 'Jacobo Riascos',
      position: 'Representante Legal Suplente de Ingeniería',
      company: 'en Galvanizados de Occidente',
      logo: '/assets/images/clients/ingeal.png'
    },
    {
      quote: 'Con Lex 42 tengo la tranquilidad de que siempre están a una llamada de distancia para resolver cualquier necesidad o imprevisto relacionado con nuestro equipo.',
      author: 'Daniel Sandoval',
      position: 'COO de Químicos Industriales Asociados',
      company: '(QUIMSA)',
      logo: '/assets/images/clients/quimisa.png'
    },
    {
      quote: 'Valoramos cómo Lex 42 nos resume e informa los cambios regulatorios que pueden impactar nuestra operación.',
      author: 'Manuel Peláez',
      position: 'CEO de Servi Información',
      company: '',
      logo: '/assets/images/clients/servinformacion.png'
    }
  ]);
}

