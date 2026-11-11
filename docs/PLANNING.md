# Plan de desarrollo — RifaFácil

Guía para construir el MVP **fase por fase**. Complementa a [ROADMAP.md](ROADMAP.md) (qué y cuándo) y [SPEC.md](SPEC.md) (qué debe hacer la app).

## Forma de trabajo

1. **Una fase por rama:** `git checkout -b fase-N-nombre`.
2. **Un issue por tarea** (usá los títulos de abajo) y un milestone por fase en GitHub.
3. **Commits chicos** con prefijo: `feat:`, `fix:`, `test:`, `docs:`, `chore:`.
4. **Pull request al cerrar la fase** con la lista de criterios de salida marcada.
5. **Primero la lógica pura y sus pruebas** (en `src/lib/`), después la pantalla que la usa.
6. **Probá en el teléfono** al terminar cada tarea de pantalla, no solo al final de la fase.

### Definición de «terminado» (vale para toda tarea y fase)

- [ ] `npm run lint`, `npx tsc --noEmit` y `npm test` sin errores.
- [ ] Funciona en modo avión.
- [ ] Estados vacíos, de carga y de error resueltos, con textos en español.
- [ ] Los datos persisten al reiniciar la app.
- [ ] La regla de negocio correspondiente tiene prueba o verificación manual anotada.
- [ ] CHANGELOG actualizado al cerrar la fase.

## Calendario sugerido

| Fase | Nombre | Días | Acumulado |
|---|---|---|---|
| 1 | Estructura base y navegación | 2 | 2 |
| 2 | Rifas y grilla de números | 4 | 6 |
| 3 | Vendedores y rendiciones | 3 | 9 |
| 4 | Deudores y avisos | 3 | 12 |
| 5 | Sorteo y reporte | 4 | 16 |

Total: **16 días** (~4 semanas). Si una fase se pasa del doble de lo estimado, recortá alcance dentro de la fase en lugar de saltar a la siguiente.

---

## Fase 1 — Estructura base y navegación

**Estimación:** 2 días.

**Objetivo:** dejar el esqueleto funcionando para construir encima sin fricción. La estructura ya viene en el repositorio.

**Tareas**

- [ ] **F1-T1** `npm install` y `npx expo start`: la app abre en Expo Go.
- [ ] **F1-T2** Revisar `src/db/schema.ts`: la base se crea y migra sola al primer arranque (verificar en el teléfono).
- [ ] **F1-T3** Definir la navegación principal en `app/_layout.tsx` (inicio + una sección por entidad).
- [ ] **F1-T4** Aplicar el tema de `src/theme.ts` y el componente `Pantalla` a todas las rutas.
- [ ] **F1-T5** Pantalla de inicio con tarjetas de acceso a cada sección.
- [ ] **F1-T6** Confirmar que el CI de GitHub Actions pasa en verde.

**Criterio de salida:** la app abre, navega entre secciones vacías y no da errores; lint, tipos y tests en verde.

---

## Fase 2 — Rifas y grilla de números

**Estimación:** 4 días. **Rama sugerida:** `fase-2-rifas-y-grilla-de-numeros`.

**Objetivo:** Rifas y grilla de números.

**Historias que se completan:** HU-01 (Crear una rifa), HU-02 (Controlar la grilla de números).

**Tareas**

- [ ] **F2-T1** Consultas de rifas y generación de la grilla en una transacción.
- [ ] **F2-T2** Pantalla de rifa con formulario validado.
- [ ] **F2-T3** Componente de grilla eficiente (FlatList con varias columnas) para 1000 números.
- [ ] **F2-T4** Detalle de número con cambio de estado.
- [ ] **F2-T5** Filtro y búsqueda por número o comprador.
- [ ] **F2-T6** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F2-T7** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F2-T8** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-01 — el formulario de rifa → defino 200 números a 5 Bs → se crea la grilla con 200 números libres.
- [ ] HU-01 — el formulario de rifa → dejo el precio en 0 → no guarda y pide un precio mayor a 0.
- [ ] HU-02 — una grilla con números libres → toco el 15 y elijo «Pagado» → se asigna comprador y vendedor y el número cambia de color.
- [ ] HU-02 — un número pagado → intento venderlo a otra persona → la app lo bloquea y muestra quién lo tiene.

