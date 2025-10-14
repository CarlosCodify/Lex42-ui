import { Component } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { InicioComponent } from './features/inicio/inicio.component';
import { ServiciosComponent } from './features/servicios/servicios.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, InicioComponent, ServiciosComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
