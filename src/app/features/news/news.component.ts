import { Component, signal, OnInit, computed, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router, Params } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

export type ContentType = 'todos' | 'boletin' | 'tip-legal' | 'caso-real' | 'novedad-legal';
export type Category = 'todos' | 'laboral' | 'corporativo' | 'comercial' | 'gestion-predial' | 'constitucional' | 'innovacion' | 'propiedad-intelectual' | 'pensional';

export interface NewsArticle {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  contentType: ContentType[];
  category: Category[];
  author: {
    name: string;
    specialty: string;
    photo?: string;
    photoWebP?: string;
    photoFallback?: string;
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
  selectedContentTypes = signal<ContentType[]>([]);
  selectedCategories = signal<Category[]>([]);
  selectedArticleId = signal<number | null>(null);
  isContentTypeDropdownOpen = signal<boolean>(false);
  isCategoryDropdownOpen = signal<boolean>(false);

  readonly articles = signal<NewsArticle[]>([
    {
      id: 1,
      title: 'El "Decretazo" no va más',
      content: `El gobierno nacional dejó sin efectos el polémico Decreto 639 de 2025, con el que buscaba convocar a una consulta popular. La decisión se formalizó a través del Decreto 703 del 25 de junio, luego de que el Consejo de Estado suspendiera provisionalmente su aplicación.

El pronunciamiento judicial partió de una premisa clara: una consulta popular de alcance nacional requiere el visto bueno previo del Senado, tal como lo establecen la Constitución (art. 104) y las leyes 134 de 1994 y 1757 de 2015. Ese paso nunca se surtió.

Aunque el Decreto 639 incluía 12 preguntas para la ciudadanía, su pertinencia quedó en entredicho tras la aprobación de la reforma laboral, una de las apuestas principales del Ejecutivo.

Ahora bien, que el decreto haya sido derogado no cierra el capítulo. El Consejo de Estado seguirá revisando de fondo las demandas que ya cursan contra esa norma.

Todo esto ocurrió el mismo día en que el Gobierno tiene previsto sancionar el proyecto que modifica parcialmente el Código Sustantivo del Trabajo.

Ahora el ejecutivo pretende convocar una asamblea nacional constituyente, lo cual ya ha recibido varias críticas pues Gustavo Petro en campaña aseguró que no lo haría."`,
      excerpt: 'El gobierno nacional dejó sin efectos el polémico Decreto 639 de 2025, con el que buscaba convocar a una consulta popular. La decisión se formalizó a través del Decreto 703 del 25 de junio, luego de que el Consejo de Estado suspendiera provisionalmente su aplicación.',
      contentType: ['boletin'],
      category: ['constitucional'],
      author: {
        name: 'Pablo Andrés Rengifo',
        specialty: 'Derecho Comercial',
        photo: '/assets/images/teams/2.webp',
        photoWebP: '/assets/images/teams/2.webp',
        photoFallback: '/assets/images/teams/2.jpg'
      },
      publishDate: '2025-07-26',
      readingTime: 6,
      tags: ['Derecho', 'Constitucional', 'Estado', 'Decreto']
    },
    {
      id: 2,
      title: 'Cambios en los Contratos de Aprendizaje con la Reforma Laboral',
      content: `"Mucho se habló durante la discusión de la reforma laboral sobre los cambios que afectarían los contratos de aprendizaje. Hoy, con la entrada en vigor de la ley, es claro que sí hubo modificaciones relevantes que las empresas deben tener presentes.

En el caso de los aprendices en etapa práctica o dual, a partir del 1 de julio de 2025 deberán recibir todos los pagos de ley, bajo un contrato especial de aprendizaje a término fijo. Esto implica el reconocimiento de condiciones similares a las de un trabajador con contrato laboral, incluyendo aportes y demás obligaciones legales.

Para los aprendices en etapa lectiva, el empleador deberá otorgar un apoyo de sostenimiento correspondiente al 75 % de un salario mínimo mensual legal vigente. Además, tendrá la obligación de asumir en su totalidad el pago de la afiliación al sistema de salud y a la ARL.

Ahora bien, los contratos de aprendizaje que hayan sido firmados antes del 1 de julio de 2025 continúan rigiéndose por el marco anterior (Ley 789 de 2002). Bajo ese régimen, no se generan obligaciones relacionadas con vacaciones, parafiscales ni aportes al sistema de seguridad social, más allá de los mínimos establecidos.

A partir de este mes, los nuevos contratos deben estar alineados con los cambios introducidos por la reforma. 

Si en su empresa aún no se han ajustado los modelos contractuales o existen dudas sobre cómo implementar estos lineamientos, en Lex 42 Abogados y Asociados estamos listos para asesorarlo."`,
      excerpt: 'Mucho se habló durante la discusión de la reforma laboral sobre los cambios que afectarían los contratos de aprendizaje. Hoy, con la entrada en vigor de la ley, es claro que sí hubo modificaciones relevantes que las empresas deben tener presentes.',
      contentType: ['boletin', 'novedad-legal'],
      category: ['laboral'],
      author: {
        name: 'Juan Sebastián Robayo Aguilar',
        specialty: 'Derecho Laboral',
        photo: '/assets/images/teams/1.webp',
        photoWebP: '/assets/images/teams/1.webp',
        photoFallback: '/assets/images/teams/1.jpg'
      },
      publishDate: '2025-07-10',
      readingTime: 7,
      tags: ['Laboral', 'Reforma', 'Boletín', 'Novedad']
    },
    {
      id: 3,
      title: 'AI Agents: el punto de quiebre en la forma en que trabajamos',
      content: `La inteligencia artificial no solo ha irrumpido en la industria legal, ha irrumpido en todo. Pero lo que estamos viendo hoy con los Agentes de Inteligencia Artificial no es simplemente una evolución más, es un cambio de paradigma.

Hasta hace poco, ChatGPT (y demás LLMs) era un asistente que principalmente respondía preguntas o ayudaba a redactar. Hoy hablamos de agentes autónomos capaces de conectar herramientas, ejecutar tareas complejas y entregar resultados que antes tomaban días o incluso semanas. Todo bajo nuestra supervisión, pero con un nivel de autonomía que, hasta hace unos meses, parecía ciencia ficción.

¿Por qué esto es tan importante? Porque afecta directamente la manera en que producimos valor. Hasta ahora, las herramientas de IA eran apoyo puntual. Con los agentes, la IA puede asumir procesos completos que antes requerían equipos enteros.

Imaginemos un caso real: un cliente solicita revisar 300 contratos para identificar cláusulas de cambio de control. Normalmente, esto significaba asignar un grupo de abogados junior durante varios días. Con un agente configurado y conectado a la base documental, el flujo cambia por completo: analiza los contratos, identifica riesgos, clasifica la información y genera un informe ejecutivo. Incluso puede preparar la presentación que entregarás al cliente. ¿El tiempo? Horas, no semanas.

No todo es color de rosas. Los riesgos que ya se venían presentando con la IA siguen existiendo. Los agentes pueden alucinar (inventar citas, cometer errores o ser incoherentes). Aunque cada vez menos, sigue siendo necesaria la supervisión humana. Por no mencionar los temas de confidencialidad, protección de datos y, sobre todo, responsabilidad profesional: aunque la IA haga el trabajo, la firma sigue firmando.

Entonces, ¿qué significa esto para nosotros, los abogados y consultores? Significa que el rol cambia. Menos trabajo mecánico, más estrategia. Menos tiempo buscando información, más tiempo pensando en cómo generar valor real para el cliente. Esto no elimina al abogado; lo obliga a ser más abogado que nunca: criterio, interpretación y visión.

Los Agents no son solo una función nueva. Son la puerta a una nueva arquitectura de trabajo legal y empresarial. Y la pregunta no es si vamos a usarlos. La pregunta es: ¿cuánto tiempo podemos darnos el lujo de no hacerlo?`,
      excerpt: 'La inteligencia artificial no solo ha irrumpido en la industria legal, ha irrumpido en todo. Pero lo que estamos viendo hoy con los Agentes de Inteligencia Artificial no es simplemente una evolución más, es un cambio de paradigma.',
      contentType: ['novedad-legal'],
      category: ['corporativo', 'innovacion'],
      author: {
        name: 'Pablo Andrés Rengifo',
        specialty: 'Socio Fundador',
        photo: '/assets/images/teams/2.webp',
        photoWebP: '/assets/images/teams/2.webp',
        photoFallback: '/assets/images/teams/2.jpg'
      },
      publishDate: '2025-08-22',
      readingTime: 8,
      tags: ['Opinión', 'Novedad', 'Corporativo', 'Innovación']
    },
    {
      id: 4,
      title: 'Cuando la ciencia corre más rápido que la ley: el caso Cuartetera',
      content: `En diciembre de 2016, el mejor jugador de polo del mundo, Adolfo Cambiaso, hizo algo que cambiaría la historia del deporte y abriría un debate que todavía resuena: ganó la final del Abierto Argentino montando seis caballos clonados.

Sí, clones. Criaturas idénticas a Cuartetera, la yegua que los expertos consideran la mejor que jamás jugó al polo. El logro deportivo fue también un golpe mediático y biotecnológico: probó que la clonación no solo era viable, sino que podía cambiar para siempre las reglas del juego en un deporte donde el caballo es más valioso que el jinete.

Detrás de esta historia épica había algo más: negocios, contratos millonarios y, con el tiempo, una traición que terminó en los tribunales de Estados Unidos. Todo empezó con una alianza entre Cambiaso y Alan Meeker, un empresario texano que apostó por llevar la clonación al mundo ecuestre. Acordaron clonar a Cuartetera y a otros caballos de élite, manteniendo el control sobre esas líneas genéticas como una ventaja competitiva.

Pero el tiempo, y el dinero, hicieron lo suyo. En 2020, en la cubierta de un superyate en las Bahamas, Meeker cerró un acuerdo para vender tres clones de Cuartetera a un magnate ruso por 2,4 millones de dólares. Lo hizo sin avisarle a Cambiaso, rompiendo lo que hasta entonces era una relación de confianza casi familiar. Ese negocio desató una batalla legal que duró más de tres años e involucró reclamos por incumplimiento contractual y hasta debates sobre la propiedad de material genético.

Vender clones no es lo mismo que vender crías. Cuando vendes una cría, conservas a la madre y el control sobre la reproducción; cuando vendes un clon, entregas la llave del ADN original, y con ello pierdes para siempre la exclusividad sobre esa línea genética. Desde el punto de vista económico y estratégico, es un cambio radical: el activo deja de ser único y se vuelve replicable, lo que multiplica riesgos y reduce valor.

Desde lo legal, el desafío es enorme: ¿puede considerarse el ADN un bien susceptible de propiedad? ¿Qué implica la venta de “material genético” en términos contractuales? ¿Cómo evitar que el receptor lo replique indefinidamente? Estos problemas no son menores: estamos hablando de acuerdos que deben prever escenarios que antes parecían imposibles.

Este caso revela algo más profundo que un simple conflicto entre socios: ¿a quién pertenece la vida cuando puede reproducirse en un laboratorio? ¿Qué tan preparados están nuestros marcos legales para regular el trato que debemos darle a un genoma?

En un mundo donde la ciencia avanza más rápido que el derecho, los profesionales del derecho nos enfrentamos a un reto enorme: no basta con reaccionar; debemos anticiparnos a realidades que hace apenas una década parecían ciencia ficción. Hoy es el polo. Mañana serán los alimentos, la medicina regenerativa o incluso la edición genética humana.`,
      excerpt: 'En diciembre de 2016, el mejor jugador de polo del mundo, Adolfo Cambiaso, hizo algo que cambiaría la historia del deporte y abriría un debate que todavía resuena: ganó la final del Abierto Argentino montando seis caballos clonados.',
      contentType: ['novedad-legal'],
      category: ['corporativo', 'propiedad-intelectual'],
      author: {
        name: 'Pablo Andrés Rengifo',
        specialty: 'Socio Fundador',
        photo: '/assets/images/teams/2.webp',
        photoWebP: '/assets/images/teams/2.webp',
        photoFallback: '/assets/images/teams/2.jpg'
      },
      publishDate: '2025-08-15',
      readingTime: 9,
      tags: ['Opinión', 'Novedad', 'Corporativo', 'Propiedad Intelectual']
    },
    {
      id: 5,
      title: 'Reforma Laboral: Cambios que transforman las relaciones laborales en Colombia',
      content: `Con la aprobación final del Proyecto de Ley No. 311 de 2024, Colombia da un giro significativo en materia laboral. Esta reforma, impulsada por el Gobierno Nacional y aprobada por el Congreso, introduce nuevas reglas en la contratación, jornada laboral, plataformas digitales, derechos laborales y formalización. A continuación, te presentamos los principales cambios que trae esta nueva normativa:

I. El contrato indefinido se convierte en la regla general. A partir de ahora, el contrato a término indefinido será la forma preferente de vinculación laboral. Los contratos a término fijo se limitan a un máximo de 4 años y solo podrán usarse cuando exista una causa objetiva que lo justifique. Se eliminan las posibilidades de uso extendido o encadenado de contratos temporales.


II. Jornada laboral máxima: 42 horas semanales. La nueva jornada máxima será de 42 horas por semana, distribuidas entre 5 y 6 días. Se prohíbe expresamente la figura de la jornada 4x3 sin recargo, y se mantiene la gradualidad de implementación según la Ley 2101 de 2021.


III. Plataformas digitales deberán garantizar seguridad social. Las empresas de plataformas digitales deberán afiliar a sus trabajadores a la seguridad social, diferenciando entre relaciones de dependencia y contratos independientes. Además, deberán registrarse formalmente ante el Ministerio del Trabajo y reportar a sus trabajadores activos.


IV. Transformación del contrato de aprendizaje. El contrato de aprendizaje dejará de ser una simple relación formativa y pasará a ser una modalidad laboral especial. Implica afiliación completa al sistema de seguridad social y prestaciones legales. Los costos para las empresas se incrementan sustancialmente.


V. Nuevas licencias y derechos laborales. Se amplían los derechos de los trabajadores, incluyendo licencias remuneradas para citas médicas especializadas, acompañamiento escolar como acudiente, un día semestral por uso de bicicleta y protección especial para víctimas de violencia intrafamiliar.


VI. Horas extras sin autorización previa. Ya no se requerirá autorización previa del Ministerio para que las empresas implementen jornadas con horas extras. Sin embargo, esta entidad podrá ejercer facultades de inspección, vigilancia y control sobre las compañías que excedan los límites legales.


VII. Inclusión y formalización laboral. Se promueven medidas de inclusión laboral para poblaciones tradicionalmente excluidas: madres comunitarias, trabajadoras del hogar y del agro, personas con discapacidad (con cuotas obligatorias por empresa), jóvenes y adultos mayores. Estas políticas deben integrarse a los planes de talento humano de las organizaciones.


¿Qué deben hacer las empresas?


La reforma implica nuevos retos normativos, económicos y operativos. Es indispensable revisar los modelos de contratación, jornadas y costos laborales. Desde Lex 42 Abogados y Asociados recomendamos a las empresas anticiparse con una auditoría laboral interna y ajustar sus políticas conforme al nuevo marco legal.`,
      excerpt: 'Con la aprobación final del Proyecto de Ley No. 311 de 2024, Colombia da un giro significativo en materia laboral. Esta reforma, impulsada por el Gobierno Nacional y aprobada por el Congreso, introduce nuevas reglas en la contratación, jornada laboral, plataformas digitales, y otros aspectos fundamentales del derecho laboral.',
      contentType: ['boletin', 'novedad-legal'],
      category: ['laboral'],
      author: {
        name: 'Juan Sebastián Robayo Aguilar',
        specialty: 'Derecho Laboral',
        photo: '/assets/images/teams/1.webp',
        photoWebP: '/assets/images/teams/1.webp',
        photoFallback: '/assets/images/teams/1.jpg'
      },
      publishDate: '2025-06-27',
      readingTime: 10,
      tags: ['Boletín', 'Novedad', 'Laboral', 'Derecho']
    },
    {
      id: 6,
      title: '¿Qué pasó con la Reforma Pensional?',
      content: `El 12 de junio de 2025, la Sala Plena de la Corte Constitucional profirió el Auto 84 de 2025 dentro del expediente D-15969, en el cual se resolvió la constitucionalidad de la Ley 2288 de 2024. Dicha ley modificaba el sistema pensional colombiano creando el pilar solidario y el fondo integrado de pensiones. Sin embargo, con esta decisión judicial, esta Ley no reformará el sistema pensional colombiano, hasta que el Congreso pueda subsanar varios problemas identificados.


A continuación, presentamos los efectos principales de esta decisión:


I. Devolución de la Ley al Congreso. La Corte Constitucional ordenó la devolución del proyecto a las Comisiones de la Cámara de Representantes para que se repita la parte final del trámite legislativo. Esto debido a que no se procedió a la votación independiente de cada uno de los artículos, como lo exigen los procedimientos reglamentarios en la segunda vuelta de junio de 2024.


II. Votación Obligatoria de Proposición Sustitutiva. La Plenaria de la Cámara deberá repetir la votación de la proposición sustitutiva presentada por Martha del Mar Piñero y otros Representantes. Según la Corte, el Congreso debe garantizar los principios de consecutividad y de identidad flexible, lo cual no se cumplió en el trámite inicial. Importa que el Congreso así lo subsane en esta oportunidad.


III. Suspensión de Términos Judiciales. La Corte determinó que los términos de los procesos que estaban en trámite relacionados con pensiones no se verán interrumpidos por la suspensión de la ley. Esto significa que las decisiones judiciales sobre pensiones se seguirán tomando con base en el régimen actual hasta tanto no se subsane el trámite legislativo.


Nota adicional:


Esta decisión no implica que la reforma pensional haya sido derrotada. Su aprobación sigue siendo viable, pero está condicionada a la corrección de la votación propia del trámite legislativo. En caso de que el Congreso subsane los errores, la ley puede expedirse en su totalidad.


IV. Suspensión de la Entrada en Vigencia. La Corte suspendió la entrada en vigencia de la Ley 2288 de 2024, salvo lo descrito en los artículos 174 y 175.

De esta forma, el artículo 12 sobre las reglas generales de financiación y el artículo 176 sobre la garantía del Gobierno Nacional obligan a mantener los aportes en el régimen de prima media y de ahorro individual, además de garantizar un salario mínimo de vejez a quienes tengan ingresos de 2 salarios mínimos o menos.


V. Seguimiento por parte de la Corte. Una vez se cumpla el nuevo trámite legislativo, las disposiciones de la Ley 2288 de 2024 volverán a entrar en vigor. Si el Congreso no cumple las etapas correspondientes a la Corte, quedará decidir en definitiva sobre la constitucionalidad de la ley.`,
      excerpt: 'El 12 de junio de 2025, la Sala Plena de la Corte Constitucional profirió el Auto 84 de 2025 dentro del expediente D-15969, en el cual se resolvió la constitucionalidad de la Ley 2288 de 2024. Dicha ley modificaba el sistema pensional colombiano creando el pilar solidario y el fondo integrado de pensiones.',
      contentType: ['boletin', 'novedad-legal'],
      category: ['laboral', 'pensional'],
      author: {
        name: 'Pablo Andrés Rengifo',
        specialty: 'Derecho Laboral',
        photo: '/assets/images/teams/2.webp',
        photoWebP: '/assets/images/teams/2.webp',
        photoFallback: '/assets/images/teams/2.jpg'
      },
      publishDate: '2025-08-15',
      readingTime: 9,
      tags: ['Boletín', 'Novedad', 'Laboral', 'Pensional']
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
    const contentTypes = this.selectedContentTypes();
    if (contentTypes.length > 0) {
      result = result.filter(article => 
        article.contentType.some(type => contentTypes.includes(type))
      );
    }
    
    // Filtrar por categoría
    const categories = this.selectedCategories();
    if (categories.length > 0) {
      result = result.filter(article => 
        article.category.some(cat => categories.includes(cat))
      );
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
        (a.category.some(cat => article.category.includes(cat)) || 
         a.contentType.some(type => article.contentType.includes(type)))
      )
      .slice(0, 3);
  });

  readonly contentTypeOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'boletin', label: 'Boletín' },
    { value: 'tip-legal', label: 'Tip legal' },
    { value: 'caso-real', label: 'Caso Real' },
    { value: 'novedad-legal', label: 'Novedad Legal' }
  ];