**Criterio de salida:**

- [ ] Una rifa de 1000 números se muestra fluida en un teléfono de gama baja.
- [ ] Definición de «terminado» cumplida.

---

## Fase 3 — Vendedores y rendiciones

**Estimación:** 3 días. **Rama sugerida:** `fase-3-vendedores-y-rendiciones`.

**Objetivo:** Vendedores y rendiciones.

**Historias que se completan:** HU-03 (Cuenta de cada vendedor).

**Tareas**

- [ ] **F3-T1** CRUD de vendedores.
- [ ] **F3-T2** Asignar vendedor al marcar un número pagado.
- [ ] **F3-T3** Registro de rendiciones y cálculo de saldo por vendedor, con pruebas.
- [ ] **F3-T4** Pantalla Vendedores con vendido, rendido y debe.
- [ ] **F3-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F3-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F3-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-03 — un vendedor con 30 números pagados → registro una rendición de 100 Bs → su deuda baja en 100 Bs y queda el historial.

**Criterio de salida:**

- [ ] El saldo por vendedor coincide con los casos de prueba.
- [ ] Definición de «terminado» cumplida.

---

## Fase 4 — Deudores y avisos

**Estimación:** 3 días. **Rama sugerida:** `fase-4-deudores-y-avisos`.

**Objetivo:** Deudores y avisos por WhatsApp.

**Historias que se completan:** HU-04 (Deudores y avisos).

**Tareas**

- [ ] **F4-T1** Lista de deudores ordenada por monto.
- [ ] **F4-T2** Plantilla de aviso con variables.
- [ ] **F4-T3** Enlace wa.me con texto codificado.
- [ ] **F4-T4** Manejo de teléfonos faltantes o inválidos.
- [ ] **F4-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F4-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F4-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-04 — vendedores con saldo pendiente → abro Deudores → veo la lista ordenada por monto.
- [ ] HU-04 — un deudor con teléfono → toco «Avisar» → se abre WhatsApp con el mensaje prellenado.

**Criterio de salida:**

- [ ] El aviso abre WhatsApp con nombre y monto correctos.
- [ ] Definición de «terminado» cumplida.

---

## Fase 5 — Sorteo y reporte

**Estimación:** 4 días. **Rama sugerida:** `fase-5-sorteo-y-reporte`.

**Objetivo:** Sorteo y reporte.

**Historias que se completan:** HU-05 (Sorteo transparente), HU-06 (Reporte de recaudación).

**Tareas**

- [ ] **F5-T1** Sorteo aleatorio solo entre números pagados y guardado en la tabla sorteos.
- [ ] **F5-T2** Bloqueo de re-sorteo.
- [ ] **F5-T3** Pantalla Sorteo con animación simple del resultado.
- [ ] **F5-T4** PDF de reporte de recaudación con expo-print.
- [ ] **F5-T5** Compartir el reporte con expo-sharing.
- [ ] **F5-T6** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F5-T7** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F5-T8** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-05 — una rifa con 120 números pagados → toco «Sortear» → sale un ganador al azar entre esos 120 y queda guardado.
- [ ] HU-05 — una rifa ya sorteada → intento sortear otra vez → la app muestra el resultado anterior y no permite repetir.
- [ ] HU-06 — una rifa terminada → toco «Reporte» → se genera un PDF con recaudado, números vendidos, premio, ganador y rendiciones por vendedor.

**Criterio de salida:**

- [ ] El sorteo es único e irrepetible y el reporte coincide con la grilla.
- [ ] Definición de «terminado» cumplida.

---

## Lanzamiento del MVP (v1.0.0)

- [ ] Revisar todas las historias de [SPEC.md](SPEC.md) y marcar sus criterios.
- [ ] Capturas de pantalla para el README.
- [ ] Revisar textos, íconos y nombre de la app en `app.json`.
- [ ] `npm run build:apk` y probar el APK en un teléfono limpio, sin Expo Go y en modo avión.
- [ ] Publicar el release v1.0.0 con el APK adjunto.
- [ ] Pasar las ideas pendientes a issues para la versión 1.1.

## Plantilla de issue

