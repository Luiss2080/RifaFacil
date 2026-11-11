# Especificación del MVP — RifaFácil

> Documento vivo. Si una decisión cambia, se actualiza acá primero y después en el código.

## 1. Resumen

**Propuesta de valor:** Que organizar una rifa no sea un caos de papelitos: números, vendedores, deudas y sorteo en una sola app.

**Problema:** Las rifas de colegios, clubes y juntas se llevan en hojas con números tachados; se pierde la cuenta de lo vendido y lo rendido y hay peleas por los deudores y el sorteo.

**Cómo se resuelve hoy:** Hojas de papel, planillas y chats de WhatsApp.

**Usuario objetivo:** Tesorero o encargado de una rifa de 50 a 1000 números, con varios vendedores (alumnos, socios, vecinos).

**Métricas de éxito del MVP:**

- Ver de un vistazo cuántos números están libres, reservados y pagados.
- Saber cuánto debe cada vendedor.
- Hacer el sorteo de forma transparente y mostrar el reporte de recaudación.

## 2. Alcance del MVP

### Incluido

- Rifas con premio, precio por número y fecha de sorteo.
- Grilla de números: libre, reservado o pagado.
- Vendedores con su cuenta de lo vendido y lo rendido.
- Lista de deudores con aviso por WhatsApp.
- Sorteo aleatorio entre los números pagados.
- Reporte de recaudación en PDF.

### Fuera del MVP

- Cuentas de usuario, inicio de sesión y multiusuario.
- Servidor propio, nube o sincronización entre dispositivos.
- Pagos en línea o pasarelas de cobro.
- Publicación en App Store (iOS).
- Cualquier servicio de pago o con costo recurrente.

## 3. Reglas de negocio

Reglas que el código **debe** cumplir. Cada una se cubre con pruebas automáticas cuando es lógica pura.

- **RN-01** Una rifa tiene números del 1 al total definido al crearla.
- **RN-02** Un número puede estar libre, reservado o pagado; solo los pagados participan del sorteo.
- **RN-03** Cada número vendido pertenece a un vendedor para saber quién rinde cuentas.
- **RN-04** Un vendedor debe lo vendido menos lo que ya rindió (entregó) al tesorero.
- **RN-05** El sorteo se hace una sola vez; el resultado queda guardado y no se puede repetir.
- **RN-06** Si el número ganador no está pagado, el sorteo se repite solo entre los pagados (no puede ganar uno no pagado).
- **RN-07** No se pueden cambiar el precio ni el total de números una vez vendido el primer número.

## 4. Historias de usuario y criterios de aceptación

Formato: **Dado** un contexto, **Cuando** el usuario hace algo, **Entonces** pasa algo verificable.

### HU-01 — Crear una rifa

**Como** encargado **quiero** crear una rifa con premio, precio por número y fecha de sorteo **para** empezar a vender.

**Fase:** 2 — Rifas y grilla de números

**Criterios de aceptación:**

1. **Dado:** el formulario de rifa. **Cuando:** defino 200 números a 5 Bs. **Entonces:** se crea la grilla con 200 números libres.
2. **Dado:** el formulario de rifa. **Cuando:** dejo el precio en 0. **Entonces:** no guarda y pide un precio mayor a 0.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-02 — Controlar la grilla de números

**Como** encargado **quiero** marcar cada número como libre, reservado o pagado con su comprador **para** saber qué queda por vender.

**Fase:** 2 — Rifas y grilla de números

**Criterios de aceptación:**

1. **Dado:** una grilla con números libres. **Cuando:** toco el 15 y elijo «Pagado». **Entonces:** se asigna comprador y vendedor y el número cambia de color.
2. **Dado:** un número pagado. **Cuando:** intento venderlo a otra persona. **Entonces:** la app lo bloquea y muestra quién lo tiene.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-03 — Cuenta de cada vendedor

**Como** encargado **quiero** ver lo vendido y lo rendido por vendedor **para** cobrar a quien me debe.

**Fase:** 3 — Vendedores y rendiciones

**Criterios de aceptación:**

1. **Dado:** un vendedor con 30 números pagados. **Cuando:** registro una rendición de 100 Bs. **Entonces:** su deuda baja en 100 Bs y queda el historial.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-04 — Deudores y avisos

