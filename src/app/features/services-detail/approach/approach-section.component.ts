import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ApproachCard {
  id: number;
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-approach-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './approach-section.component.html',
  styleUrl: './approach-section.component.css'
})
export class ApproachSectionComponent {
  protected readonly approachCards = [
    {
      id: 1,
      title: 'Analizamos tu caso',
      description: 'Entendemos tu negocio, objetivos y preocupaciones legales para diseñar soluciones que realmente te sirvan.',
      image: '/assets/images/services/approach/team-brainstorming.svg'
    },
    {
      id: 2,
      title: 'Diseñamos soluciones prácticas',
      description: 'Nada de textos eternos o respuestas vagas. Creamos estrategias legales claras, accionables y adaptadas a tu operación.',
      image: '/assets/images/services/approach/designer-giving-a-keynote.svg'
    },
    {
      id: 3,
      title: 'Priorizamos los riesgos',
      description: 'Identificamos los puntos críticos y los abordamos de forma proactiva para evitar demandas, sanciones o bloqueos.',
      image: '/assets/images/services/approach/done.svg'
    },
    {
      id: 4,
      title: 'Actuamos con agilidad y estrategia',
      description: 'No te dejamos esperando. Respondemos con velocidad, precisión y visión a largo plazo.',
      image: '/assets/images/services/approach/high-five.svg'
    }
  ];
}