Copiá esto al crear cada issue:

```
Título: [F2-T1] <descripción de la tarea>
Fase: N — <nombre>
Historia: HU-XX
Criterios:
- [ ] ...
Notas técnicas: ...
```

---

## Cronograma día por día

Guía para no perder el hilo: cada día tiene tareas concretas. Si un día se atrasa, mové la tarea al siguiente, no la saltees.

### Fase 1 — Estructura base y navegación

- **Día 1** (día 1 de la fase): `F1-T1` Instalar dependencias y abrir la app en Expo Go; `F1-T2` Verificar creación y migración de la base; `F1-T3` Definir la navegación principal.
- **Día 2** (día 2 de la fase): `F1-T4` Aplicar tema y componente Pantalla; `F1-T5` Pantalla de inicio con accesos; `F1-T6` Confirmar CI en verde.

### Fase 2 — Rifas y grilla de números

- **Día 3** (día 1 de la fase): `F2-T1` Consultas de rifas y generación de la grilla en una transacción.; `F2-T2` Pantalla de rifa con formulario validado..
- **Día 4** (día 2 de la fase): `F2-T3` Componente de grilla eficiente (FlatList con varias columnas) para 1000 números.; `F2-T4` Detalle de número con cambio de estado..
- **Día 5** (día 3 de la fase): `F2-T5` Filtro y búsqueda por número o comprador.; `F2-T6` Validaciones, estados vacíos y mensajes en español.
- **Día 6** (día 4 de la fase): `F2-T7` Pruebas automáticas y verificación manual de criterios; `F2-T8` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 3 — Vendedores y rendiciones

- **Día 7** (día 1 de la fase): `F3-T1` CRUD de vendedores.; `F3-T2` Asignar vendedor al marcar un número pagado.; `F3-T3` Registro de rendiciones y cálculo de saldo por vendedor, con pruebas..
- **Día 8** (día 2 de la fase): `F3-T4` Pantalla Vendedores con vendido, rendido y debe.; `F3-T5` Validaciones, estados vacíos y mensajes en español; `F3-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 9** (día 3 de la fase): `F3-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 4 — Deudores y avisos

- **Día 10** (día 1 de la fase): `F4-T1` Lista de deudores ordenada por monto.; `F4-T2` Plantilla de aviso con variables.; `F4-T3` Enlace wa.me con texto codificado..
- **Día 11** (día 2 de la fase): `F4-T4` Manejo de teléfonos faltantes o inválidos.; `F4-T5` Validaciones, estados vacíos y mensajes en español; `F4-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 12** (día 3 de la fase): `F4-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 5 — Sorteo y reporte

- **Día 13** (día 1 de la fase): `F5-T1` Sorteo aleatorio solo entre números pagados y guardado en la tabla sorteos.; `F5-T2` Bloqueo de re-sorteo..
- **Día 14** (día 2 de la fase): `F5-T3` Pantalla Sorteo con animación simple del resultado.; `F5-T4` PDF de reporte de recaudación con expo-print..
- **Día 15** (día 3 de la fase): `F5-T5` Compartir el reporte con expo-sharing.; `F5-T6` Validaciones, estados vacíos y mensajes en español.
- **Día 16** (día 4 de la fase): `F5-T7` Pruebas automáticas y verificación manual de criterios; `F5-T8` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

## Rutina diaria

1. Empezá releyendo la tarea del día en [BACKLOG.md](BACKLOG.md) y su regla o historia en [SPEC.md](SPEC.md).
2. Escribí primero la prueba de la lógica, después el código.
3. Probá en el teléfono antes de hacer commit.
4. Cerrá el día con un commit, el issue marcado y una línea en el CHANGELOG si corresponde.

## Qué hacer si te trabás

- Más de 2 horas sin avanzar: simplificá la tarea al caso mínimo y anotá lo que quedó fuera como issue `mejora`.
- Duda de alcance: la respuesta está en la sección 2 del [SPEC](SPEC.md); si no está, no entra al MVP.
- Duda de datos o validaciones: [DATOS.md](DATOS.md).
- Duda de pantallas: [PANTALLAS.md](PANTALLAS.md).
- Duda de cómo probar: [PRUEBAS.md](PRUEBAS.md).