**Como** encargado **quiero** ver la lista de deudores y avisarles por WhatsApp **para** recuperar el dinero antes del sorteo.

**Fase:** 4 — Deudores y avisos

**Criterios de aceptación:**

1. **Dado:** vendedores con saldo pendiente. **Cuando:** abro Deudores. **Entonces:** veo la lista ordenada por monto.
2. **Dado:** un deudor con teléfono. **Cuando:** toco «Avisar». **Entonces:** se abre WhatsApp con el mensaje prellenado.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-05 — Sorteo transparente

**Como** encargado **quiero** sortear un ganador entre los números pagados **para** hacerlo justo y rápido.

**Fase:** 5 — Sorteo y reporte

**Criterios de aceptación:**

1. **Dado:** una rifa con 120 números pagados. **Cuando:** toco «Sortear». **Entonces:** sale un ganador al azar entre esos 120 y queda guardado.
2. **Dado:** una rifa ya sorteada. **Cuando:** intento sortear otra vez. **Entonces:** la app muestra el resultado anterior y no permite repetir.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-06 — Reporte de recaudación

**Como** encargado **quiero** obtener un reporte en PDF **para** rendir cuentas.

**Fase:** 5 — Sorteo y reporte

**Criterios de aceptación:**

1. **Dado:** una rifa terminada. **Cuando:** toco «Reporte». **Entonces:** se genera un PDF con recaudado, números vendidos, premio, ganador y rendiciones por vendedor.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

## 5. Pantallas y navegación

| Pantalla | Qué muestra | Acciones principales |
|---|---|---|
| Inicio | Rifas activas con recaudado vs meta y días al sorteo | Crear rifa |
| Formulario de rifa | Nombre, premio, precio, total de números, fecha de sorteo | Guardar |
| Grilla de números | Cuadrícula con colores por estado y filtro | Tocar número, filtrar, buscar |
| Detalle de número | Estado, comprador, teléfono, vendedor | Reservar, marcar pagado, liberar |
| Vendedores | Lista con vendido, rendido y debe | Agregar vendedor, registrar rendición |
| Deudores | Vendedores o compradores con saldo | Avisar por WhatsApp |
| Sorteo | Botón de sorteo, número ganador y comprador | Sortear, compartir resultado |
| Reporte | Resumen de recaudación | Compartir PDF |

**Navegación:** la pantalla de inicio es el punto de partida; desde ahí se llega a cada sección con un toque y se vuelve con el botón atrás. Las acciones frecuentes (nuevo registro) están siempre a la vista. La navegación se implementa con Expo Router (rutas por archivo en `app/`).

## 6. Modelo de datos

Base SQLite local versionada con `PRAGMA user_version`. Las fechas se guardan como texto ISO 8601 y los montos como números reales (en bolivianos).

### `rifas`

Cada rifa con premio, precio y fecha de sorteo.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `nombre` | TEXT | Obligatorio |
| `premio` | TEXT | Obligatorio |
| `precio_numero` | REAL | Obligatorio |
| `total_numeros` | INTEGER | Obligatorio |
| `fecha_sorteo` | TEXT | Opcional |

### `vendedores`

Personas que venden números.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `nombre` | TEXT | Obligatorio |
| `telefono` | TEXT | Opcional |

### `numeros`

Cada número con su estado y comprador.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `rifa_id` | INTEGER | Obligatorio; Referencia a rifas (se borra en cascada) |
| `numero` | INTEGER | Obligatorio |
| `comprador` | TEXT | Opcional |
| `telefono` | TEXT | Opcional |
| `vendedor_id` | INTEGER | Referencia a vendedores |
| `estado` | TEXT | Obligatorio; Por defecto “libre” |
| `fecha_pago` | TEXT | Opcional |

Restricciones: `UNIQUE (rifa_id, numero)`.

### `sorteos`

Resultado del sorteo con su fecha.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `rifa_id` | INTEGER | Obligatorio; Referencia a rifas (se borra en cascada) |
| `numero_ganador` | INTEGER | Obligatorio |
| `fecha` | TEXT | Obligatorio |

Detalle de la política de migraciones: nunca editar una migración publicada; agregar una nueva al final de la lista en `src/db/schema.ts`.

## 7. Casos borde a contemplar

