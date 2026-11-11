# Pantallas y flujos — RifaFácil

> Guía de interfaz para construir cada pantalla: ruta, contenido, estados y bosquejo. Complementa la sección 5 de [SPEC.md](SPEC.md).

## 1. Mapa de rutas

| Pantalla | Archivo (Expo Router) | Tipo |
|---|---|---|
| Inicio | `app/index.tsx` | Inicio |
| Formulario de rifa | `app/formulario-de-rifa.tsx` | Formulario |
| Grilla de números | `app/grilla-de-numeros.tsx` | Lista / vista |
| Detalle de número | `app/detalle-de-numero.tsx` | Detalle |
| Vendedores | `app/vendedores.tsx` | Lista / vista |
| Deudores | `app/deudores.tsx` | Lista / vista |
| Sorteo | `app/sorteo.tsx` | Lista / vista |
| Reporte | `app/reporte.tsx` | Lista / vista |

**Convenciones de interfaz**

- Una acción principal por pantalla, en un botón grande abajo o en un botón flotante.
- Los formularios se abren como pantalla completa, validan al enviar y muestran el error junto al campo.
- Toda lista tiene estado vacío con una frase y un botón que lleva a la acción.
- Las acciones que borran piden confirmación explícita con el nombre del registro.
- El botón atrás nunca pierde datos sin avisar: si el formulario tiene cambios, se pregunta antes de salir.
- Textos en español de Bolivia (voseo opcional, siempre claros); montos como `Bs 1.250,00`.

## 2. Detalle por pantalla

### 2.1 Inicio

- **Archivo:** `app/index.tsx`
- **Qué muestra:** Rifas activas con recaudado vs meta y días al sorteo
- **Acciones:** Crear rifa

**Bosquejo**

```
┌──────────────────────────────┐
│ RifaFácil                    │
├──────────────────────────────┤
│ [ Resumen y alertas ]        │
│                              │
│  ▸ Grilla de números        │
│  ▸ Detalle de número        │
│  ▸ Vendedores               │
│  ▸ Deudores                 │
│                              │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay información para mostrar. |
| Con datos | Rifas activas con recaudado vs meta y días al sorteo |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.2 Formulario de rifa

- **Archivo:** `app/formulario-de-rifa.tsx`
- **Qué muestra:** Nombre, premio, precio, total de números, fecha de sorteo
- **Acciones:** Guardar
- **Historias relacionadas:** HU-01, HU-02, HU-05 (sugerido por coincidencia de temas; confirmar al construir).

**Campos del formulario**

| Campo | Control | Obligatorio | Validación |
|---|---|---|---|
| nombre | Texto | Sí | Texto de 1 a 80 caracteres sin espacios sobrantes |
| premio | Texto largo | Sí | Hasta 280 caracteres |
| precio numero | Numérico decimal | Sí | Mayor a 0; Hasta 2 decimales |
| total numeros | Numérico decimal | Sí | Mayor o igual a 0; Hasta 2 decimales |
| fecha sorteo | Fecha | No | Fecha real en formato AAAA-MM-DD |

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Formulario de rifa          │
├──────────────────────────────┤
│ nombre                       │
│ [____________________]       │
│ premio                       │
│ [____________________]       │
│ precio numero                │
│ [____________________]       │
│ total numeros                │
│ [____________________]       │
│ fecha sorteo                 │
│ [____________________]       │
│                              │
│ [        Guardar        ]    │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay rifas. Tocá «Guardar» para empezar. |
| Con datos | Nombre, premio, precio, total de números, fecha de sorteo |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.3 Grilla de números

- **Archivo:** `app/grilla-de-numeros.tsx`
- **Qué muestra:** Cuadrícula con colores por estado y filtro
- **Acciones:** Tocar número, filtrar, buscar
- **Historias relacionadas:** HU-01, HU-02, HU-05 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Grilla de números           │
├──────────────────────────────┤
│ comprador · rifa_id          │
│ comprador · rifa_id          │
│ comprador · rifa_id          │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay numeros. Tocá «Tocar número» para empezar. |
| Con datos | Cuadrícula con colores por estado y filtro |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.4 Detalle de número

- **Archivo:** `app/detalle-de-numero.tsx`
- **Qué muestra:** Estado, comprador, teléfono, vendedor
- **Acciones:** Reservar, marcar pagado, liberar
- **Historias relacionadas:** HU-01, HU-02, HU-03, HU-05 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Detalle de número           │
├──────────────────────────────┤
│ comprador                    │
│ Resumen / totales            │
├──────────────────────────────┤
│ • registro 1                 │
│ • registro 2                 │
│ • registro 3                 │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay numeros. Tocá «Reservar» para empezar. |
| Con datos | Estado, comprador, teléfono, vendedor |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.5 Vendedores

- **Archivo:** `app/vendedores.tsx`
- **Qué muestra:** Lista con vendido, rendido y debe
- **Acciones:** Agregar vendedor, registrar rendición
- **Historias relacionadas:** HU-03, HU-04 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Vendedores                  │
├──────────────────────────────┤
│ nombre · fecha               │
│ nombre · fecha               │
│ nombre · fecha               │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay vendedores. Tocá «Agregar vendedor» para empezar. |
| Con datos | Lista con vendido, rendido y debe |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.6 Deudores

- **Archivo:** `app/deudores.tsx`
- **Qué muestra:** Vendedores o compradores con saldo
- **Acciones:** Avisar por WhatsApp
- **Historias relacionadas:** HU-02, HU-03, HU-04 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Deudores                    │
├──────────────────────────────┤
│ nombre · fecha               │
│ nombre · fecha               │
│ nombre · fecha               │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay información para mostrar. |
| Con datos | Vendedores o compradores con saldo |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.7 Sorteo

- **Archivo:** `app/sorteo.tsx`
- **Qué muestra:** Botón de sorteo, número ganador y comprador
- **Acciones:** Sortear, compartir resultado
- **Historias relacionadas:** HU-01, HU-02, HU-05 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Sorteo                      │
├──────────────────────────────┤
│ fecha · rifa_id              │
│ fecha · rifa_id              │
│ fecha · rifa_id              │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay sorteos. Tocá «Sortear» para empezar. |
| Con datos | Botón de sorteo, número ganador y comprador |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.8 Reporte

- **Archivo:** `app/reporte.tsx`
- **Qué muestra:** Resumen de recaudación
- **Acciones:** Compartir PDF
- **Historias relacionadas:** HU-06 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Reporte                     │
├──────────────────────────────┤
│ nombre · fecha               │
│ nombre · fecha               │
│ nombre · fecha               │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay información para mostrar. |
| Con datos | Resumen de recaudación |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

## 3. Flujos principales

**HU-01 — Crear una rifa**

```
defino 200 números a 5 Bs  →  se crea la grilla con 200 números libres
```

**HU-02 — Controlar la grilla de números**

```
toco el 15 y elijo «Pagado»  →  se asigna comprador y vendedor y el número cambia de color
```

**HU-03 — Cuenta de cada vendedor**

```
registro una rendición de 100 Bs  →  su deuda baja en 100 Bs y queda el historial
```

**HU-04 — Deudores y avisos**

```
abro Deudores  →  veo la lista ordenada por monto
```

**HU-05 — Sorteo transparente**

```
toco «Sortear»  →  sale un ganador al azar entre esos 120 y queda guardado
```

**HU-06 — Reporte de recaudación**

```
toco «Reporte»  →  se genera un PDF con recaudado, números vendidos, premio, ganador y rendiciones por vendedor
```
