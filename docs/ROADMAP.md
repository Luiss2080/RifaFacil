# Roadmap de RifaFácil

> Que organizar una rifa no sea un caos de papelitos: números, vendedores, deudas y sorteo en una sola app.

Ruta de desarrollo del MVP, fase por fase. Cada fase termina con algo que se puede **usar y probar en un teléfono**. Trabajá una fase a la vez y no pases a la siguiente hasta cumplir su criterio de salida.

## Resumen

- **Objetivo del MVP:** Rifas y polladas sin papel: números vendidos, pagos, vendedores y sorteo aleatorio.
- **Usuario:** Tesorero o encargado de una rifa de 50 a 1000 números, con varios vendedores (alumnos, socios, vecinos).
- **Duración estimada:** ~16 días de trabajo efectivo (~4 semanas a ritmo tranquilo).
- **Costo:** $0 (sin servidores, sin suscripciones, todo offline en SQLite).

## Línea de tiempo

| Fase | Nombre | Objetivo | Días | Semana acumulada |
|---|---|---|---|---|
| 1 | Estructura base y navegación | Verificar la base y dejar la navegación y el tema listos. | 2 | 1 |
| 2 | Rifas y grilla de números | Rifas y grilla de números. | 4 | 2 |
| 3 | Vendedores y rendiciones | Vendedores y rendiciones. | 3 | 2 |
| 4 | Deudores y avisos | Deudores y avisos por WhatsApp. | 3 | 3 |
| 5 | Sorteo y reporte | Sorteo y reporte. | 4 | 4 |

## Hitos

### Hito 1 — Estructura base y navegación

**Demo:** La app abre en Expo Go, navega entre secciones vacías y el CI pasa en verde.

### Hito 2 — Rifas y grilla de números

**Demo:** Una rifa de 1000 números se muestra fluida en un teléfono de gama baja.

### Hito 3 — Vendedores y rendiciones

**Demo:** El saldo por vendedor coincide con los casos de prueba.

### Hito 4 — Deudores y avisos

**Demo:** El aviso abre WhatsApp con nombre y monto correctos.

### Hito 5 — Sorteo y reporte

**Demo:** El sorteo es único e irrepetible y el reporte coincide con la grilla.

## Detalle por fase

### Fase 1 — Estructura base y navegación

- **Objetivo:** dejar el esqueleto funcionando para construir encima sin fricción.
- **Historias cubiertas:** ninguna (infraestructura).
- **Depende de:** nada.
- **Criterio de salida:** la app abre, navega y el CI está en verde.

### Fase 2 — Rifas y grilla de números

- **Objetivo:** Rifas y grilla de números.
- **Historias cubiertas:** HU-01 Crear una rifa; HU-02 Controlar la grilla de números
- **Depende de:** fase 1.
- **Duración:** 4 días.
- **Criterio de salida:**
  - Una rifa de 1000 números se muestra fluida en un teléfono de gama baja.

### Fase 3 — Vendedores y rendiciones

- **Objetivo:** Vendedores y rendiciones.
- **Historias cubiertas:** HU-03 Cuenta de cada vendedor
- **Depende de:** fase 2.
- **Duración:** 3 días.
- **Criterio de salida:**
  - El saldo por vendedor coincide con los casos de prueba.

### Fase 4 — Deudores y avisos

- **Objetivo:** Deudores y avisos por WhatsApp.
- **Historias cubiertas:** HU-04 Deudores y avisos
- **Depende de:** fase 3.
- **Duración:** 3 días.
- **Criterio de salida:**
  - El aviso abre WhatsApp con nombre y monto correctos.

### Fase 5 — Sorteo y reporte

- **Objetivo:** Sorteo y reporte.
- **Historias cubiertas:** HU-05 Sorteo transparente; HU-06 Reporte de recaudación
- **Depende de:** fase 4.
- **Duración:** 4 días.
- **Criterio de salida:**
  - El sorteo es único e irrepetible y el reporte coincide con la grilla.

## Estado

- [ ] **Fase 1:** Estructura base y navegación
- [ ] **Fase 2:** Rifas y grilla de números
- [ ] **Fase 3:** Vendedores y rendiciones
- [ ] **Fase 4:** Deudores y avisos
- [ ] **Fase 5:** Sorteo y reporte

## Dependencias y supuestos

- Un teléfono Android real para probar (Expo Go) y, al final, para instalar el APK.
- Node.js 20+ y la app Expo Go.
- Todo lo demás (cuentas, nube, pagos) queda fuera del MVP.

## Después del MVP (v1.1 en adelante)

- [ ] Modo oscuro.
- [ ] Búsqueda y filtros avanzados en las listas.
- [ ] Estadísticas y gráficos simples en la pantalla de inicio.
- [ ] Publicación en Google Play (cuenta de desarrollador, pago único de USD 25).
- [ ] Respaldo y restauración de la base de datos.
- [ ] Sincronización opcional entre dispositivos (solo si hay demanda real).

## Cómo usar este documento

1. [SPEC.md](SPEC.md) define **qué** debe hacer la app (historias, reglas, pantallas, datos).
2. [PLANNING.md](PLANNING.md) define **cómo** construirla fase por fase (tareas, pruebas, issues).
3. Al cerrar una fase: marcá el estado acá, actualizá el [CHANGELOG](../CHANGELOG.md) y fusioná la rama a `main`.

## Trazabilidad: historias por fase

| Historia | Fase | Entrega |
|---|---|---|
| HU-01 Crear una rifa | 2 | Rifas y grilla de números |
| HU-02 Controlar la grilla de números | 2 | Rifas y grilla de números |
| HU-03 Cuenta de cada vendedor | 3 | Vendedores y rendiciones |
| HU-04 Deudores y avisos | 4 | Deudores y avisos |
| HU-05 Sorteo transparente | 5 | Sorteo y reporte |
| HU-06 Reporte de recaudación | 5 | Sorteo y reporte |

## Indicadores de avance

| Indicador | Cómo se mide | Meta |
|---|---|---|
| Avance de tareas | Issues cerrados / 36 | 100 % al lanzar |
| Historias aceptadas | Casos CP- marcados ✔ / 10 | 100 % |
| Reglas cubiertas | RN con prueba / 7 | 100 % |
| Ritmo | Días reales vs estimados por fase | Desvío menor al 50 % |
| Calidad | Errores abiertos al cierre de fase | 0 críticos |

## Revisión de fin de fase

Antes de pasar a la siguiente fase respondé por escrito (5 minutos):

1. ¿Se cumplieron todos los criterios de salida?
2. ¿Cuántos días tomó realmente frente a lo estimado?
3. ¿Qué se recortó o se dejó para después?
4. ¿Hay algo que cambie el SPEC? Actualizalo antes de seguir.

## Documentos de apoyo

- [DATOS.md](DATOS.md): campos, validaciones, consultas y migraciones.
- [PANTALLAS.md](PANTALLAS.md): ruta, estados y bosquejo de cada pantalla.
- [PRUEBAS.md](PRUEBAS.md): casos de prueba por regla, historia y borde.
- [BACKLOG.md](BACKLOG.md): issues listos para GitHub con milestones y etiquetas.
