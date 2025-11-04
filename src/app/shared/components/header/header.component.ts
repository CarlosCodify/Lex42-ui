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
    
    if (link === '#noticias' || link === '/noticias') {
      this.router.navigate(['/noticias']);
      this.isMenuOpen.set(false);
      return;
    }
    
    if (link === '#la-firma' || link === '/la-firma') {
      this.router.navigate(['/la-firma']).then(() => {
        // Hacer scroll al inicio de la página después de navegar
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      this.isMenuOpen.set(false);
      return;
    }
    
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          const element = document.querySelector(link);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      });
    } else {
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    
    this.isMenuOpen.set(false);
  }

  navigateToHome(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    this.isMenuOpen.set(false);
  }
}

