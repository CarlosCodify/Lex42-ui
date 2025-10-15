import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  photo: string;
  email: string;
  profileUrl?: string;
}

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {
  protected readonly teamMembers = signal<TeamMember[]>([
    {
      id: 1,
      name: 'Pablo A. Rengifo',
      position: 'Abogado',
      photo: '/assets/images/teams/1.jpg',
      email: 'pablo.rengifo@lex42.com',
      profileUrl: '/team/pablo-rengifo'
    },
    {
      id: 2,
      name: 'Juan Pérez',
      position: 'Abogado Senior',
      photo: '/assets/images/teams/2.jpg',
      email: 'juan.perez@lex42.com',
      profileUrl: '/team/juan-perez'
    },
    {
      id: 3,
      name: 'María González',
      position: 'Abogada Especialista',
      photo: '/assets/images/teams/3.jpg',
      email: 'maria.gonzalez@lex42.com',
      profileUrl: '/team/maria-gonzalez'
    }
  ]);

  openEmail(email: string): void {
    window.location.href = `mailto:${email}`;
  }

  goToProfile(member: TeamMember): void {
    console.log('Ir al perfil de:', member.name);
  }
}

