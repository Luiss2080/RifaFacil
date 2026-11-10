// Cada elemento es una migración. Para cambiar el esquema, AGREGÁ uno nuevo al final;
// nunca edites uno ya publicado.
export const MIGRACIONES: string[] = [
  `CREATE TABLE rifas (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, premio TEXT NOT NULL, precio_numero REAL NOT NULL, total_numeros INTEGER NOT NULL, fecha_sorteo TEXT);
CREATE TABLE vendedores (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, telefono TEXT);
CREATE TABLE numeros (id INTEGER PRIMARY KEY AUTOINCREMENT, rifa_id INTEGER NOT NULL REFERENCES rifas(id) ON DELETE CASCADE, numero INTEGER NOT NULL, comprador TEXT, telefono TEXT, vendedor_id INTEGER REFERENCES vendedores(id) ON DELETE SET NULL, estado TEXT NOT NULL DEFAULT 'libre', fecha_pago TEXT, UNIQUE (rifa_id, numero));
CREATE TABLE sorteos (id INTEGER PRIMARY KEY AUTOINCREMENT, rifa_id INTEGER NOT NULL REFERENCES rifas(id) ON DELETE CASCADE, numero_ganador INTEGER NOT NULL, fecha TEXT NOT NULL);`,
];

export const TABLAS = ['rifas', 'vendedores', 'numeros', 'sorteos'] as const;
