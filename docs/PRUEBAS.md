# Plan de pruebas — RifaFácil

> Qué probar, cuándo y cómo. Cada historia y cada regla de negocio tiene casos concretos. Complementa a [SPEC.md](SPEC.md).

## 1. Estrategia

| Nivel | Herramienta | Qué cubre | Cuándo |
|---|---|---|---|
| Unitarias | jest-expo (`npm test`) | Lógica pura de `src/lib/` (cálculos, validaciones, formatos) | En cada commit (CI) |
| Manuales por historia | Teléfono con Expo Go | Criterios de aceptación de SPEC (casos CP-) | Al cerrar cada tarea de pantalla |
| Regresión por fase | Teléfono real | Lo ya terminado sigue andando | Al cerrar cada fase |
| Aceptación final | APK en teléfono limpio, modo avión | Criterios de lanzamiento | Antes de v1.0.0 |

Meta de cobertura: **100 % de las reglas de negocio** con prueba automática o caso manual, y **100 % de los criterios de aceptación** ejecutados al menos una vez en un teléfono real.

## 2. Pruebas unitarias por regla de negocio

Crear un archivo `src/lib/<tema>.test.ts` por tema. Una prueba por regla como mínimo; agregar los bordes de la sección 4.

| ID | Regla | Tipo de prueba | Casos mínimos |
|---|---|---|---|
| RN-01 | Una rifa tiene números del 1 al total definido al crearla. | Unitaria (cálculo) | Valor típico, cero, redondeo a 2 decimales, valor grande |
| RN-02 | Un número puede estar libre, reservado o pagado; solo los pagados participan del sorteo. | Unitaria o manual | Caso válido, caso inválido, límite |
| RN-03 | Cada número vendido pertenece a un vendedor para saber quién rinde cuentas. | Unitaria o manual | Caso válido, caso inválido, límite |
| RN-04 | Un vendedor debe lo vendido menos lo que ya rindió (entregó) al tesorero. | Unitaria o manual | Caso válido, caso inválido, límite |
| RN-05 | El sorteo se hace una sola vez; el resultado queda guardado y no se puede repetir. | Unitaria o manual | Caso válido, caso inválido, límite |
| RN-06 | Si el número ganador no está pagado, el sorteo se repite solo entre los pagados (no puede ganar uno no pagado). | Unitaria o manual | Caso válido, caso inválido, límite |
| RN-07 | No se pueden cambiar el precio ni el total de números una vez vendido el primer número. | Unitaria (cálculo) | Valor típico, cero, redondeo a 2 decimales, valor grande |

## 3. Casos manuales por historia

Formato: ejecutar en el teléfono, marcar ✔ o ✘ y anotar la fecha. Si falla, abrir un issue con el ID del caso.

### HU-01 — Crear una rifa (fase 2)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-01-1 | el formulario de rifa | defino 200 números a 5 Bs | se crea la grilla con 200 números libres | ☐ |
| CP-01-2 | el formulario de rifa | dejo el precio en 0 | no guarda y pide un precio mayor a 0 | ☐ |

Casos transversales: **CP-01-T1** modo avión · **CP-01-T2** cerrar y reabrir la app (persistencia) · **CP-01-T3** texto del sistema en tamaño grande.

### HU-02 — Controlar la grilla de números (fase 2)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-02-1 | una grilla con números libres | toco el 15 y elijo «Pagado» | se asigna comprador y vendedor y el número cambia de color | ☐ |
| CP-02-2 | un número pagado | intento venderlo a otra persona | la app lo bloquea y muestra quién lo tiene | ☐ |

Casos transversales: **CP-02-T1** modo avión · **CP-02-T2** cerrar y reabrir la app (persistencia) · **CP-02-T3** texto del sistema en tamaño grande.

### HU-03 — Cuenta de cada vendedor (fase 3)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-03-1 | un vendedor con 30 números pagados | registro una rendición de 100 Bs | su deuda baja en 100 Bs y queda el historial | ☐ |

Casos transversales: **CP-03-T1** modo avión · **CP-03-T2** cerrar y reabrir la app (persistencia) · **CP-03-T3** texto del sistema en tamaño grande.

### HU-04 — Deudores y avisos (fase 4)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-04-1 | vendedores con saldo pendiente | abro Deudores | veo la lista ordenada por monto | ☐ |
| CP-04-2 | un deudor con teléfono | toco «Avisar» | se abre WhatsApp con el mensaje prellenado | ☐ |

