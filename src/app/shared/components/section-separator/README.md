# 🎨 Section Separator Component

Componente separador decorativo entre secciones principales con diseño personalizado de Lex 42.

## 📋 Características

- ✅ Fondo con gradiente radial (mismo del inicio)
- ✅ Triángulos animados decorativos (posicionados a la derecha)
- ✅ Líneas decorativas verticales (SVG)
- ✅ Icono de comillas de apertura personalizado
- ✅ Título en dos líneas con colores diferentes
- ✅ Sin ID - no aparece en navegación
- ✅ Solo visible al hacer scroll
- ✅ Responsive

## 🎨 Elementos Visuales

### Icono de Comillas
- Usa el SVG `Quote Icon.svg` de apertura
- Color: `#73BDFF`

### Título
- **Primera línea**: "Los clientes no quieren abogados." (blanco)
- **Segunda línea**: "Quieren soluciones." (color `#73BDFF`)

### Triángulos
- Todos posicionados de mitad hacia la derecha
- Un triángulo azul grande se sale del borde derecho
- Animación suave de flotación

### Líneas Decorativas
- SVG `lines.svg` con gradientes verticales
- Ocupa toda la sección con padding
- Situada entre el fondo y el contenido

## 🔧 Uso Básico

```html
<app-section-separator></app-section-separator>
```

## ⚙️ Personalización

Puedes personalizar el contenido mediante props:

```html
<app-section-separator
  badge="Valor"
  title="Los clientes no quieren abogados. Quieren soluciones."
  subtitle="Hablamos en tu idioma: claro, directo y estratégico."
></app-section-separator>
```

### Props disponibles:

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `badge` | string | "Valor" | Etiqueta superior con comillas |
| `title` | string | "Los clientes no..." | Título principal grande |
| `subtitle` | string | "Hablamos en tu..." | Subtítulo descriptivo |

## 📐 Altura

- Desktop: `min-height: 50vh` (media pantalla)
- Mobile: `min-height: 40vh`

## 🎯 Cuándo usar

Usa este componente entre secciones principales para:
- Crear separación visual
- Agregar contexto o valores
- Mejorar la experiencia de scroll
- Dar respiro visual

## ⚠️ Importante

- **NO tiene ID**: Cuando se hace click en el menú a la siguiente sección, saltará directamente sin pasar por el separador
- **Solo para scroll**: Aparece únicamente al hacer scroll manual
- Los triángulos son decorativos y usan los mismos estilos del hero inicial

## 🔄 Ejemplo de flujo:

1. Usuario hace scroll desde Servicios → Ve el separador → Continúa a Equipo
2. Usuario hace click en "Equipo" → Salta directamente a Equipo (sin ver separador)