- Se vende un número reservado vencido: el encargado decide si lo libera.
- Dos vendedores reclaman el mismo número: gana el primer registro guardado.
- Rifa con ganador no encontrado (nadie pagó): el sorteo avisa que no hay números pagados.
- Se agrega un número extra a la rifa: solo mientras no se haya vendido ninguno.

## 8. Requisitos no funcionales

- **Offline total:** ninguna función del MVP requiere internet.
- **Rendimiento:** la app abre en menos de 2 segundos; las listas responden de inmediato con cientos de registros (consultas con índices y listas virtualizadas).
- **Privacidad:** los datos nunca salen del teléfono, salvo lo que el usuario comparte a propósito.
- **Idioma y formato:** español de Bolivia, montos en bolivianos (Bs) con dos decimales, fechas día/mes/año.
- **Usabilidad:** botones grandes, formularios cortos y flujos de pocos toques; pensado para usarse de pie y con una mano.
- **Accesibilidad básica:** contraste suficiente, etiquetas de accesibilidad en botones y tamaño de texto que respeta el ajuste del sistema.
- **Calidad:** `npm run lint`, `npx tsc --noEmit` y `npm test` pasan en cada commit (CI en GitHub Actions).
- **Compatibilidad:** Android 8 o superior (probado con Expo Go y con el APK).

### Capacidades de Expo que usa

| Paquete | Para qué | Permiso |
|---|---|---|
| `expo-print` | Generar PDF desde HTML | — |
| `expo-sharing` | Compartir PDF, CSV o respaldos con otras apps | — |

## 9. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Dudas sobre la limpieza del sorteo | Sorteo guardado con fecha y total de participantes; reporte compartible. |
| Grillas grandes lentas | Lista virtualizada y consultas indexadas por rifa y número. |
| Cambios de esquema que rompan datos | Migraciones con `PRAGMA user_version`; nunca editar una migración publicada |
| El alcance crece | Todo lo que no esté en la sección 2 va a «Después del MVP» en el [ROADMAP](ROADMAP.md) |

## 10. Criterios para lanzar el MVP (v1.0.0)

- [ ] Todas las historias de la sección 4 cumplen sus criterios de aceptación.
- [ ] Todas las reglas de negocio de la sección 3 tienen pruebas o verificación manual.
- [ ] Probado en un teléfono Android real, en modo avión.
- [ ] APK generado con `npm run build:apk` e instalado en un teléfono limpio.
- [ ] README con capturas de pantalla y CHANGELOG actualizado.
- [ ] Release v1.0.0 publicado con el APK adjunto.

## 11. Glosario

| Término | Significado en RifaFácil |
|---|---|
| `rifas` | Cada rifa con premio, precio y fecha de sorteo. |
| `vendedores` | Personas que venden números. |
| `numeros` | Cada número con su estado y comprador. |
| `sorteos` | Resultado del sorteo con su fecha. |
| `numeros.estado` | Valores: libre, reservado, pagado |

## 12. Mensajes estándar

| Situación | Mensaje |
|---|---|
| Campo obligatorio vacío | Completá este campo |
| Número inválido | Ingresá un número válido |
| Monto cero o negativo | El monto debe ser mayor a 0 |
| Fecha inválida | Fecha no válida |
| Guardado correcto | Guardado |
| Error al guardar | No se pudo guardar. Intentá de nuevo |
| Confirmar borrado | ¿Borrar «{nombre}»? No se puede deshacer |
| Lista vacía | Todavía no hay nada acá. Tocá «+» para empezar |

## 13. Trazabilidad

| Historia | Fase | Casos de prueba |
|---|---|---|
| HU-01 Crear una rifa | 2 | CP-01-1, CP-01-2 |
| HU-02 Controlar la grilla de números | 2 | CP-02-1, CP-02-2 |
| HU-03 Cuenta de cada vendedor | 3 | CP-03-1 |
| HU-04 Deudores y avisos | 4 | CP-04-1, CP-04-2 |
| HU-05 Sorteo transparente | 5 | CP-05-1, CP-05-2 |
| HU-06 Reporte de recaudación | 5 | CP-06-1 |

## 14. Documentos relacionados

- [DATOS.md](DATOS.md) · [PANTALLAS.md](PANTALLAS.md) · [PRUEBAS.md](PRUEBAS.md) · [BACKLOG.md](BACKLOG.md) · [ROADMAP.md](ROADMAP.md) · [PLANNING.md](PLANNING.md)
