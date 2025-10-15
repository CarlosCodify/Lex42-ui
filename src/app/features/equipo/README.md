# 👥 Componente Equipo

Sección que muestra los miembros del equipo legal de Lex 42.

## 📋 Características

- ✅ Fotos circulares en blanco y negro (CSS filter)
- ✅ Grid responsive adaptable
- ✅ Overlay con información al hacer hover
- ✅ Click en foto/nombre prepara navegación a perfil (implementar después)
- ✅ Botón "Consultar" abre cliente de correo
- ✅ ID `#equipo` para navegación desde menú
- ✅ Ocupa pantalla completa en desktop
- ✅ Animaciones suaves

## 🎨 Elementos Visuales

### Título
- "Nuestros **abogados**" (con "abogados" en color naranja `#D8832F`)

### Tarjetas de Abogados
- Fotos circulares con `filter: grayscale(100%)`
- Sombra elevada con hover
- Overlay con degradado azul oscuro

### Overlay (Hover)
- Nombre completo
- Cargo/Especialidad
- Botón "Consultar" (abre email)

## 📁 Estructura de Assets

Las imágenes deben estar en:
```
public/assets/images/teams/
├── 1.jpg  (Pablo A. Rengifo)
├── 2.jpg  (Segundo abogado)
├── 3.jpg  (Tercera abogada)
└── placeholder.jpg (opcional - fallback)
```

## 🔧 Agregar/Editar Miembros

Edita el archivo `equipo.component.ts`:

```typescript
protected readonly teamMembers = signal<TeamMember[]>([
  {
    id: 1,
    name: 'Nombre Completo',
    position: 'Cargo o Especialidad',
    photo: '/assets/images/teams/1.jpg',
    email: 'email@lex42.com',
    profileUrl: '/equipo/nombre-apellido' // Para routing futuro
  },
  // ... más miembros
]);
```

## 📧 Funcionalidad de Email

Al hacer click en "Consultar":
```typescript
openEmail(email: string): void {
  window.location.href = `mailto:${email}`;
}
```

Esto abre el cliente de correo predeterminado del usuario.

## 🔗 Navegación a Perfil (Para implementar después)

La función `goToProfile()` está preparada para cuando implementes routing:

```typescript
goToProfile(member: TeamMember): void {
  // Descomentar cuando tengas routing:
  // this.router.navigate([member.profileUrl]);
}
```

## 🎯 Interacciones

### Desktop
- **Hover**: Muestra overlay con información
- **Click en foto/nombre**: Va al perfil del abogado (preparado)
- **Click en "Consultar"**: Abre email

### Mobile
- **Tap en foto**: Muestra overlay
- **Tap en "Consultar"**: Abre email
- **Tap en nombre**: Va al perfil (preparado)

## 📐 Responsive

| Breakpoint | Comportamiento |
|------------|----------------|
| Desktop (>1024px) | 3 columnas, fotos 280-400px |
| Tablet (768-1024px) | 2-3 columnas, fotos 250-350px |
| Mobile (<768px) | 1 columna, fotos 240-320px |

## 🎨 Personalización

### Cambiar cantidad de columnas:
```css
.team-grid {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  /* Cambiar minmax para ajustar columnas */
}
```

### Cambiar tamaño de fotos:
```css
.team-photo-wrapper {
  width: clamp(280px, 25vw, 400px);
  height: clamp(280px, 25vw, 400px);
  /* Ajustar valores según necesites */
}
```

### Cambiar intensidad de blanco y negro:
```css
.team-photo {
  filter: grayscale(100%); /* 0% = color, 100% = B/N */
}
```

## ✅ Checklist de Implementación

- [x] Componente creado
- [x] Fotos en blanco y negro
- [x] Hover/overlay funcional
- [x] Botón email funcional
- [x] ID para navegación
- [x] Responsive
- [ ] Imágenes de abogados agregadas
- [ ] Routing a perfiles (implementar después)

