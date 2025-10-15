import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  protected readonly menuItems = signal([
    { label: 'Servicios', link: '#services' },
    { label: 'Equipo', link: '#team' },
    { label: 'Noticias', link: '#noticias' },
    { label: 'La Firma', link: '#la-firma' }
  ]);

  protected readonly isMenuOpen = signal(false);

  toggleMenu(): void {
    this.isMenuOpen.update(value => !value);
  }

  scrollToSection(event: Event, link: string): void {
    event.preventDefault();
    const element = document.querySelector(link);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.isMenuOpen.set(false);
    }
  }
}

