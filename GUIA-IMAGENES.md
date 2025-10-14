# 📸 Guía Completa para Agregar Imágenes

## 🗂️ Estructura de Carpetas

Todas las imágenes van en: `public/assets/images/`

```
public/
└── assets/
    └── images/
        ├── logo.png                    ← Logo principal del header
        ├── testimonials/               ← Avatares de testimonios
        │   ├── avatar-1.png
        │   ├── avatar-2.png
        │   ├── avatar-3.png
        │   └── default-avatar.png
        ├── clients/                    ← Logos de clientes
        │   ├── ingeal.png
        │   ├── vikinsa.png
        │   ├── cnid.png
        │   ├── servinformacion.png
        │   ├── casa-estudio.png
        │   └── don-carlos.png
        └── services/                   ← Imágenes de servicios
            ├── derecho-laboral.jpg
            ├── derecho-comercial.jpg
            ├── derecho-corporativo.jpg
            ├── gestion-predial.jpg
            └── placeholder.jpg
```

---

## 📋 PASO A PASO - Agregar cada imagen

### 1️⃣ LOGO PRINCIPAL (Header)
**Dónde guardarlo:**
```
public/assets/images/logo.png
```

**Cómo exportar desde Figma:**
1. En Figma, selecciona el logo "LEX 42"
2. Click derecho → Export → PNG
3. Escala: 2x o 3x (para pantallas retina)
4. Guárdalo con el nombre exacto: `logo.png`
5. Colócalo en: `public/assets/images/`

**Especificaciones:**
- Formato: PNG con transparencia
- Tamaño recomendado: 200x60px (o ratio similar)
- Fondo: Transparente
- Color: Blanco (para que se vea sobre azul oscuro)

---

### 2️⃣ TESTIMONIOS - Avatares (3 imágenes)

#### Avatar 1 - Lex 42
```
public/assets/images/testimonials/avatar-1.png
```
- Exporta el logo pequeño que aparece en el primer testimonio
- Tamaño: 50x50px
- Formato: PNG

#### Avatar 2 - Yolver Gutierrez
```
public/assets/images/testimonials/avatar-2.png
```
- Exporta el avatar del segundo testimonio
- Tamaño: 50x50px
- Formato: PNG

#### Avatar 3 - Galvanizados de Occidente
```
public/assets/images/testimonials/avatar-3.png
```
- Exporta el avatar del tercer testimonio
- Tamaño: 50x50px
- Formato: PNG

#### Avatar por defecto (opcional - backup)
```
public/assets/images/testimonials/default-avatar.png
```
- Una imagen genérica de 50x50px
- Se usa si alguna imagen no carga

---

### 3️⃣ LOGOS DE CLIENTES (6 imágenes en banda inferior)

**IMPORTANTE:** Estos logos se mostrarán en BLANCO sobre fondo azul oscuro.

#### Logo 1 - Ingeal de Occidente
```
public/assets/images/clients/ingeal.png
```

#### Logo 2 - Vikinsa
```
public/assets/images/clients/vikinsa.png
```

#### Logo 3 - CNID
```
public/assets/images/clients/cnid.png
```

#### Logo 4 - Servinformación
```
public/assets/images/clients/servinformacion.png
```

#### Logo 5 - Casa Estudio Fitness Club
```
public/assets/images/clients/casa-estudio.png
```

#### Logo 6 - Don Carlos
```
public/assets/images/clients/don-carlos.png
```

**Especificaciones para logos de clientes:**
- Formato: PNG con transparencia
- Tamaño máximo: 120px de ancho × 50px de alto
- Color: Preferiblemente en BLANCO (o el código aplica filtro automático)
- Fondo: Transparente

**Cómo exportar:**
1. Selecciona cada logo en Figma
2. Export → PNG
3. Asegúrate de exportarlos en blanco o con transparencia
4. Guárdalos con los nombres exactos mencionados arriba

---

### 4️⃣ SERVICIOS - Imágenes de tarjetas (4 imágenes)

#### Servicio 1 - Derecho Laboral
```
public/assets/images/services/derecho-laboral.jpg
```
- Imagen: Persona firmando documentos / Mano escribiendo
- Tamaño recomendado: 800x500px
- Formato: JPG

#### Servicio 2 - Derecho Comercial
```
public/assets/images/services/derecho-comercial.jpg
```
- Imagen: Martillo de juez sobre documentos
- Tamaño recomendado: 800x500px
- Formato: JPG

#### Servicio 3 - Derecho Corporativo
```
public/assets/images/services/derecho-corporativo.jpg
```
- Imagen: Balanza de justicia
- Tamaño recomendado: 800x500px
- Formato: JPG

#### Servicio 4 - Gestión Predial
```
public/assets/images/services/gestion-predial.jpg
```
- Imagen: Martillo de juez / Documentos legales
- Tamaño recomendado: 800x500px
- Formato: JPG

#### Placeholder (opcional - backup)
```
public/assets/images/services/placeholder.jpg
```
- Imagen genérica legal
- Se usa si alguna imagen no carga

---

## ✅ CHECKLIST - Verificar que todo esté listo

Marca cada una cuando la agregues:

**Logo Principal:**
- [ ] `public/assets/images/logo.png`

**Testimonios (3):**
- [ ] `public/assets/images/testimonials/avatar-1.png`
- [ ] `public/assets/images/testimonials/avatar-2.png`
- [ ] `public/assets/images/testimonials/avatar-3.png`

**Logos Clientes (6):**
- [ ] `public/assets/images/clients/ingeal.png`
- [ ] `public/assets/images/clients/vikinsa.png`
- [ ] `public/assets/images/clients/cnid.png`
- [ ] `public/assets/images/clients/servinformacion.png`
- [ ] `public/assets/images/clients/casa-estudio.png`
- [ ] `public/assets/images/clients/don-carlos.png`

**Servicios (4):**
- [ ] `public/assets/images/services/derecho-laboral.jpg`
- [ ] `public/assets/images/services/derecho-comercial.jpg`
- [ ] `public/assets/images/services/derecho-corporativo.jpg`
- [ ] `public/assets/images/services/gestion-predial.jpg`

---

## 🎨 Tips para exportar desde Figma

1. **Seleccionar elemento** → Click en la capa/grupo
2. **Panel derecho** → Scroll hasta "Export"
3. **Agregar preset de export** → Click en "+"
4. **Configurar:**
   - Formato: PNG (logos) o JPG (fotos)
   - Escala: 2x para mejor calidad
5. **Export** → Guardar con el nombre exacto
6. **Optimizar (opcional):** Usa TinyPNG.com para reducir tamaño

---

## 🚨 Nombres EXACTOS - NO cambiar

Los nombres de archivo deben ser EXACTAMENTE como se indican (incluyendo mayúsculas/minúsculas y guiones).

❌ **INCORRECTO:**
- `Logo.png`
- `avatar_1.png`
- `derecho laboral.jpg`

✅ **CORRECTO:**
- `logo.png`
- `avatar-1.png`
- `derecho-laboral.jpg`

---

## 📞 ¿Necesitas ayuda?

Si alguna imagen no se muestra:
1. Verifica que el nombre sea exacto
2. Verifica que esté en la carpeta correcta
3. Refresca el navegador (Ctrl + F5)
4. Revisa la consola del navegador (F12) por errores

