import { Component, signal, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CtaSectionComponent } from '../../shared/components/cta-section/cta-section.component';
import { Nl2brPipe } from '../../shared/pipes/nl2br.pipe';
import { StoriesComponent } from '../stories/stories.component';

interface ProfessionalSection {
  title: string;
  content?: string;
  content2?: string;
  items?: string[];
  items2?: string[];
}

interface TeamMemberDetail {
  id: number;
  name: string;
  role: string;
  email: string;
  location: string;
  linkedinUrl?: string;
  photo: string;
  background: string;
  professionalSections: ProfessionalSection[];
}

@Component({
  selector: 'app-team-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, StoriesComponent, CtaSectionComponent, Nl2brPipe],
  templateUrl: './team-detail.component.html',
  styleUrl: './team-detail.component.css'
})
export class TeamDetailComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  protected readonly selectedMember = signal<TeamMemberDetail | null>(null);
  
  protected readonly teamMembers = signal<TeamMemberDetail[]>([
    {
      id: 1,
      name: 'Pablo Andres Rengifo',
      role: 'Socio Fundador Comercial',
      email: 'pablorengifo@lex42.co',
      location: 'Bogotá',
      linkedinUrl: 'https://www.linkedin.com/in/pablo-andr%C3%A9s-rengifo-trujillo-633394228/',
      photo: '/assets/images/teams/2.jpg',
      background: 'Abogado, Pontificia Universidad Javeriana; Énfasis derecho empresarial; Especialista en Derecho Comercial, Universidad de los Andes.',
      professionalSections: [
        {
          title: 'Experiencia Laboral',
          content: 'Con más de tres años de experiencia, ha asesorado empresas en áreas clave del derecho comercial, incluyendo:',
          items: [
            'Protección de datos personales',
            'Revisión y negociación de contratos comerciales',
            'Derecho del consumidor',
            'Procesos de insolvencia y reorganización empresarial abreviada',
            'Procedimientos de liquidación voluntaria y judicial'
          ],
          content2: 'Ha participado en procesos de fusiones reorganizativas en diversos sectores y tiene sólida experiencia en la constitución de sociedades y gestión de asuntos corporativos:',
          items2: [
            'Elaboración de actas y reformas estatutarias',
            'Asesoría a órganos de administración y asamblea',
            'Soporte legal corporativo integral'
          ]
        },
        {
          title: 'Enfoque profesional',
          content: 'Como socio fundador de Lex 42, aporta una visión estratégica con enfoque técnico y práctico, ofreciendo soluciones jurídicas sólidas y alineadas con los objetivos de negocio de sus clientes.'
        },
        {
          title: 'Habilidades',
          items: [
            'Visión estratégica',
            'Enfoque técnico riguroso para brindar soluciones jurídicas sólidas',
            'Prácticas y alineadas con los objetivos empresariales de sus clientes'
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Juan Sebastián Robayo Aguilar',
      role: 'Socio Fundador Laboral',
      email: 'juanseaguilar@lex42.co',
      location: 'Bogotá',
      linkedinUrl: 'https://www.linkedin.com/in/juan-sebastián-robayo-aguilar-8a4a17160/',
      photo: '/assets/images/teams/1.jpg',
      background: 'Abogado, Universidad de los Andes; Cuenta con un Diplomado en la evaluación de los Sistemas de Gestión Integral de la calidad QHSE; Énfasis derecho laboral.',
      professionalSections: [
        {
          title: 'Experiencia Laboral',
          content: 'Con más de seis años de experiencia, ha asesorado empresas en áreas clave del derecho laboral y de la seguridad social, incluyendo:',
          items: [
            'Auditorías laborales y diagnósticos de nómina',
            'Procesos de debida diligencia (due diligence) en M&A laboral',
            'Representación en litigios estratégicos laborales y procesos ante la UGPP',
            'Negociaciones colectivas y relaciones sindicales',
            'Elaboración de documentos legales de alta complejidad'
          ],
          content2: 'Se desempeñó como Active Senior – Staff II de la práctica laboral en Ernst & Young (EY), donde lideró procesos de consultoría laboral para empresas nacionales y multinacionales. También trabajó en la Gerencia Nacional de Relaciones Laborales de Sodimac Corona – Homecenter, desarrollando estrategias de mitigación de riesgos en tercerización y optimización de prácticas laborales.\n\nActualmente es Gerente fundador del área de Proyectos Laborales en el Estudio Jurídico Lex 42, liderando un equipo interdisciplinario de abogados, economistas y contadores que brinda soluciones integrales a empresas de diversos sectores.'
        },
        {
          title: 'Enfoque Profesional',
          content: 'Como socio fundador de Lex 42, aporta una visión estratégica en derecho laboral y seguridad social, combinando excelencia académica con experiencia práctica en firmas de primer nivel. Su enfoque está orientado a resultados, adaptabilidad y soluciones jurídicas sólidas alineadas con los objetivos corporativos de sus clientes.'
        },
        {
          title: 'Habilidades',
          items: [
            'Liderazgo en proyectos interdisciplinarios',
            'Negociación y resolución de conflictos laborales',
            'Visión estratégica y orientación a resultados',
            'Capacidad de trabajo bajo presión y gestión de equipos',
            'Investigación jurídica avanzada y análisis crítico'
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'Veronica Rengifo',
      role: 'Asociada Senior',
      email: 'veronicarenjifo@hotmail.com',
      location: 'Buga, Valle del Cauca',
      photo: '/assets/images/teams/3.jpg',
      background: 'Derecho Inmobiliario y Gestión Predial; Abogada, Universidad Santiago de Cali.',
      professionalSections: [
        {
          title: 'Experiencia Laboral',
          content: 'Abogada con más de 21 años de trayectoria en el sector inmobiliario, energético y de consultoría.\n\nSu experiencia se ha enfocado en la gestión predial integral, la negociación y legalización de predios para proyectos de infraestructura y energías renovables, así como en la maximización del valor de activos inmobiliarios,\n\nEn Lex 42 lidera el área de proyectos prediales e inmobiliarios, acompañando a empresas en procesos de adquisición de terrenos, constitución de servidumbres, saneamiento de títulos y estructuración de contratos asociados a proyectos de gran envergadura.\n\nSu práctica profesional combina la experiencia jurídica con la capacidad de estructurar y coordinar equipos multidisciplinarios (abogados, ingenieros y especialistas en gestión social) para ofrecer soluciones eficientes y estratégicas a nuestros clientes',
        },
        {
          title: 'Enfoque Profesional',
          content: 'Se distingue por su capacidad de liderazgo y negociación, su orientación a resultados y su habilidad para construir relaciones de confianza con comunidades, propietarios y entidades regulatorias. En Lex 42 aporta una visión integral en derecho inmobiliario y predial, clave para el desarrollo de proyectos en sectores estratégicos como infraestructura y energías renovables.'
        },
        {
          title: 'Habilidades',
          items: [
            'Gestión predial integral y due diligence inmobiliario',
            'Negociación y legalización de Parques Solares y Servidumbres',
            'Liderazgo de equipos multidisciplinarios',
            'Cumplimiento normativo en proyectos de infraestructura',
            'Estrategias de mitigación de riesgos y resolución de conflictos'
          ]
        }
      ]
    }
  ]);

  ngOnInit(): void {
    // Scroll to top when component loads (only in browser)
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }

  openMemberModal(member: TeamMemberDetail): void {
    this.selectedMember.set(member);
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal(): void {
    this.selectedMember.set(null);
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'auto';
    }
  }

  openEmail(email: string): void {
    window.location.href = `mailto:${email}`;
  }
}
