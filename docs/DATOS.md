# Modelo de datos — RifaFácil

> Diseño detallado de la base SQLite: campos, validaciones, consultas y migraciones. Complementa la sección 6 de [SPEC.md](SPEC.md).

## 1. Convenciones

- Base local `SQLite` con `expo-sqlite`; versión del esquema en `PRAGMA user_version`.
- Claves primarias `INTEGER AUTOINCREMENT` llamadas `id`.
- Fechas como texto ISO `AAAA-MM-DD` (y `AAAA-MM-DDTHH:MM` cuando hay hora). Nunca se guardan textos como «hoy».
- Montos como `REAL` en bolivianos; se redondean a 2 decimales al guardar y se formatean al mostrar.
- Booleanos como `INTEGER` 0/1.
- Los textos se guardan sin espacios sobrantes (`trim()`).
- Todas las consultas usan parámetros (`?`), nunca concatenan texto del usuario.
- Las claves foráneas se activan con `PRAGMA foreign_keys = ON` al abrir la base.

## 2. Relaciones

| Campo | Apunta a | Comportamiento |
|---|---|---|
| `numeros.rifa_id` | `rifas` | Al borrar el padre se borran los hijos |
| `numeros.vendedor_id` | `vendedores` | Sin borrado en cascada |
| `sorteos.rifa_id` | `rifas` | Al borrar el padre se borran los hijos |

```
rifas  ──<  numeros, sorteos
vendedores  ──<  numeros
numeros
sorteos
```

## 3. Detalle por tabla

### 3.1 `rifas`

Cada rifa con premio, precio y fecha de sorteo.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `nombre` | TEXT → `string` | Texto | Obligatorio; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí nombre» |
| `premio` | TEXT → `string` | Texto largo | Obligatorio; Hasta 280 caracteres | «Máximo 280 caracteres» |
| `precio_numero` | REAL → `number` | Numérico decimal | Obligatorio; Mayor a 0; Hasta 2 decimales | «Ingresá un monto mayor a 0» |
| `total_numeros` | INTEGER → `number` | Numérico decimal | Obligatorio; Mayor o igual a 0; Hasta 2 decimales | «Ingresá un número válido» |
| `fecha_sorteo` | TEXT → `string \| null` | Fecha | Opcional; Fecha real en formato AAAA-MM-DD | «Fecha no válida» |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_rifas_fecha_sorteo ON rifas(fecha_sorteo);
```

**Consultas base** (en `src/db/rifas.ts`):

```ts
listar(): Promise<Rifa[]>            // SELECT * FROM rifas ORDER BY id DESC
obtener(id: number): Promise<Rifa | null>   // SELECT * FROM rifas WHERE id = ?
crear(datos: NuevoRifa): Promise<number>   // INSERT INTO rifas (nombre, premio, precio_numero, total_numeros, fecha_sorteo) VALUES (?, ?, ?, ?, ?)
actualizar(id: number, datos: NuevoRifa): Promise<void>   // UPDATE rifas SET nombre = ?, premio = ?, precio_numero = ?, total_numeros = ?, fecha_sorteo = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM rifas WHERE id = ?
```

### 3.2 `vendedores`

Personas que venden números.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `nombre` | TEXT → `string` | Texto | Obligatorio; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí nombre» |
| `telefono` | TEXT → `string \| null` | Teléfono | Opcional; Solo dígitos, 7 a 15 caracteres (se ignoran espacios y guiones) | «Teléfono no válido» |

**Consultas base** (en `src/db/vendedores.ts`):

```ts
listar(): Promise<Vendedor[]>            // SELECT * FROM vendedores ORDER BY id DESC
obtener(id: number): Promise<Vendedor | null>   // SELECT * FROM vendedores WHERE id = ?
crear(datos: NuevoVendedor): Promise<number>   // INSERT INTO vendedores (nombre, telefono) VALUES (?, ?)
actualizar(id: number, datos: NuevoVendedor): Promise<void>   // UPDATE vendedores SET nombre = ?, telefono = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM vendedores WHERE id = ?
```

### 3.3 `numeros`

Cada número con su estado y comprador.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `rifa_id` | INTEGER → `number` | Selector de rifas | Obligatorio; Debe existir en `rifas` | «Elegí un registro» |
| `numero` | INTEGER → `number` | Numérico entero | Obligatorio; Entero mayor o igual a 0 | «Ingresá un número entero» |
| `comprador` | TEXT → `string \| null` | Texto | Opcional; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí comprador» |
| `telefono` | TEXT → `string \| null` | Teléfono | Opcional; Solo dígitos, 7 a 15 caracteres (se ignoran espacios y guiones) | «Teléfono no válido» |
| `vendedor_id` | INTEGER → `number \| null` | Selector de vendedores | Opcional; Debe existir en `vendedores` | «Elegí un registro» |
| `estado` | TEXT → `string` | Selector / fichas | Obligatorio; Uno de: `libre`, `reservado`, `pagado`; Valor inicial `libre` | «Elegí una opción» |
| `fecha_pago` | TEXT → `string \| null` | Fecha | Opcional; Fecha real en formato AAAA-MM-DD | «Fecha no válida» |

**Restricciones de tabla:** `UNIQUE (rifa_id, numero)`.

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_numeros_rifa_id ON numeros(rifa_id);
CREATE INDEX IF NOT EXISTS idx_numeros_vendedor_id ON numeros(vendedor_id);
CREATE INDEX IF NOT EXISTS idx_numeros_estado ON numeros(estado);
CREATE INDEX IF NOT EXISTS idx_numeros_fecha_pago ON numeros(fecha_pago);
```