Casos transversales: **CP-04-T1** modo avión · **CP-04-T2** cerrar y reabrir la app (persistencia) · **CP-04-T3** texto del sistema en tamaño grande.

### HU-05 — Sorteo transparente (fase 5)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-05-1 | una rifa con 120 números pagados | toco «Sortear» | sale un ganador al azar entre esos 120 y queda guardado | ☐ |
| CP-05-2 | una rifa ya sorteada | intento sortear otra vez | la app muestra el resultado anterior y no permite repetir | ☐ |

Casos transversales: **CP-05-T1** modo avión · **CP-05-T2** cerrar y reabrir la app (persistencia) · **CP-05-T3** texto del sistema en tamaño grande.

### HU-06 — Reporte de recaudación (fase 5)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-06-1 | una rifa terminada | toco «Reporte» | se genera un PDF con recaudado, números vendidos, premio, ganador y rendiciones por vendedor | ☐ |

Casos transversales: **CP-06-T1** modo avión · **CP-06-T2** cerrar y reabrir la app (persistencia) · **CP-06-T3** texto del sistema en tamaño grande.

## 4. Casos borde

| ID | Caso | Resultado esperado | Resultado |
|---|---|---|---|
| CB-01 | Se vende un número reservado vencido: el encargado decide si lo libera. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |
| CB-02 | Dos vendedores reclaman el mismo número: gana el primer registro guardado. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |
| CB-03 | Rifa con ganador no encontrado (nadie pagó): el sorteo avisa que no hay números pagados. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |
| CB-04 | Se agrega un número extra a la rifa: solo mientras no se haya vendido ninguno. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |

## 5. Pruebas de datos y migraciones

| ID | Prueba | Esperado |
|---|---|---|
| CD-01 | Primer arranque en teléfono limpio | La base se crea con todas las tablas y `user_version` queda en 1 |
| CD-02 | Actualizar de una versión anterior con datos cargados | Las migraciones nuevas se aplican y no se pierde ningún registro |
| CD-03 | Borrar un registro padre | Los hijos se borran o se bloquea con mensaje, según el esquema |
| CD-04 | Intentar guardar con campos obligatorios vacíos | No se inserta nada y se marcan los campos |
| CD-05 | Cargar 1.000 registros de prueba | Las listas siguen fluidas (scroll sin trabas) y abren en menos de 2 s |

## 6. Regresión al cerrar cada fase

**Fase 1 — Estructura base y navegación**

- [ ] La app abre y navega sin errores

**Fase 2 — Rifas y grilla de números**

- [ ] Una rifa de 1000 números se muestra fluida en un teléfono de gama baja.
- [ ] Los criterios de las fases anteriores siguen funcionando

**Fase 3 — Vendedores y rendiciones**

- [ ] El saldo por vendedor coincide con los casos de prueba.
- [ ] Los criterios de las fases anteriores siguen funcionando

**Fase 4 — Deudores y avisos**

- [ ] El aviso abre WhatsApp con nombre y monto correctos.
- [ ] Los criterios de las fases anteriores siguen funcionando

**Fase 5 — Sorteo y reporte**

- [ ] El sorteo es único e irrepetible y el reporte coincide con la grilla.
- [ ] Los criterios de las fases anteriores siguen funcionando

## 7. Matriz de dispositivos

| Dispositivo | Android | Qué se verifica |
|---|---|---|
| Gama baja (2–3 GB de RAM) | 8–10 | Fluidez de listas, tiempo de arranque |
| Gama media | 11–13 | Flujo completo y APK |
| Pantalla pequeña (5") | cualquiera | Que nada quede cortado ni oculto por el teclado |
| Texto del sistema grande | cualquiera | Que los formularios sigan siendo usables |

## 8. Lista de verificación para el lanzamiento (v1.0.0)

- [ ] Todas las historias ejecutadas en teléfono real (casos CP-)
- [ ] Todos los casos borde (CB-) ejecutados
- [ ] Pruebas de datos (CD-) ejecutadas
- [ ] APK instalado en un teléfono limpio sin Expo Go
- [ ] Probado en modo avión durante todo el flujo principal
- [ ] Rotación de pantalla no pierde datos del formulario
- [ ] Permisos solicitados solo cuando se necesitan y con explicación
- [ ] Sin errores en la consola durante un recorrido completo
- [ ] README con capturas y CHANGELOG al día

## 9. Informe de errores

```
Título: [Bug] <qué pasó>
ID de caso: CP-XX-X
Pasos: 1... 2... 3...
Esperado: ...
Obtenido: ...
Dispositivo / Android: ...
Captura o video: ...
```
