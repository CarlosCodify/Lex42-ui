import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) {}
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
    
    // Si el link es para noticias, navegar directamente
    if (link === '#noticias' || link === '/noticias') {
      this.router.navigate(['/noticias']);
      this.isMenuOpen.set(false);
      return;
    }
    
    // Si estamos en la página de servicios, navegar al home primero
    if (this.router.url === '/servicios') {
      this.router.navigate(['/']).then(() => {
        // Esperar a que se cargue la página principal y luego hacer scroll
        setTimeout(() => {
          const element = document.querySelector(link);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      });
    } else {
      // Si estamos en el home, hacer scroll normal
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    
    this.isMenuOpen.set(false);
  }

  navigateToHome(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/']);
    this.isMenuOpen.set(false);
  }
}

