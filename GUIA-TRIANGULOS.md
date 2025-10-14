# 🎨 Guía para Modificar Triángulos Decorativos

## ⚠️ NOTA IMPORTANTE sobre Gradientes

**Los triángulos CSS con `border` NO soportan gradientes nativamente.**

Los colores que ves en Figma son:
- Azul: `linear-gradient(180deg, #6AB9FF 13.24%, #406F99 45.63%)`
- Naranja: `linear-gradient(180deg, #AB6400 30.17%, #452800 100%)`

Para obtener un efecto similar, usamos colores sólidos aproximados con transparencia.

Si necesitas gradientes reales en los triángulos, tendrías que usar:
- SVG en lugar de CSS
- Clip-path con pseudo-elementos
- Canvas

---

## 📐 Cómo cambiar el TAMAÑO de los triángulos

Los triángulos se controlan con la propiedad `border-width`. 

### Formato:
```css
border-width: 0 [ancho-izquierda] [altura] [ancho-derecha];
```

### Ejemplos en el código:

```css
/* Triángulo azul grande */
.triangle-blue {
  border-width: 0 100px 173px 100px;
  /* 100px = ancho de cada lado */
  /* 173px = altura del triángulo */
}
```

### Para AGRANDAR un triángulo:
Aumenta los valores proporcionalmente:
```css
border-width: 0 150px 260px 150px; /* 50% más grande */
```

### Para ACHICAR un triángulo:
Reduce los valores:
```css
border-width: 0 50px 87px 50px; /* 50% más pequeño */
```

---

## 📍 Cómo cambiar la POSICIÓN de los triángulos

Usa `top`, `bottom`, `left`, `right` con valores en porcentaje (%) o pixeles (px).

### Ejemplos:

```css
.triangle-1 {
  top: 25%;     /* 25% desde arriba */
  left: 8%;     /* 8% desde la izquierda */
}

.triangle-3 {
  top: 20%;     /* 20% desde arriba */
  right: 25%;   /* 25% desde la DERECHA */
}
```

### Guía de posicionamiento:

- **top**: Distancia desde arriba (0% = pegado arriba, 100% = abajo)
- **bottom**: Distancia desde abajo
- **left**: Distancia desde la izquierda
- **right**: Distancia desde la derecha

### Ejemplos prácticos:

**Mover al centro:**
```css
.triangle-1 {
  top: 50%;
  left: 50%;
}
```

**Mover a la esquina superior derecha:**
```css
.triangle-1 {
  top: 10%;
  right: 10%;
}
```

**Mover a la esquina inferior izquierda:**
```css
.triangle-1 {
  bottom: 10%;
  left: 10%;
}
```

---

## 🎨 Cómo cambiar el COLOR de los triángulos

Los colores están en formato RGBA (con transparencia):

```css
.triangle-blue {
  border-color: transparent transparent rgba(74, 159, 231, 0.4) transparent;
  /* rgba(74, 159, 231, 0.4) */
  /*      ^^^ Color azul ^^^ ^^^ Opacidad (0.4 = 40%) */
}
```

### Para cambiar el color:
1. Cambia los valores RGB (primeros 3 números)
2. Ajusta la opacidad (último número: 0.0 = transparente, 1.0 = opaco)

**Ejemplo - Azul más intenso:**
```css
rgba(74, 159, 231, 0.8)  /* 80% opacidad */
```

---

## ⏱️ Cómo cambiar la VELOCIDAD de animación

La animación se controla con `animation`:

```css
.triangle {
  animation: float 8s ease-in-out infinite;
  /*              ^^^ Duración en segundos */
}
```

- **8s** = 8 segundos por ciclo completo
- **4s** = Más rápido
- **12s** = Más lento

### Delay de animación:
Cada triángulo tiene un delay diferente para que no se muevan todos al mismo tiempo:

```css
.triangle-1 {
  animation-delay: 0s;    /* Empieza inmediatamente */
}

.triangle-2 {
  animation-delay: 1s;    /* Empieza 1 segundo después */
}
```

---

## 🔧 Ejemplo completo de modificación

Si quieres agregar un triángulo NUEVO:

1. **En el HTML** (`inicio.component.html`):
```html
<div class="triangle triangle-blue triangle-7"></div>
```

2. **En el CSS** (`inicio.component.css`):
```css
.triangle-7 {
  top: 60%;
  right: 40%;
  animation-delay: 3s;
}
```

---

## 📝 Resumen rápido

| Quiero cambiar... | Propiedad CSS | Ejemplo |
|------------------|---------------|---------|
| Tamaño | `border-width` | `0 100px 173px 100px` |
| Posición horizontal | `left` o `right` | `left: 25%` |
| Posición vertical | `top` o `bottom` | `top: 30%` |
| Color | `border-color: rgba(...)` | `rgba(74, 159, 231, 0.4)` |
| Velocidad | `animation: float Xs` | `animation: float 8s` |
| Delay | `animation-delay` | `animation-delay: 1s` |

---

## ✅ Tips:

1. **Trabaja con porcentajes (%)** para que sea responsive
2. **Mantén proporciones** al cambiar tamaños (si doblas uno, dobla todos los valores)
3. **Prueba con delay diferentes** para efectos más dinámicos
4. **Usa opacidad baja (0.3-0.5)** para que no distraigan del contenido

¡Experimenta y diviértete! 🎨

