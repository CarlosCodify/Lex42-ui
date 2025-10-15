# CTA Section (Separador Pequeño)

## 📝 Descripción

Componente de Call-to-Action (CTA) que funciona como un separador pequeño entre secciones. Tiene un fondo azul degradado y presenta un título destacado, un subtítulo descriptivo y un botón de acción.

## 🎨 Diseño

- **Fondo**: Degradado azul (`linear-gradient(180deg, #013B72 0%, #0178DF 100%)`)
- **Texto destacado**: Color `#73BDFF` para la palabra "negocio"
- **Botón**: Color `#0178DF` con icono de teléfono
- **Layout**: Centrado, responsive

## 📂 Estructura

```
src/app/shared/components/cta-section/
├── cta-section.component.ts      # Lógica del componente
├── cta-section.component.html    # Template HTML
└── cta-section.component.css     # Estilos
```

## 🔧 Personalización

### Cambiar el título

Edita en `cta-section.component.html`:

```html
<h2 class="cta-title">
  Tu texto aquí <span class="highlight">palabra destacada</span>
</h2>
```

### Cambiar el subtítulo

```html
<p class="cta-subtitle">
  Tu subtítulo aquí
</p>
```

### Cambiar el texto del botón

```html
<button class="btn-cta">
  <svg>...</svg>
  Tu texto aquí
</button>
```

### Cambiar los colores

En `cta-section.component.css`:

- **Fondo**: Modifica `.cta-section { background: ... }`
- **Texto destacado**: Modifica `.cta-title .highlight { color: ... }`
- **Botón**: Modifica `.btn-cta { background: ... }`

## 📱 Responsive

El componente se adapta automáticamente a diferentes tamaños de pantalla usando `clamp()`:

- **Desktop**: Tamaños completos
- **Tablet**: Tamaños medianos
- **Mobile**: Tamaños reducidos, padding ajustado

## 🔗 Uso

Este componente se usa junto con `HistoriasComponent` para ocupar una pantalla completa entre las secciones de Equipo y Lex Tips.

```html
<app-cta-section></app-cta-section>
<app-historias></app-historias>
```

