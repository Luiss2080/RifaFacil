# Backlog de issues — RifaFácil

> Lista lista para pasar a GitHub Issues, con milestones, etiquetas, estimaciones y trazabilidad a las historias. Se puede crear todo de una vez con [crear-issues.sh](crear-issues.sh).

## 1. Milestones

| Milestone | Fase | Días | Tareas | Horas est. |
|---|---|---|---|---|
| Fase 1 — Estructura base y navegación | 1 | 2 | 6 | 12 |
| Fase 2 — Rifas y grilla de números | 2 | 4 | 8 | 24 |
| Fase 3 — Vendedores y rendiciones | 3 | 3 | 7 | 17.5 |
| Fase 4 — Deudores y avisos | 4 | 3 | 7 | 17.5 |
| Fase 5 — Sorteo y reporte | 5 | 4 | 8 | 24 |

Total: **36 tareas**, ~95 horas (16 días a 6 horas efectivas).

## 2. Etiquetas

| Etiqueta | Uso |
|---|---|
| ui | Pantallas y componentes |
| datos | Tablas, consultas y migraciones |
| lógica | Reglas de negocio y cálculos |
| pruebas | Pruebas automáticas y manuales |
| integración | Cámara, notificaciones, PDF, compartir |
| tarea | Otras tareas |
| bug | Errores |
| mejora | Ideas para v1.1+ |

## 3. Issues del MVP

### Fase 1 — Estructura base y navegación

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F1-T1` | Instalar dependencias y abrir la app en Expo Go | — | tarea | Alta | 2 |
| `F1-T2` | Verificar creación y migración de la base | — | datos | Alta | 2 |
| `F1-T3` | Definir la navegación principal | — | ui | Alta | 2 |
| `F1-T4` | Aplicar tema y componente Pantalla | — | ui | Alta | 2 |
| `F1-T5` | Pantalla de inicio con accesos | — | ui | Alta | 2 |
| `F1-T6` | Confirmar CI en verde | — | tarea | Alta | 2 |

### Fase 2 — Rifas y grilla de números

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F2-T1` | Consultas de rifas y generación de la grilla en una transacción. | HU-01, HU-02 | datos | Alta | 3 |
| `F2-T2` | Pantalla de rifa con formulario validado. | HU-01, HU-02 | ui, lógica | Alta | 3 |
| `F2-T3` | Componente de grilla eficiente (FlatList con varias columnas) para 1000 números. | HU-01, HU-02 | tarea | Alta | 3 |
| `F2-T4` | Detalle de número con cambio de estado. | HU-01, HU-02 | ui | Alta | 3 |
| `F2-T5` | Filtro y búsqueda por número o comprador. | HU-01, HU-02 | tarea | Alta | 3 |
| `F2-T6` | Validaciones, estados vacíos y mensajes en español | HU-01, HU-02 | lógica | Alta | 3 |
| `F2-T7` | Pruebas automáticas y verificación manual de criterios | HU-01, HU-02 | pruebas | Alta | 3 |
| `F2-T8` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-01, HU-02 | pruebas | Alta | 3 |

### Fase 3 — Vendedores y rendiciones

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F3-T1` | CRUD de vendedores. | HU-03 | tarea | Alta | 2.5 |
| `F3-T2` | Asignar vendedor al marcar un número pagado. | HU-03 | tarea | Alta | 2.5 |
| `F3-T3` | Registro de rendiciones y cálculo de saldo por vendedor, con pruebas. | HU-03 | lógica, pruebas | Alta | 2.5 |
| `F3-T4` | Pantalla Vendedores con vendido, rendido y debe. | HU-03 | ui | Alta | 2.5 |
| `F3-T5` | Validaciones, estados vacíos y mensajes en español | HU-03 | lógica | Alta | 2.5 |
| `F3-T6` | Pruebas automáticas y verificación manual de criterios | HU-03 | pruebas | Alta | 2.5 |
| `F3-T7` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-03 | pruebas | Alta | 2.5 |

### Fase 4 — Deudores y avisos

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F4-T1` | Lista de deudores ordenada por monto. | HU-04 | ui | Media | 2.5 |
| `F4-T2` | Plantilla de aviso con variables. | HU-04 | tarea | Media | 2.5 |
| `F4-T3` | Enlace wa.me con texto codificado. | HU-04 | tarea | Media | 2.5 |
| `F4-T4` | Manejo de teléfonos faltantes o inválidos. | HU-04 | tarea | Media | 2.5 |
| `F4-T5` | Validaciones, estados vacíos y mensajes en español | HU-04 | lógica | Media | 2.5 |
| `F4-T6` | Pruebas automáticas y verificación manual de criterios | HU-04 | pruebas | Media | 2.5 |
| `F4-T7` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-04 | pruebas | Media | 2.5 |

### Fase 5 — Sorteo y reporte

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F5-T1` | Sorteo aleatorio solo entre números pagados y guardado en la tabla sorteos. | HU-05, HU-06 | datos | Media | 3 |
| `F5-T2` | Bloqueo de re-sorteo. | HU-05, HU-06 | tarea | Media | 3 |
| `F5-T3` | Pantalla Sorteo con animación simple del resultado. | HU-05, HU-06 | ui | Media | 3 |
| `F5-T4` | PDF de reporte de recaudación con expo-print. | HU-05, HU-06 | integración | Media | 3 |
| `F5-T5` | Compartir el reporte con expo-sharing. | HU-05, HU-06 | integración | Media | 3 |
| `F5-T6` | Validaciones, estados vacíos y mensajes en español | HU-05, HU-06 | lógica | Media | 3 |
| `F5-T7` | Pruebas automáticas y verificación manual de criterios | HU-05, HU-06 | pruebas | Media | 3 |
| `F5-T8` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-05, HU-06 | pruebas | Media | 3 |

## 4. Orden recomendado de ataque

1. Terminá cada fase completa antes de abrir la siguiente; dentro de la fase, de arriba hacia abajo.
2. Las tareas `lógica` y `datos` van antes que las `ui` que las usan.
3. Cada issue se cierra con un commit o PR que lo mencione (`Cierra #N`).
4. Nada de abrir issues de v1.1 hasta tener el APK de la v1.0.0.

## 5. Ideas para después del MVP

| Idea | Esfuerzo | Valor |
|---|---|---|
| Modo oscuro | Bajo | Medio |
| Búsqueda y filtros avanzados | Medio | Alto |
| Estadísticas y gráficos simples en inicio | Medio | Medio |
| Respaldo y restauración de la base | Medio | Alto |
| Publicación en Google Play | Bajo | Alto |
| Sincronización opcional entre dispositivos | Alto | Depende de demanda |
