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
      name: 'Juan S. Aguilar',
      position: 'Socio Fundador Laboral',
      photo: '/assets/images/teams/1.jpg',
      email: 'juanseaguilar@lex42.co',
      profileUrl: '/team/juan-aguilar'
    },
    {
      id: 2,
      name: 'Pablo A. Rengifo',
      position: 'Socio Fundador Comercial',
      photo: '/assets/images/teams/2.jpg',
      email: 'pablorengifo@lex42.co',
      profileUrl: '/team/pablo-rengifo'
    },
    {
      id: 3,
      name: 'Veronica Rengifo',
      position: 'Asociada Senior',
      photo: '/assets/images/teams/3.jpg',
      email: 'contacto@lex42.co',
      profileUrl: '/team/veronica-rengifo'
    }
  ]);

  openEmail(email: string): void {
    window.location.href = `mailto:${email}`;
  }

  goToProfile(member: TeamMember): void {
    console.log('Ir al perfil de:', member.name);
  }
}

