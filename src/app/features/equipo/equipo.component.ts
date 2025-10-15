import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  photo: string;
  email: string;
  profileUrl?: string; // Para implementar después
}

@Component({
  selector: 'app-equipo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipo.component.html',
  styleUrl: './equipo.component.css'
})
export class EquipoComponent {
  protected readonly teamMembers = signal<TeamMember[]>([
    {
      id: 1,
      name: 'Pablo A. Rengifo',
      position: 'Abogado',
      photo: '/assets/images/teams/1.jpg',
      email: 'pablo.rengifo@lex42.com',
      profileUrl: '/equipo/pablo-rengifo' // Para implementar después
    },
    {
      id: 2,
      name: 'Juan Pérez',
      position: 'Abogado Senior',
      photo: '/assets/images/teams/2.jpg',
      email: 'juan.perez@lex42.com',
      profileUrl: '/equipo/juan-perez'
    },
    {
      id: 3,
      name: 'María González',
      position: 'Abogada Especialista',
      photo: '/assets/images/teams/3.jpg',
      email: 'maria.gonzalez@lex42.com',
      profileUrl: '/equipo/maria-gonzalez'
    }
  ]);

  openEmail(email: string): void {
    window.location.href = `mailto:${email}`;
  }

  goToProfile(member: TeamMember): void {
    // Para implementar después la navegación al perfil completo
    console.log('Ir al perfil de:', member.name);
    // Cuando implementes routing:
    // this.router.navigate([member.profileUrl]);
  }
}

