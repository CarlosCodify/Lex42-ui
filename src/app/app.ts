import { Component } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { InicioComponent } from './features/inicio/inicio.component';
import { ServiciosComponent } from './features/servicios/servicios.component';
import { SectionSeparatorComponent } from './shared/components/section-separator/section-separator.component';
import { EquipoComponent } from './features/equipo/equipo.component';
import { CtaSectionComponent } from './shared/components/cta-section/cta-section.component';
import { HistoriasComponent } from './features/historias/historias.component';
import { LexTipsComponent } from './features/lex-tips/lex-tips.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent, 
    InicioComponent, 
    ServiciosComponent, 
    SectionSeparatorComponent, 
    EquipoComponent,
    CtaSectionComponent,
    HistoriasComponent,
    LexTipsComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
