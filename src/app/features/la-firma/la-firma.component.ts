import { Component, OnInit, signal, Inject, PLATFORM_ID, AfterViewInit, OnDestroy, HostListener, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { TeamComponent } from '../team/team.component';
import { CtaSectionComponent } from '../../shared/components/cta-section/cta-section.component';
import { StoriesComponent } from '../stories/stories.component';

interface Step {
  id: number;
  title: string;
  description: string;
  svgPath: string;
  isActive: boolean;
}

@Component({
  selector: 'app-la-firma',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, TeamComponent, CtaSectionComponent, StoriesComponent],
  templateUrl: './la-firma.component.html',
  styleUrl: './la-firma.component.css'
})
export class LaFirmaComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('stepperSection', { static: false }) stepperSection?: ElementRef;
  @ViewChild('stepperContainer', { static: false }) stepperContainer?: ElementRef;

  steps = signal<Step[]>([
    {
      id: 1,
      title: 'Lex 42 nació',
      description: 'Con la convicción de que el derecho no tiene por qué ser inaccesible o intimidante',
      svgPath: '/assets/images/signature/motivate-someone.svg',
      isActive: false
    },
    {
      id: 2,
      title: 'Desde nuestros inicios',
      description: 'Nos propusimos construir una firma con enfoque humano capaz de acompañar',
      svgPath: '/assets/images/signature/beta-testing.svg',
      isActive: false
    },
    {
      id: 3,
      title: 'Hemos crecido',
      description: 'Manteniéndonos fieles a nuestros principios: la ética, la innovación y el impacto social.',
      svgPath: '/assets/images/signature/certificate.svg',
      isActive: false
    }
  ]);

  private observer?: IntersectionObserver;
  private stepperObserver?: IntersectionObserver;
  private isScrollLocked = signal<boolean>(false);
  private currentStepIndex = signal<number>(0);
  private scrollTimeout?: ReturnType<typeof setTimeout>;
  private isScrolling = false;
  private scrollPosition = 0;

  private wheelListener?: () => void;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    // Inicializar el primer paso como activo
    if (isPlatformBrowser(this.platformId)) {
      this.steps.update(steps => {
        const updated = [...steps];
        updated[0] = { ...updated[0], isActive: true };
        return updated;
      });
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
      this.setupStepperObserver();
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.stepperObserver) {
      this.stepperObserver.disconnect();
    }
    this.unlockScroll();
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }

  private onWheel(event: WheelEvent): void {
    const allStepsActive = this.getActiveStepsCount() === this.steps().length;
    if (this.isScrollLocked() && !allStepsActive && isPlatformBrowser(this.platformId)) {
      event.preventDefault();
      event.stopPropagation();
      
      if (this.isScrolling) {
        return;
      }

      const delta = event.deltaY;
      const currentIndex = this.currentStepIndex();
      const totalSteps = this.steps().length;

      if (delta > 0 && currentIndex < totalSteps - 1) {
        this.isScrolling = true;
        this.advanceToStep(currentIndex + 1);
      } else if (delta < 0 && currentIndex > 0) {
        this.isScrolling = true;
        this.advanceToStep(currentIndex - 1);
      }

      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }
      this.scrollTimeout = setTimeout(() => {
        this.isScrolling = false;
      }, 1000);
    }
  }


  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.isScrollLocked() && isPlatformBrowser(this.platformId)) {
      const currentIndex = this.currentStepIndex();
      
      if (event.key === 'ArrowDown' && currentIndex < this.steps().length - 1) {
        event.preventDefault();
        this.advanceToStep(currentIndex + 1);
      } else if (event.key === 'ArrowUp' && currentIndex > 0) {
        event.preventDefault();
        this.advanceToStep(currentIndex - 1);
      }
    }
  }

  private setupStepperObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 1]
    };

    this.stepperObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const allStepsActive = this.getActiveStepsCount() === this.steps().length;
        
        if (allStepsActive) {
          if (this.isScrollLocked()) {
            this.unlockScroll();
          }
          return;
        }
        
        if (entry.isIntersecting && entry.intersectionRatio >= 0.95) {
          if (!this.isScrollLocked() && !allStepsActive) {
            this.lockScroll();
          }
        } else if (entry.intersectionRatio < 0.9) {
          if (allStepsActive && this.isScrollLocked()) {
            this.unlockScroll();
          }
        }
      });
    }, options);

    setTimeout(() => {
      if (this.stepperContainer?.nativeElement) {
        this.stepperObserver?.observe(this.stepperContainer.nativeElement);
      }
    }, 200);
  }

  private lockScroll(): void {
    if (!this.isScrollLocked() && isPlatformBrowser(this.platformId)) {
      this.scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      
      this.isScrollLocked.set(true);
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${this.scrollPosition}px`;
      document.body.style.width = '100%';
      
      if (isPlatformBrowser(this.platformId)) {
        const wheelHandler = (event: WheelEvent) => {
          this.onWheel(event);
        };
        window.addEventListener('wheel', wheelHandler, { passive: false });
        this.wheelListener = () => {
          window.removeEventListener('wheel', wheelHandler);
        };
      }
      
      // Inicializar en el primer paso si no hay ninguno activo
      if (this.currentStepIndex() === 0 && !this.steps()[0].isActive) {
        this.advanceToStep(0);
      }
    }
  }

  private unlockScroll(): void {
    // Solo desbloquear cuando todos los pasos están activos (último checkmark pintado)
    const allStepsActive = this.getActiveStepsCount() === this.steps().length;
    if (this.isScrollLocked() && allStepsActive && isPlatformBrowser(this.platformId)) {
      const scrollPos = this.scrollPosition;
      
      // Remover listener personalizado primero
      if (this.wheelListener) {
        this.wheelListener();
        this.wheelListener = undefined;
      }
      
      // Cambiar el estado antes de restaurar estilos
      this.isScrollLocked.set(false);
      
      // Restaurar estilos
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // Restaurar la posición del scroll con un delay para asegurar que los estilos se aplicaron
      // Usar requestAnimationFrame para asegurar que el DOM esté listo
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo({ top: scrollPos, behavior: 'auto' });
          // Forzar un reflow para asegurar que el scroll se restablezca correctamente
          document.body.offsetHeight;
        });
      });
    }
  }

  private advanceToStep(stepIndex: number): void {
    if (stepIndex < 0 || stepIndex >= this.steps().length) {
      return;
    }

    this.currentStepIndex.set(stepIndex);
    this.activateStep(stepIndex + 1);
    // No hacer scrollIntoView cuando el scroll está bloqueado, ya que bloqueamos el scroll
  }

  private setupIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const stepId = parseInt(entry.target.getAttribute('data-step-id') || '0');
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          this.activateStep(stepId);
        }
      });
    }, options);

    // Observar cada paso después de un pequeño delay para asegurar que el DOM esté listo
    setTimeout(() => {
      this.steps().forEach((step) => {
        const element = document.querySelector(`[data-step-id="${step.id}"]`);
        if (element) {
          this.observer?.observe(element);
        }
      });
    }, 200);
  }

  private activateStep(stepId: number): void {
    this.steps.update(steps => {
      const updated = steps.map(step => {
        if (step.id <= stepId) {
          return { ...step, isActive: true };
        }
        return step;
      });
      return updated;
    });

    // Verificar si todos los pasos están activos para desbloquear el scroll
    if (this.getActiveStepsCount() === this.steps().length) {
      setTimeout(() => {
        this.unlockScroll();
      }, 500); // Pequeño delay para asegurar que la animación se complete
    }
  }

  getActiveStepsCount(): number {
    return this.steps().filter(step => step.isActive).length;
  }

  getProgressPercentage(): number {
    const activeCount = this.getActiveStepsCount();
    const total = this.steps().length;
    if (activeCount === 0) return 0;
    // Dividir la barra en segmentos iguales
    return (activeCount / total) * 100;
  }
}

