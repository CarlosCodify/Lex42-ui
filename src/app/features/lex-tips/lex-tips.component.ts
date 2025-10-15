import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-lex-tips',
  imports: [CommonModule],
  templateUrl: './lex-tips.component.html',
  styleUrl: './lex-tips.component.css'
})
export class LexTipsComponent {
  protected readonly faqs = signal<FaqItem[]>([
    {
      question: '¿Conoce que ha cambiado en la reforma laboral?',
      answer: 'Conoce los cambios clave propuestos en contratación, jornadas y despidos. Esta reforma puede impactar directamente tus relaciones laborales y costos. Prepárate para anticiparte, no para reaccionar.',
      isOpen: true
    },
    {
      question: '¿Ya es momento de constituirme?',
      answer: 'Te ayudamos a evaluar si es el momento adecuado para formalizar tu negocio, considerando aspectos legales, fiscales y de protección patrimonial.',
      isOpen: false
    },
    {
      question: '¿Mi marca está realmente protegida?',
      answer: 'Analizamos el estado de protección de tu marca y te guiamos en el proceso de registro para evitar conflictos futuros.',
      isOpen: false
    },
    {
      question: '¿Mi inversión inmobiliaria es segura?',
      answer: 'Revisamos todos los aspectos legales de tu inversión inmobiliaria para garantizar que tu patrimonio esté protegido.',
      isOpen: false
    }
  ]);

  toggleFaq(index: number): void {
    this.faqs.update(items => 
      items.map((item, i) => ({
        ...item,
        isOpen: i === index ? !item.isOpen : item.isOpen
      }))
    );
  }
}

