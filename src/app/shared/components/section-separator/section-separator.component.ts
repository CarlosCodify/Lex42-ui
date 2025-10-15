import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-separator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-separator.component.html',
  styleUrl: './section-separator.component.css'
})
export class SectionSeparatorComponent {
  @Input() badge: string = 'Valor';
  @Input() title: string = 'Los clientes no quieren abogados. Quieren soluciones.';
  @Input() subtitle: string = 'Hablamos en tu idioma: claro, directo y estratégico. No solo resolvemos conflictos, los prevenimos';
}

