# Especificación del MVP — RifaFácil

## 1. Resumen

Rifas y polladas sin papel: números vendidos, pagos, vendedores y sorteo aleatorio.

**Usuario objetivo:** colegios, clubes y juntas vecinales.

**Problema que resuelve:** hoy estas tareas se llevan en cuaderno o en el chat de WhatsApp, con errores y sin historial. RifaFácil las ordena en una app simple que funciona sin internet.

**Propuesta de valor:** registrar en segundos, consultar al instante y compartir el resultado, sin cuentas, sin servidores y sin costo.

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
- Servidor, nube o sincronización entre dispositivos.
- Pagos en línea o pasarelas de cobro.
- Publicación en App Store (iOS).
- Cualquier servicio de pago.

## 3. Historias de usuario y criterios de aceptación

### HU-01 — Rifas con premio, precio por número y fecha de sorteo

**Como** usuario (colegios, clubes y juntas vecinales), **quiero** rifas con premio, precio por número y fecha de sorteo, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-02 — Grilla de números: libre, reservado o pagado

**Como** usuario (colegios, clubes y juntas vecinales), **quiero** grilla de números: libre, reservado o pagado, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-03 — Vendedores con su cuenta de lo vendido y lo rendido

**Como** usuario (colegios, clubes y juntas vecinales), **quiero** vendedores con su cuenta de lo vendido y lo rendido, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-04 — Lista de deudores con aviso por WhatsApp

**Como** usuario (colegios, clubes y juntas vecinales), **quiero** lista de deudores con aviso por WhatsApp, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-05 — Sorteo aleatorio entre los números pagados

**Como** usuario (colegios, clubes y juntas vecinales), **quiero** sorteo aleatorio entre los números pagados, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

### HU-06 — Reporte de recaudación en PDF

**Como** usuario (colegios, clubes y juntas vecinales), **quiero** reporte de recaudación en PDF, **para** no depender de cuadernos ni mensajes sueltos.

Criterios de aceptación:

- [ ] Se puede hacer completo desde la app, sin conexión a internet.
- [ ] Los datos siguen ahí después de cerrar y volver a abrir la app.
- [ ] Los campos obligatorios se validan y muestran un mensaje claro en español.
- [ ] Hay un estado vacío que explica qué hacer cuando todavía no hay datos.

## 4. Pantallas

| Pantalla | Propósito |
|---|---|
| Inicio | Resumen y accesos directos a lo más usado |
| Lista de rifas | Ver, buscar y abrir cada registro |
| Formulario de rifas | Crear y editar con validaciones |
| Lista de vendedores | Ver, buscar y abrir cada registro |
| Formulario de vendedores | Crear y editar con validaciones |
| Lista de numeros | Ver, buscar y abrir cada registro |
| Formulario de numeros | Crear y editar con validaciones |
| Lista de sorteos | Ver, buscar y abrir cada registro |
| Formulario de sorteos | Crear y editar con validaciones |
| Ajustes | Datos del usuario, moneda y exportación |

## 5. Modelo de datos

- **rifas**: id, nombre, premio, precio_numero, total_numeros, fecha_sorteo
- **vendedores**: id, nombre, telefono
- **numeros**: id, rifa_id, numero, comprador, telefono, vendedor_id, estado, fecha_pago
- **sorteos**: id, rifa_id, numero_ganador, fecha

El SQL completo y la política de migraciones están en [ARQUITECTURA.md](ARQUITECTURA.md).

## 6. Requisitos no funcionales

- **Offline total:** ninguna función del MVP requiere internet.
- **Rendimiento:** la app abre en menos de 2 segundos y las listas responden de inmediato con cientos de registros.
- **Privacidad:** los datos nunca salen del teléfono, salvo lo que el usuario comparte a propósito.
- **Idioma y formato:** español de Bolivia, montos en bolivianos (Bs) con dos decimales, fechas día/mes/año.
- **Usabilidad:** botones grandes, formularios cortos y flujos de pocos toques; pensado para usarse de pie y con una mano.
- **Calidad:** `npm run lint`, `npx tsc --noEmit` y `npm test` pasan en cada commit (CI en GitHub Actions).

## 7. Riesgos y decisiones

| Riesgo | Mitigación |
|---|---|
| Perder el celular y los datos | Respaldo exportable (CSV o archivo de base) en la versión 1.1 |
| Cambios de esquema que rompan datos | Migraciones con `PRAGMA user_version`; nunca editar una migración publicada |
| Alcance que crece | Todo lo que no esté en la sección 2 va a «Después del MVP» |

## 8. Criterios para lanzar el MVP

- [ ] Todas las historias de la sección 3 cumplen sus criterios.
- [ ] Probado en un teléfono Android real, en modo avión.
- [ ] APK generado con `npm run build:apk`.
- [ ] README con capturas y CHANGELOG actualizado.
- [ ] Release v1.0.0 publicado.
