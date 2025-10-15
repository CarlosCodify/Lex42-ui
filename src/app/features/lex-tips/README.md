# Lex Tips (Consejos Legales FAQ)

## 📝 Descripción

Componente de sección completa que presenta consejos legales en formato de acordeones (FAQ) con una ilustración decorativa. Incluye un botón para explorar más tips.

## 🎨 Diseño

- **Fondo**: Degradado beige (`linear-gradient(180deg, #F5F1E8 0%, #E8DCC8 100%)`)
- **Texto de fondo**: "PROTECCIÓN" en grande y translúcido
- **Título**: "Lex Tips" en naranja (`#FF8C00`), resto en azul (`#013B72`)
- **Acordeones**: Cards blancas con bordes que cambian a azul al estar activas
- **Ilustración**: SVG a la derecha (desktop) o arriba (mobile)

## 📂 Estructura

```
src/app/features/lex-tips/
├── lex-tips.component.ts      # Lógica del componente con estado de acordeones
├── lex-tips.component.html    # Template HTML
└── lex-tips.component.css     # Estilos
```

## 🔧 Personalización

### Agregar/Modificar Preguntas FAQ

Edita el array `faqs` en `lex-tips.component.ts`:

```typescript
protected readonly faqs = signal<FaqItem[]>([
  {
    question: '¿Tu pregunta aquí?',
    answer: 'Tu respuesta detallada aquí.',
    isOpen: false  // true para que inicie abierto
  },
  // ... más preguntas
]);
```

### Cambiar el título

Edita en `lex-tips.component.html`:

```html
<h2 class="lex-tips-title">
  <span class="title-highlight">Parte destacada</span> resto del título
</h2>
```

### Cambiar el texto de fondo

```html
<div class="background-text">TU TEXTO</div>
```

### Cambiar la ilustración

Reemplaza el archivo `/assets/images/lex_tips/faq.svg` o cambia la ruta:

```html
<img src="/assets/images/lex_tips/tu-ilustracion.svg" alt="..." class="illustration-img">
```

## ⚙️ Funcionalidad

### Acordeones (FAQ)

Los acordeones se expanden/colapsan al hacer clic. La lógica está en `toggleFaq()`:

```typescript
toggleFaq(index: number): void {
  this.faqs.update(items => 
    items.map((item, i) => ({
      ...item,
      isOpen: i === index ? !item.isOpen : item.isOpen
    }))
  );
}
```

### Comportamiento:
- Solo una pregunta abierta a la vez
- Al hacer clic en una pregunta, se abre/cierra
- Icono de flecha rota 180° cuando está abierto
- Transición suave de `max-height`

## 🎨 Estilos de Estados

### Acordeón Cerrado
- Borde gris (`#E0E0E0`)
- Contenido oculto (`max-height: 0`)

### Acordeón Abierto
- Borde azul (`#0178DF`)
- Sombra sutil
- Contenido visible (`max-height: 500px`)
- Icono rotado 180°

## 📱 Responsive

### Desktop (>1024px)
- Grid de 2 columnas: FAQ a la izquierda, ilustración a la derecha
- Texto de fondo en tamaño grande

### Tablet/Mobile (≤1024px)
- Una columna
- Ilustración arriba, FAQ abajo
- Texto de fondo reducido
- Altura mínima ajustable (`min-height: auto`)

## 🔗 Integración del Botón

El botón "Explorar más tips" está diseñado para navegar a una sección de Noticias/Recursos (pendiente de implementar):

```html
<button class="btn-explore">
  Explorar más tips
  <svg>...</svg> <!-- Icono de flecha -->
</button>
```

### Para implementar la navegación más tarde:

```typescript
// En el componente
onExploreTips(): void {
  // Navegar a sección de noticias
  // O hacer scroll suave a otra sección
}
```

## 🎭 Efectos Interactivos

### Hover en Preguntas
- Texto cambia a color azul (`#0178DF`)

### Hover en Botón
- Color más claro
- Se desplaza a la derecha (`translateX(4px)`)
- Sombra agregada

## 💡 Notas Técnicas

- Usa `signal()` de Angular para estado reactivo
- CommonModule importado para directivas de Angular
- Transiciones CSS para animaciones suaves
- `overflow: hidden` en la sección para que el texto de fondo no se salga

## 🖼️ Assets Requeridos

- `/assets/images/lex_tips/faq.svg` - Ilustración principal
- SVG de flecha integrado en el template

