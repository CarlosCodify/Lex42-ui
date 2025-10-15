# Historias Reales (Testimonios de Clientes)

## 📝 Descripción

Componente que muestra testimonios reales de clientes con sus logos empresariales. Presenta tres historias de éxito de empresas que han trabajado con Lex 42.

## 🎨 Diseño

- **Fondo**: Blanco (`#FFFFFF`)
- **Título**: Color azul oscuro (`#013B72`) con palabra destacada en naranja (`#FF8C00`)
- **Cards**: Bordes sutiles con efecto hover (transformación y sombra)
- **Logos**: Fondo azul marino (`#002B54`) con padding

## 📂 Estructura

```
src/app/features/historias/
├── historias.component.ts      # Lógica y datos del componente
├── historias.component.html    # Template HTML
└── historias.component.css     # Estilos
```

## 🔧 Personalización

### Agregar/Modificar Testimonios

Edita el array `historias` en `historias.component.ts`:

```typescript
protected readonly historias = signal<Historia[]>([
  {
    quote: 'El testimonio aquí...',
    author: 'Nombre del Cliente',
    position: 'Cargo del Cliente',
    company: 'Empresa (opcional)',
    logo: '/assets/images/clients/logo.png'
  },
  // ... más testimonios
]);
```

### Cambiar el título

Edita en `historias.component.html`:

```html
<h2 class="historias-title">
  Tu título aquí, <span class="highlight">palabra destacada</span> resto del título
</h2>
```

### Cambiar el subtítulo

```html
<p class="historias-subtitle">
  Tu subtítulo descriptivo aquí
</p>
```

## 📸 Logos de Clientes

Los logos se toman de `public/assets/images/clients/`:

- `ingeal.png` - Ingeniería en Galvanizados de Occidente
- `quimisa.png` - Químicos Industriales Asociados
- `servinformacion.png` - Servi Información

### Agregar un nuevo logo

1. Coloca la imagen en `public/assets/images/clients/`
2. Referencia en el testimonio: `/assets/images/clients/tu-logo.png`

**Recomendación**: Los logos deben ser claros en fondo oscuro (se muestran sobre fondo `#002B54`).

## 🎭 Efectos Interactivos

### Hover en las Cards

Cada tarjeta tiene un efecto hover que:
- Cambia el borde a azul (`#0178DF`)
- Agrega una sombra sutil
- Se eleva ligeramente (`transform: translateY(-4px)`)

## 📱 Responsive

### Desktop (>1024px)
- Grid de 3 columnas (auto-fit)
- Cards lado a lado

### Tablet/Mobile (≤1024px)
- Una columna
- Cards centradas con ancho máximo de 600px

## 🔗 Uso

Este componente se usa junto con `CtaSectionComponent` para ocupar una pantalla:

```html
<app-cta-section></app-cta-section>
<app-historias></app-historias>
```

## 💡 Notas

- El campo `company` es opcional. Si está vacío, no se muestra.
- Las comillas decorativas son SVG (gris claro `#E0E0E0`)
- Los nombres de autores se muestran en naranja para destacarlos

