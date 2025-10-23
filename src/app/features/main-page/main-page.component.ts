import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { HomeComponent } from '../home/home.component';
import { ServicesComponent } from '../services/services.component';
import { SectionSeparatorComponent } from '../../shared/components/section-separator/section-separator.component';
import { TeamComponent } from '../team/team.component';
import { CtaSectionComponent } from '../../shared/components/cta-section/cta-section.component';
import { StoriesComponent } from '../stories/stories.component';
import { LexTipsComponent } from '../lex-tips/lex-tips.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent, 
    HomeComponent, 
    ServicesComponent, 
    SectionSeparatorComponent, 
    TeamComponent,
    CtaSectionComponent,
    StoriesComponent,
    LexTipsComponent,
    FooterComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
}