**Consultas base** (en `src/db/numeros.ts`):

```ts
listar(): Promise<Numero[]>            // SELECT * FROM numeros ORDER BY id DESC
obtener(id: number): Promise<Numero | null>   // SELECT * FROM numeros WHERE id = ?
crear(datos: NuevoNumero): Promise<number>   // INSERT INTO numeros (rifa_id, numero, comprador, telefono, vendedor_id, estado, fecha_pago) VALUES (?, ?, ?, ?, ?, ?, ?)
actualizar(id: number, datos: NuevoNumero): Promise<void>   // UPDATE numeros SET rifa_id = ?, numero = ?, comprador = ?, telefono = ?, vendedor_id = ?, estado = ?, fecha_pago = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM numeros WHERE id = ?
listarPorRifa(rifa_id: number): Promise<Numero[]>   // WHERE rifa_id = ?
listarPorVendedor(vendedor_id: number): Promise<Numero[]>   // WHERE vendedor_id = ?
```

### 3.4 `sorteos`

Resultado del sorteo con su fecha.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `rifa_id` | INTEGER → `number` | Selector de rifas | Obligatorio; Debe existir en `rifas` | «Elegí un registro» |
| `numero_ganador` | INTEGER → `number` | Numérico entero | Obligatorio; Entero mayor o igual a 0 | «Ingresá un número entero» |
| `fecha` | TEXT → `string` | Fecha | Obligatorio; Fecha real en formato AAAA-MM-DD | «Fecha no válida» |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_sorteos_rifa_id ON sorteos(rifa_id);
CREATE INDEX IF NOT EXISTS idx_sorteos_fecha ON sorteos(fecha);
```

**Consultas base** (en `src/db/sorteos.ts`):

```ts
listar(): Promise<Sorteo[]>            // SELECT * FROM sorteos ORDER BY id DESC
obtener(id: number): Promise<Sorteo | null>   // SELECT * FROM sorteos WHERE id = ?
crear(datos: NuevoSorteo): Promise<number>   // INSERT INTO sorteos (rifa_id, numero_ganador, fecha) VALUES (?, ?, ?)
actualizar(id: number, datos: NuevoSorteo): Promise<void>   // UPDATE sorteos SET rifa_id = ?, numero_ganador = ?, fecha = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM sorteos WHERE id = ?
listarPorRifa(rifa_id: number): Promise<Sorteo[]>   // WHERE rifa_id = ?
```

## 4. Tipos TypeScript

Copiar a `src/db/tipos.ts`:

```ts
export interface Rifa {
  id: number;
  nombre: string;
  premio: string;
  precio_numero: number;
  total_numeros: number;
  fecha_sorteo: string | null;
}
export type NuevoRifa = Omit<Rifa, 'id'>;

