# 📍 Guía para Mover Testimonios Manualmente

## 🎯 Posiciones de los Testimonios

Los testimonios usan **posicionamiento absoluto** dentro de `.testimonials-section`.

Archivo: `src/app/features/inicio/inicio.component.css`

---

## 📝 Cómo mover cada testimonio

### **Testimonio IZQUIERDA (Yolver Gutierrez)**

Busca esta clase en el CSS:

```css
.testimonial-left {
  bottom: 0;     /* Distancia desde ABAJO */
  left: 5%;      /* Distancia desde IZQUIERDA */
}
```

**Ejemplos de ajustes:**

**Moverlo más arriba:**
```css
.testimonial-left {
  bottom: 30px;  /* 30px desde abajo */
  left: 5%;
}
```

**Moverlo más a la derecha:**
```css
.testimonial-left {
  bottom: 0;
  left: 10%;     /* Cambia de 5% a 10% */
}
```

**Moverlo a la esquina:**
```css
.testimonial-left {
  bottom: 10px;
  left: 10px;
}
```

---

### **Testimonio CENTRO (Lex 42)**

```css
.testimonial-center {
  top: 0;          /* Distancia desde ARRIBA */
  left: 50%;       /* Centrado horizontalmente */
  transform: translateX(-50%);  /* NO TOCAR - mantiene centrado */
}
```

**Ejemplos de ajustes:**

**Bajarlo un poco:**
```css
.testimonial-center {
  top: 30px;       /* 30px desde arriba */
  left: 50%;
  transform: translateX(-50%);
}
```

**Moverlo a la izquierda (sin centrar):**
```css
.testimonial-center {
  top: 0;
  left: 30%;       /* Cambia el % */
  transform: none; /* Quita el centrado */
}
```

---

### **Testimonio DERECHA (Galvanizados de Occidente)**

```css
.testimonial-right {
  top: 40%;       /* 40% desde ARRIBA */
  right: 5%;      /* Distancia desde DERECHA */
}
```

**Ejemplos de ajustes:**

**Subirlo más:**
```css
.testimonial-right {
  top: 20%;       /* Menos % = más arriba */
  right: 5%;
}
```

**Bajarlo más:**
```css
.testimonial-right {
  top: 60%;       /* Más % = más abajo */
  right: 5%;
}
```

**Moverlo más a la izquierda:**
```css
.testimonial-right {
  top: 40%;
  right: 15%;     /* Más % = más a la izquierda */
}
```

---

## 🎯 Sistema de Posicionamiento

### **Propiedades que puedes usar:**

| Propiedad | Descripción | Valores |
|-----------|-------------|---------|
| `top` | Desde arriba | `0` a `100%` o `0px` a `500px` |
| `bottom` | Desde abajo | `0` a `100%` o `0px` a `500px` |
| `left` | Desde izquierda | `0` a `100%` o `0px` a `500px` |
| `right` | Desde derecha | `0` a `100%` o `0px` a `500px` |

### **Unidades:**

- **Porcentajes (%)**: Relativo al contenedor (mejor para responsive)
  - `left: 50%` = en el medio horizontal
  - `top: 25%` = un cuarto desde arriba

- **Píxeles (px)**: Valor fijo
  - `left: 100px` = 100 píxeles desde la izquierda
  - `top: 50px` = 50 píxeles desde arriba

---

## 🔧 Proceso Paso a Paso

1. **Abre el archivo:**
   ```
   src/app/features/inicio/inicio.component.css
   ```

2. **Busca la clase del testimonio que quieres mover:**
   - `.testimonial-left` (línea ~190)
   - `.testimonial-center` (línea ~195)
   - `.testimonial-right` (línea ~201)

3. **Modifica los valores:**
   ```css
   .testimonial-left {
     bottom: 20px;    /* ← Cambia este valor */
     left: 8%;        /* ← O este valor */
   }
   ```

4. **Guarda el archivo (Ctrl + S)**

5. **Ve al navegador y refresca (Ctrl + F5)**

---

## 💡 Tips Importantes

### ✅ **Usar top O bottom (no ambos)**
```css
/* ✅ CORRECTO */
.testimonial-left {
  bottom: 0;
  left: 5%;
}

/* ❌ INCORRECTO - No uses top y bottom juntos */
.testimonial-left {
  top: 0;
  bottom: 0;  /* Conflicto */
  left: 5%;
}
```

### ✅ **Usar left O right (no ambos)**
```css
/* ✅ CORRECTO */
.testimonial-right {
  top: 40%;
  right: 5%;
}

/* ❌ INCORRECTO */
.testimonial-right {
  top: 40%;
  left: 10%;   /* Conflicto con right */
  right: 5%;
}
```

---

## 📏 Ajustar altura del contenedor

Si los testimonios se salen del área, ajusta la altura:

```css
.testimonials-section {
  position: relative;
  width: 100%;
  max-width: 1200px;
  height: 250px;    /* ← Cambia este valor */
  padding: 0 1rem;
}
```

**Ejemplos:**
- `height: 200px;` - Más compacto
- `height: 300px;` - Más espacio
- `height: 350px;` - Mucho espacio

---

## 🎨 Ejemplo Completo - Posicionar como en Figma

Según tu imagen del Figma, aquí está una configuración sugerida:

```css
/* Yolver - Abajo Izquierda */
.testimonial-left {
  bottom: 10px;
  left: 8%;
}

/* Lex 42 - Arriba Centro */
.testimonial-center {
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}

/* Galvanizados - Medio Derecha */
.testimonial-right {
  top: 35%;
  right: 8%;
}
```

---

## 🚀 Modo Pro: Posicionamiento Fino

Para ajustes muy precisos, combina unidades:

```css
.testimonial-left {
  bottom: calc(10% + 20px);  /* 10% + 20 píxeles extra */
  left: 5%;
}
```

---

## ✅ Checklist

- [ ] Identificar qué testimonio mover (izquierda/centro/derecha)
- [ ] Abrir `inicio.component.css`
- [ ] Buscar la clase correspondiente
- [ ] Cambiar valores de posición
- [ ] Guardar archivo
- [ ] Refrescar navegador
- [ ] Repetir hasta lograr la posición deseada

---

## 🎯 Referencia Rápida

```css
/* ARRIBA IZQUIERDA */
top: 10px;
left: 10px;

/* ARRIBA CENTRO */
top: 10px;
left: 50%;
transform: translateX(-50%);

/* ARRIBA DERECHA */
top: 10px;
right: 10px;

/* CENTRO IZQUIERDA */
top: 50%;
left: 10px;
transform: translateY(-50%);

/* CENTRO CENTRO */
top: 50%;
left: 50%;
transform: translate(-50%, -50%);

/* CENTRO DERECHA */
top: 50%;
right: 10px;
transform: translateY(-50%);

/* ABAJO IZQUIERDA */
bottom: 10px;
left: 10px;

/* ABAJO CENTRO */
bottom: 10px;
left: 50%;
transform: translateX(-50%);

/* ABAJO DERECHA */
bottom: 10px;
right: 10px;
```

¡Experimenta y ajusta según necesites! 🎨

