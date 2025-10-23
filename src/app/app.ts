import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { HomeComponent } from './features/home/home.component';
import { ServicesComponent } from './features/services/services.component';
import { SectionSeparatorComponent } from './shared/components/section-separator/section-separator.component';
import { TeamComponent } from './features/team/team.component';
import { CtaSectionComponent } from './shared/components/cta-section/cta-section.component';
import { StoriesComponent } from './features/stories/stories.component';
import { LexTipsComponent } from './features/lex-tips/lex-tips.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SeoService } from './shared/services/seo.service';

@Component({
  selector: 'app-root',
  imports: [
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
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.setDefaultMetaTags();
  }
}
