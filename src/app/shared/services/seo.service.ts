import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private meta: Meta,
    private title: Title
  ) { }

  updateTitle(title: string) {
    this.title.setTitle(title);
  }

  updateMetaTags(config: {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
  }) {
    if (config.title) {
      this.title.setTitle(config.title);
    }

    if (config.description) {
      this.meta.updateTag({ name: 'description', content: config.description });
      this.meta.updateTag({ property: 'og:description', content: config.description });
      this.meta.updateTag({ property: 'twitter:description', content: config.description });
    }

    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    if (config.image) {
      this.meta.updateTag({ property: 'og:image', content: config.image });
      this.meta.updateTag({ property: 'twitter:image', content: config.image });
    }

    if (config.url) {
      this.meta.updateTag({ property: 'og:url', content: config.url });
      this.meta.updateTag({ property: 'twitter:url', content: config.url });
    }

    if (config.type) {
      this.meta.updateTag({ property: 'og:type', content: config.type });
    }
  }

  setDefaultMetaTags() {
    this.updateMetaTags({
      title: 'Lex 42 - Soluciones Legales | Derecho Corporativo y Comercial',
      description: 'Lex 42 - El Derecho a la velocidad del negocio. Soluciones legales especializadas en derecho corporativo, comercial y laboral para empresas en crecimiento.',
      keywords: 'derecho corporativo, derecho comercial, derecho laboral, asesoría legal, abogados corporativos, soluciones legales, Lex 42',
      image: 'https://lex42.co/assets/images/logo.png',
      url: 'https://lex42.co',
      type: 'website'
    });
  }
}

