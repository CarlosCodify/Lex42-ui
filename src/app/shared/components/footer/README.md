# Footer Component

## 📝 Descripción

Componente de pie de página (footer) con diseño profesional que incluye logo, enlaces de navegación, redes sociales y enlaces legales. Se muestra al final de toda la página.

## 🎨 Diseño

- **Fondo**: Degradado azul oscuro (`#01274D` → `#013B72`)
- **Layout**: Grid de 3 columnas (desktop) → responsive a 1 columna (mobile)
- **Secciones**:
  1. Logo de Lex 42
  2. Recursos (enlaces internos)
  3. Síguenos (redes sociales)
  4. Barra inferior con copyright y enlaces legales

## 📂 Estructura

```
src/app/shared/components/footer/
├── footer.component.ts      # Lógica del componente
├── footer.component.html    # Template HTML
├── footer.component.css     # Estilos
└── README.md               # Documentación
```

## 🔧 Contenido

### **1. Logo**
- Logo de Lex 42 enlazado al inicio
- Altura responsive: `clamp(50px, 6vw, 70px)`

### **2. Recursos**
Enlaces internos de navegación:
- Servicios
- Equipo
- Noticias
- La firma
- Contáctanos (mailto)

### **3. Síguenos**
Enlaces a redes sociales:
- LinkedIn
- Instagram
- Tik Tok
- Email (mailto)

### **4. Barra Inferior**
- Copyright dinámico: `© 2025 Lex 42 Abogados Asociados`
- Enlaces legales:
  - Términos de uso
  - Política de privacidad
  - Licencia de uso

## 🎨 Personalización

### Cambiar el año del copyright

El año se actualiza automáticamente usando:

```typescript
protected readonly currentYear = new Date().getFullYear();
```

### Agregar/Modificar enlaces

Edita en `footer.component.html`:

```html
<ul class="footer-links">
  <li><a href="#tu-seccion">Tu Enlace</a></li>
</ul>
```

### Cambiar redes sociales

Actualiza los enlaces en la sección "Síguenos":

```html
<li><a href="https://tu-red-social.com" target="_blank" rel="noopener noreferrer">Red Social</a></li>
```

### Cambiar colores

En `footer.component.css`:

```css
.footer {
  background: linear-gradient(180deg, #TU_COLOR_1 0%, #TU_COLOR_2 100%);
}
```

- **Enlaces hover**: `.footer-links li a:hover { color: #73BDFF; }`
- **Texto copyright**: `rgba(255, 255, 255, 0.7)`

## 🎭 Efectos Interactivos

### Hover en Enlaces
- Cambian a color celeste (`#73BDFF`)
- Se desplazan ligeramente a la derecha (`transform: translateX(4px)`)
- Transición suave de 0.3s

### Hover en Logo
- Reduce opacidad a 0.8

## 📱 Responsive

### **Desktop (>1024px)**
- Grid de 3 columnas: Logo (2fr) + Recursos (1fr) + Síguenos (1fr)
- Logo a la izquierda
- Secciones distribuidas horizontalmente

### **Tablet (768px - 1024px)**
- Grid de 2 columnas
- Logo ocupa ambas columnas y se centra
- Recursos y Síguenos en la segunda fila

### **Mobile (<768px)**
- Una columna vertical
- Todo centrado
- Enlaces sin desplazamiento lateral en hover
- Copyright y enlaces legales apilados verticalmente

## 🔗 Integración

El Footer se agrega automáticamente al final de la aplicación:

```html
<!-- src/app/app.html -->
<app-header></app-header>
<main class="main-content">
  <!-- ... todas las secciones ... -->
</main>
<app-footer></app-footer>
```

## 📧 Enlaces de Contacto

### Correo Electrónico

Los enlaces mailto abren el cliente de correo del usuario:

```html
<a href="mailto:contacto@lex42.com">Contáctanos</a>
```

**Nota**: Puedes cambiar `contacto@lex42.com` por el correo real de Lex 42.

## 🌐 Enlaces Externos

Todos los enlaces a redes sociales incluyen:

- `target="_blank"` - Abre en nueva pestaña
- `rel="noopener noreferrer"` - Seguridad y privacidad

## 💡 Mejoras Futuras

1. **Agregar íconos a las redes sociales** (SVG o Font Awesome)
2. **Implementar páginas de términos y privacidad**
3. **Agregar newsletter subscription**
4. **Agregar mapa del sitio**

## 🎨 Paleta de Colores

- **Fondo degradado**: `#01274D` → `#013B72`
- **Texto principal**: `#FFFFFF`
- **Texto secundario**: `rgba(255, 255, 255, 0.8)`
- **Texto copyright**: `rgba(255, 255, 255, 0.7)`
- **Hover**: `#73BDFF` (celeste)
- **Línea separadora**: `rgba(255, 255, 255, 0.15)`

## 📦 Dependencias

- Angular 20.3
- No requiere librerías externas

## ✅ Checklist de Implementación

- [x] Componente creado
- [x] Estilos responsive implementados
- [x] Enlaces funcionales (internos y externos)
- [x] Copyright dinámico
- [x] Efectos hover
- [x] Integrado en la aplicación
- [ ] Logo real agregado a `/assets/images/logo.png`
- [ ] URLs de redes sociales actualizadas
- [ ] Páginas de términos y privacidad creadas

## 🛠️ Para Actualizar

### Cambiar el correo de contacto

Busca y reemplaza en `footer.component.html`:

```
contacto@lex42.com → tu-correo@lex42.com
```

### Cambiar URLs de redes sociales

Edita las URLs en la sección "Síguenos":

```html
<li><a href="https://linkedin.com/company/lex42" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
<li><a href="https://instagram.com/lex42" target="_blank" rel="noopener noreferrer">Instagram</a></li>
<li><a href="https://tiktok.com/@lex42" target="_blank" rel="noopener noreferrer">Tik Tok</a></li>
```