  readonly categoryOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'laboral', label: 'Laboral' },
    { value: 'corporativo', label: 'Corporativo' },
    { value: 'comercial', label: 'Comercial' },
    { value: 'gestion-predial', label: 'Gestión Predial' },
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
      
      this.route.queryParams.subscribe(params => {
        if (params['search']) {
          this.searchQuery.set(params['search']);
        }
        if (params['tipo']) {
          const tipos = Array.isArray(params['tipo']) ? params['tipo'] : [params['tipo']];
          this.selectedContentTypes.set(tipos as ContentType[]);
        }
        if (params['categoria']) {
          const categorias = Array.isArray(params['categoria']) ? params['categoria'] : [params['categoria']];
          this.selectedCategories.set(categorias as Category[]);
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

  toggleContentTypeDropdown(): void {
    this.isContentTypeDropdownOpen.update(value => !value);
    if (this.isCategoryDropdownOpen()) {
      this.isCategoryDropdownOpen.set(false);
    }
  }

  toggleCategoryDropdown(): void {
    this.isCategoryDropdownOpen.update(value => !value);
    if (this.isContentTypeDropdownOpen()) {
      this.isContentTypeDropdownOpen.set(false);
    }
  }

  toggleContentType(type: ContentType): void {
    const current = this.selectedContentTypes();
    if (type === 'todos') {
      this.selectedContentTypes.set([]);
    } else if (current.includes(type)) {
      this.selectedContentTypes.set(current.filter(t => t !== type));
    } else {
      this.selectedContentTypes.set([...current.filter(t => t !== 'todos'), type]);
    }
    this.updateUrl();
  }

  toggleCategory(category: Category): void {
    const current = this.selectedCategories();
    if (category === 'todos') {
      this.selectedCategories.set([]);
    } else if (current.includes(category)) {
      this.selectedCategories.set(current.filter(c => c !== category));
    } else {
      this.selectedCategories.set([...current.filter(c => c !== 'todos'), category]);
    }
    this.updateUrl();
  }

  isContentTypeSelected(type: ContentType | string): boolean {
    return this.selectedContentTypes().includes(type as ContentType);
  }

  isCategorySelected(category: Category | string): boolean {
    return this.selectedCategories().includes(category as Category);
  }

  toggleContentTypeFromString(type: string): void {
    this.toggleContentType(type as ContentType);
  }

  toggleCategoryFromString(category: string): void {
    this.toggleCategory(category as Category);
  }

  onContentTypeChange(type: ContentType): void {
    this.toggleContentType(type);
  }

  onCategoryChange(category: Category): void {
    this.toggleCategory(category);
  }

  removeContentType(type: ContentType): void {
    const current = this.selectedContentTypes();
    this.selectedContentTypes.set(current.filter(t => t !== type));
    this.updateUrl();
  }

  removeCategory(category: Category): void {
    const current = this.selectedCategories();
    this.selectedCategories.set(current.filter(c => c !== category));
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
    const tipos = this.selectedContentTypes();
    if (tipos.length > 0) {
      queryParams['tipo'] = tipos;
    }
    const categorias = this.selectedCategories();
    if (categorias.length > 0) {
      queryParams['categoria'] = categorias;
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
      'boletin': 'Boletin',
      'tip-legal': 'Tip',
      'caso-real': 'Opinion',
      'novedad-legal': 'Novedad',
    };
    return labels[type] || type;
  }

  getContentTypesLabel(types: ContentType[]): string {
    return types.map(type => this.getContentTypeLabel(type)).join(' - ');
  }

  getCategoryLabel(category: Category): string {
    const labels: Record<Category, string> = {
      'todos': 'Todos',
      'laboral': 'Laboral',
      'corporativo': 'Corporativo',
      'comercial': 'Comercial',
      'gestion-predial': 'Gestion predial',
      'constitucional': 'Constitucional',
      'innovacion': 'Innovacion',
      'propiedad-intelectual': 'Proiedad intelectual',
      'pensional': 'Pensional'
    };
    return labels[category] || category;
  }

  getCategoriesLabel(categories: Category[]): string {
    return categories.map(cat => this.getCategoryLabel(cat)).join(' - ');
  }

  getTagBackgroundColor(type: string): string {
    // Tipos de contenido
    const contentTypeColors: Record<string, string> = {
      'boletin': 'rgba(0, 164, 219, 0.0549)',
      'tip-legal': 'rgba(142, 0, 241, 0.0706)',
      'caso-real': 'rgba(244, 0, 140, 0.0863)',
      'novedad-legal': 'rgba(255, 156, 0, 0.1608)'
    };
    
    // Categorías
    const categoryColors: Record<string, string> = {
      'laboral': 'rgba(0, 143, 245, 0.098)',
      'corporativo': 'rgba(160, 75, 0, 0.0941)',
      'comercial': 'rgba(0, 164, 51, 0.098)',
      'gestion-predial': 'rgba(255, 222, 0, 0.2392)',
      'constitucional': 'rgba(0, 194, 209, 0.1294)',
      'innovacion': 'rgba(68, 0, 238, 0.0588)',
      'propiedad-intelectual': 'rgba(204, 0, 204, 0.0784)',
      'pensional': 'rgba(0, 210, 158, 0.1333)'
    };
    
    return contentTypeColors[type] || categoryColors[type] || 'rgba(0, 164, 219, 0.0549)';
  }

  getTagTextColor(type: string): string {
    // Tipos de contenido
    const contentTypeColors: Record<string, string> = {
      'boletin': 'rgba(0, 188, 210, 1)',
      'tip-legal': 'rgba(82, 0, 154, 0.7294)',
      'caso-real': 'rgba(182, 0, 116, 0.8392)',
      'novedad-legal': 'rgba(204, 78, 0, 0.773)'
    };
    
    // Categorías
    const categoryColors: Record<string, string> = {
      'laboral': 'rgba(0, 109, 203, 0.949)',
      'corporativo': 'rgba(82, 33, 0, 0.7255)',
      'comercial': 'rgba(0, 113, 63, 0.8706)',
      'gestion-predial': 'rgba(171, 100, 0, 1)',
      'constitucional': 'rgba(0, 116, 145, 0.9373)',
      'innovacion': 'rgba(31, 0, 153, 0.6863)',
      'propiedad-intelectual': 'rgba(115, 0, 134, 0.7569)',
      'pensional': 'rgba(0, 119, 99, 0.9922)'
    };
    
    return contentTypeColors[type] || categoryColors[type] || 'rgba(0, 188, 210, 1)';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.filter-group')) {
      this.isContentTypeDropdownOpen.set(false);
      this.isCategoryDropdownOpen.set(false);
    }
  }
}

