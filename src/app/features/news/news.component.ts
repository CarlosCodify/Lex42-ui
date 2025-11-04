import { Component, signal, OnInit, computed, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router, Params } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

export type ContentType = 'todos' | 'tip-legal' | 'boletin' | 'caso-real' | 'novedad-legal';
export type Category = 'todos' | 'corporativo' | 'comercial' | 'gestion-predial' | 'laboral' | 'constitucional' | 'innovacion' | 'propiedad-intelectual' | 'pensional';

export interface NewsArticle {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  contentType: ContentType;
  category: Category;
  author: {
    name: string;
    specialty: string;
    photo?: string;
  };
  publishDate: string;
  readingTime: number;
  tags: string[];
  relatedArticles?: number[];
}

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {
  searchQuery = signal<string>('');
  selectedContentType = signal<ContentType>('todos');
  selectedCategory = signal<Category>('todos');
  selectedArticleId = signal<number | null>(null);

  readonly articles = signal<NewsArticle[]>([
    {
      id: 1,
      title: 'El "Decretazo" no va más',
      content: `El gobierno nacional dejó sin efectos el polémico Decreto 639 de 2025, con el que buscaba convocar a una consulta popular. La decisión se formalizó a través del Decreto 703 del 25 de junio, luego de que el Consejo de Estado suspendiera provisionalmente su aplicación.

Esta medida se produjo después de que el Consejo de Estado cuestionara la viabilidad del decreto, señalando que requería la aprobación del Senado para poder convocar una consulta popular a nivel nacional. Además, se cuestionó la relevancia del decreto después de la aprobación de la reforma laboral.

Sin embargo, la derogación del decreto no cierra el capítulo. Todavía hay demandas pendientes contra el decreto original, y el gobierno planea sancionar un proyecto que modifica el Código Sustantivo del Trabajo. Asimismo, el ejecutivo ha expresado su intención de convocar una asamblea constituyente nacional, a pesar de las garantías previas del presidente Gustavo Petro de no hacerlo.`,
      excerpt: 'El gobierno nacional dejó sin efectos el polémico Decreto 639 de 2025, con el que buscaba convocar a una consulta popular. La decisión se formalizó a través del Decreto 703 del 25 de junio, luego de que el Consejo de Estado suspendiera provisionalmente su aplicación.',
      contentType: 'boletin',
      category: 'constitucional',
      author: {
        name: 'Pablo Andrés Rengifo',
        specialty: 'Derecho Comercial',
        photo: '/assets/images/teams/2.jpg'
      },
      publishDate: '2025-07-26',
      readingTime: 6,
      tags: ['Derecho', 'Constitucional', 'Estado', 'Decreto']
    },
    {
      id: 2,
      title: 'Cambios en los Contratos de Aprendizaje con la Reforma Laboral',
      content: 'Mucho se habló durante la discusión de la reforma laboral sobre los cambios que afectarían los contratos de aprendizaje. Hoy, con la entrada en vigor de la ley, es claro que sí hubo modificaciones relevantes que las empresas deben tener presentes.',
      excerpt: 'Mucho se habló durante la discusión de la reforma laboral sobre los cambios que afectarían los contratos de aprendizaje. Hoy, con la entrada en vigor de la ley, es claro que sí hubo modificaciones relevantes que las empresas deben tener presentes.',
      contentType: 'boletin',
      category: 'laboral',
      author: {
        name: 'Juan Sebastián Robayo Aguilar',
        specialty: 'Derecho Laboral',
        photo: '/assets/images/teams/1.jpg'
      },
      publishDate: '2025-07-10',
      readingTime: 7,
      tags: ['Laboral', 'Reforma']
    },
    {
      id: 3,
      title: 'AI Agents: el punto de quiebre en la forma en que trabajamos',
      content: 'La inteligencia artificial no solo ha irrumpido en la industria legal, ha irrumpido en todo. Pero lo que estamos viendo hoy con los Agentes de Inteligencia Artificial no es simplemente una evolución más, es un cambio de paradigma.',
      excerpt: 'La inteligencia artificial no solo ha irrumpido en la industria legal, ha irrumpido en todo. Pero lo que estamos viendo hoy con los Agentes de Inteligencia Artificial no es simplemente una evolución más, es un cambio de paradigma.',
      contentType: 'novedad-legal',
      category: 'corporativo',
      author: {
        name: 'Pablo Andrés Rengifo',
        specialty: 'Derecho Comercial',
        photo: '/assets/images/teams/2.jpg'
      },
      publishDate: '2025-08-22',
      readingTime: 6,
      tags: ['Innovación', 'Tecnología']
    },
    {
      id: 4,
      title: 'Cuando la ciencia corre más rápido que la ley: el caso Cuartetera',
      content: 'En diciembre de 2016, el mejor jugador de polo del mundo, Adolfo Cambiaso, hizo algo que cambiaría la historia del deporte y abriría un debate que todavía resuena: ganó la final del Abierto Argentino montando seis caballos clonados.',
      excerpt: 'En diciembre de 2016, el mejor jugador de polo del mundo, Adolfo Cambiaso, hizo algo que cambiaría la historia del deporte y abriría un debate que todavía resuena: ganó la final del Abierto Argentino montando seis caballos clonados.',
      contentType: 'novedad-legal',
      category: 'propiedad-intelectual',
      author: {
        name: 'Pablo Andrés Rengifo',
        specialty: 'Derecho Comercial',
        photo: '/assets/images/teams/2.jpg'
      },
      publishDate: '2025-08-15',
      readingTime: 9,
      tags: ['Propiedad Intelectual', 'Innovación']
    },
    {
      id: 5,
      title: 'Reforma Laboral: Cambios que transforman las relaciones laborales en Colombia',
      content: 'Con la aprobación final del Proyecto de Ley No. 311 de 2024, Colombia da un giro significativo en materia laboral. Esta reforma, impulsada por el Gobierno Nacional y aprobada por el Congreso, introduce nuevas reglas en la contratación, jornada laboral, plataformas digitales, y otros aspectos fundamentales del derecho laboral.',
      excerpt: 'Con la aprobación final del Proyecto de Ley No. 311 de 2024, Colombia da un giro significativo en materia laboral. Esta reforma, impulsada por el Gobierno Nacional y aprobada por el Congreso, introduce nuevas reglas en la contratación, jornada laboral, plataformas digitales, y otros aspectos fundamentales del derecho laboral.',
      contentType: 'boletin',
      category: 'laboral',
      author: {
        name: 'Juan Sebastián Robayo Aguilar',
        specialty: 'Derecho Laboral',
        photo: '/assets/images/teams/1.jpg'
      },
      publishDate: '2025-06-27',
      readingTime: 10,
      tags: ['Laboral', 'Reforma']
    },
    {
      id: 6,
      title: '¿Qué pasó con la Reforma Pensional?',
      content: 'El 12 de junio de 2025, la Sala Plena de la Corte Constitucional profirió el Auto 84 de 2025 dentro del expediente D-15969, en el cual se resolvió la constitucionalidad de la Ley 2288 de 2024. Dicha ley modificaba el sistema pensional colombiano creando el pilar solidario y el fondo integrado de pensiones.',
      excerpt: 'El 12 de junio de 2025, la Sala Plena de la Corte Constitucional profirió el Auto 84 de 2025 dentro del expediente D-15969, en el cual se resolvió la constitucionalidad de la Ley 2288 de 2024. Dicha ley modificaba el sistema pensional colombiano creando el pilar solidario y el fondo integrado de pensiones.',
      contentType: 'boletin',
      category: 'pensional',
      author: {
        name: 'Pablo Andrés Rengifo',
        specialty: 'Derecho Comercial',
        photo: '/assets/images/teams/2.jpg'
      },
      publishDate: '2025-08-15',
      readingTime: 9,
      tags: ['Pensional', 'Reforma']
    }
  ]);

  readonly filteredArticles = computed(() => {
    let result = this.articles();
    
    // Filtrar por búsqueda
    const query = this.searchQuery().toLowerCase().trim();
    if (query) {
      result = result.filter(article => 
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query) ||
        article.author.name.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Filtrar por tipo de contenido
    if (this.selectedContentType() !== 'todos') {
      result = result.filter(article => article.contentType === this.selectedContentType());
    }
    
    // Filtrar por categoría
    if (this.selectedCategory() !== 'todos') {
      result = result.filter(article => article.category === this.selectedCategory());
    }
    
    return result;
  });

  readonly selectedArticle = computed(() => {
    const id = this.selectedArticleId();
    if (!id) return null;
    return this.articles().find(a => a.id === id) || null;
  });

  readonly relatedArticles = computed(() => {
    const article = this.selectedArticle();
    if (!article) return [];
    
    return this.articles()
      .filter(a => 
        a.id !== article.id && 
        (a.category === article.category || a.contentType === article.contentType)
      )
      .slice(0, 3);
  });

  readonly contentTypeOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'tip-legal', label: 'Tip legal' },
    { value: 'boletin', label: 'Boletín' },
    { value: 'caso-real', label: 'Caso real' },
    { value: 'novedad-legal', label: 'Novedad legal' }
  ];

  readonly categoryOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'corporativo', label: 'Corporativo' },
    { value: 'comercial', label: 'Comercial' },
    { value: 'gestion-predial', label: 'Gestión Predial' },
    { value: 'laboral', label: 'Laboral' },
    { value: 'constitucional', label: 'Constitucional' },
    { value: 'innovacion', label: 'Innovación' },
    { value: 'propiedad-intelectual', label: 'Propiedad Intelectual' },
    { value: 'pensional', label: 'Pensional' }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
      
      // Leer parámetros de la URL
      this.route.queryParams.subscribe(params => {
        if (params['search']) {
          this.searchQuery.set(params['search']);
        }
        if (params['tipo']) {
          this.selectedContentType.set(params['tipo'] as ContentType);
        }
        if (params['categoria']) {
          this.selectedCategory.set(params['categoria'] as Category);
        }
        if (params['id']) {
          this.selectedArticleId.set(+params['id']);
        }
      });
    }
  }

  onSearchChange(query: string): void {
    this.searchQuery.set(query);
    this.updateUrl();
  }

  onContentTypeChange(type: ContentType): void {
    this.selectedContentType.set(type);
    this.updateUrl();
  }

  onCategoryChange(category: Category): void {
    this.selectedCategory.set(category);
    this.updateUrl();
  }

  onArticleClick(articleId: number): void {
    this.selectedArticleId.set(articleId);
    this.updateUrl();
  }

  goBack(): void {
    this.selectedArticleId.set(null);
    this.updateUrl();
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }

  private updateUrl(): void {
    const queryParams: Params = {};
    
    if (this.searchQuery()) {
      queryParams['search'] = this.searchQuery();
    }
    if (this.selectedContentType() !== 'todos') {
      queryParams['tipo'] = this.selectedContentType();
    }
    if (this.selectedCategory() !== 'todos') {
      queryParams['categoria'] = this.selectedCategory();
    }
    if (this.selectedArticleId()) {
      queryParams['id'] = this.selectedArticleId();
    }
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      replaceUrl: true
    });
  }

  getContentTypeLabel(type: ContentType): string {
    const labels: Record<ContentType, string> = {
      'todos': 'Todos',
      'tip-legal': 'Tip',
      'boletin': 'Boletín',
      'caso-real': 'Caso real',
      'novedad-legal': 'Opinión'
    };
    return labels[type] || type;
  }

  getCategoryLabel(category: Category): string {
    return this.categoryOptions.find(opt => opt.value === category)?.label || category;
  }

  getTagBackgroundColor(type: string): string {
    const colors: Record<string, string> = {
      'boletin': 'rgba(0, 164, 219, 0.0549)',
      'tip-legal': 'rgba(142, 0, 241, 0.0706)',
      'opinion': 'rgba(244, 0, 140, 0.0863)',
      'novedad': 'rgba(255, 156, 0, 0.1608)',
      'novedad-legal': 'rgba(255, 156, 0, 0.1608)',
      'laboral': 'rgba(0, 143, 245, 0.098)',
      'corporativo': 'rgba(160, 75, 0, 0.0941)',
      'comercial': 'rgba(0, 164, 51, 0.098)',
      'gestion-predial': 'rgba(255, 222, 0, 0.2392)',
      'constitucional': 'rgba(0, 194, 209, 0.1294)',
      'innovacion': 'rgba(68, 0, 238, 0.0588)',
      'propiedad-intelectual': 'rgba(204, 0, 204, 0.0784)',
      'pensional': 'rgba(0, 210, 158, 0.1333)',
      'todos': 'rgba(0, 164, 219, 0.0549)',
      'caso-real': 'rgba(255, 156, 0, 0.1608)'
    };
    return colors[type] || 'rgba(0, 164, 219, 0.0549)';
  }

  getTagTextColor(type: string): string {
    const colors: Record<string, string> = {
      'boletin': 'rgba(0, 188, 210, 1)',
      'tip-legal': 'rgba(82, 0, 154, 0.7294)',
      'opinion': 'rgba(139, 87, 0, 0.7294)',
      'novedad': 'rgba(204, 78, 0, 0.773)',
      'novedad-legal': 'rgba(204, 78, 0, 0.773)',
      'laboral': 'rgba(0, 109, 203, 0.949)',
      'corporativo': 'rgba(82, 33, 0, 0.7255)',
      'comercial': 'rgba(0, 113, 63, 0.8706)',
      'gestion-predial': 'rgba(171, 100, 0, 1)',
      'constitucional': 'rgba(0, 116, 145, 0.9373)',
      'innovacion': 'rgba(31, 0, 153, 0.6863)',
      'propiedad-intelectual': 'rgba(115, 0, 134, 0.7569)',
      'pensional': 'rgba(0, 119, 99, 0.9922)',
      'todos': 'rgba(0, 188, 210, 1)',
      'caso-real': 'rgba(204, 78, 0, 0.773)'
    };
    return colors[type] || 'rgba(0, 188, 210, 1)';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  }
}