export interface Vendedor {
  id: number;
  nombre: string;
  telefono: string | null;
}
export type NuevoVendedor = Omit<Vendedor, 'id'>;

export interface Numero {
  id: number;
  rifa_id: number;
  numero: number;
  comprador: string | null;
  telefono: string | null;
  vendedor_id: number | null;
  estado: string;
  fecha_pago: string | null;
}
export type NuevoNumero = Omit<Numero, 'id'>;

export interface Sorteo {
  id: number;
  rifa_id: number;
  numero_ganador: number;
  fecha: string;
}
export type NuevoSorteo = Omit<Sorteo, 'id'>;

```

## 5. Valores permitidos (enumeraciones)

SQLite no tiene tipo enumerado: se valida en la capa de datos y se muestra con la etiqueta de la tabla.

**`numeros.estado`**

| Valor guardado | Etiqueta en pantalla |
|---|---|
| `libre` | Libre |
| `reservado` | Reservado |
| `pagado` | Pagado |

```ts
export const NUMEROS_ESTADO = ['libre', 'reservado', 'pagado'] as const;
```

## 6. Migraciones

Migración 1 = esquema inicial (ya en `src/db/schema.ts`). Cada cambio posterior es una migración nueva al final de la lista; nunca se edita una ya publicada.

| Versión | Fase | Motivo |
|---|---|---|
| 2 | 3 | Registrar lo que cada vendedor entrega al tesorero (la deuda = vendido − rendido). |
| 3 | 4 | Plantilla del aviso por WhatsApp. |

**Migración 2** (fase 3)

```sql
CREATE TABLE rendiciones (id INTEGER PRIMARY KEY AUTOINCREMENT, vendedor_id INTEGER NOT NULL REFERENCES vendedores(id) ON DELETE CASCADE, rifa_id INTEGER NOT NULL REFERENCES rifas(id) ON DELETE CASCADE, monto REAL NOT NULL, fecha TEXT NOT NULL);
```

**Migración 3** (fase 4)

```sql
CREATE TABLE ajustes (clave TEXT PRIMARY KEY, valor TEXT NOT NULL);
```

## 7. Esquema inicial completo

```sql
CREATE TABLE rifas (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, premio TEXT NOT NULL, precio_numero REAL NOT NULL, total_numeros INTEGER NOT NULL, fecha_sorteo TEXT);
CREATE TABLE vendedores (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, telefono TEXT);
CREATE TABLE numeros (id INTEGER PRIMARY KEY AUTOINCREMENT, rifa_id INTEGER NOT NULL REFERENCES rifas(id) ON DELETE CASCADE, numero INTEGER NOT NULL, comprador TEXT, telefono TEXT, vendedor_id INTEGER REFERENCES vendedores(id) ON DELETE SET NULL, estado TEXT NOT NULL DEFAULT 'libre', fecha_pago TEXT, UNIQUE (rifa_id, numero));
CREATE TABLE sorteos (id INTEGER PRIMARY KEY AUTOINCREMENT, rifa_id INTEGER NOT NULL REFERENCES rifas(id) ON DELETE CASCADE, numero_ganador INTEGER NOT NULL, fecha TEXT NOT NULL);
```

## 8. Reglas de integridad que NO delega a la base

- **RN-01** Una rifa tiene números del 1 al total definido al crearla.
- **RN-02** Un número puede estar libre, reservado o pagado; solo los pagados participan del sorteo.
- **RN-03** Cada número vendido pertenece a un vendedor para saber quién rinde cuentas.
- **RN-04** Un vendedor debe lo vendido menos lo que ya rindió (entregó) al tesorero.
- **RN-05** El sorteo se hace una sola vez; el resultado queda guardado y no se puede repetir.
- **RN-06** Si el número ganador no está pagado, el sorteo se repite solo entre los pagados (no puede ganar uno no pagado).
- **RN-07** No se pueden cambiar el precio ni el total de números una vez vendido el primer número.

Estas reglas se implementan en `src/lib/` como funciones puras y se prueban de forma automática (ver [PRUEBAS.md](PRUEBAS.md)).
